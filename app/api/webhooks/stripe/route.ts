import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { db } from '@/lib/firebase/config'
import { doc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import type { UserPlan } from '@/lib/types'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

async function updateUserPlan(customerId: string, plan: UserPlan, subscriptionId: string | null) {
  // Find user by Stripe customer ID
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('stripeCustomerId', '==', customerId))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    console.error('No user found for customer:', customerId)
    return
  }

  const userDoc = snapshot.docs[0]
  await updateDoc(doc(db, 'users', userDoc.id), {
    plan,
    stripeSubscriptionId: subscriptionId,
    updatedAt: serverTimestamp(),
  })

  // Log audit event
  await addDoc(collection(db, 'auditEvents'), {
    uid: userDoc.id,
    type: 'PLAN_CHANGED',
    timestamp: serverTimestamp(),
    metadata: { plan, subscriptionId },
  })
}

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.error('Stripe webhook secret not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string
        const plan = session.metadata?.plan as UserPlan

        if (plan && customerId) {
          await updateUserPlan(customerId, plan, subscriptionId)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Determine plan based on price
        const priceId = subscription.items.data[0]?.price.id
        let plan: UserPlan = 'FREE'

        if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
          plan = 'PRO'
        } else if (priceId === process.env.STRIPE_BASIC_PRICE_ID) {
          plan = 'BASIC'
        }

        if (subscription.status === 'active') {
          await updateUserPlan(customerId, plan, subscription.id)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Downgrade to free plan
        await updateUserPlan(customerId, 'FREE', null)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // Could send email notification here
        console.log('Payment failed for customer:', customerId)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
