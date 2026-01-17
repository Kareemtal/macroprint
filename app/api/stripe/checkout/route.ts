import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICES } from '@/lib/stripe/config'
import { auth } from '@/lib/firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { UserProfile } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { plan, userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    if (!['BASIC', 'PRO'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get user from Firestore
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userSnap.data() as UserProfile
    let customerId = userData.stripeCustomerId

    // Create Stripe customer if not exists
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userData.email,
        name: userData.displayName || undefined,
        metadata: {
          firebaseUid: userId,
        },
      })
      customerId = customer.id

      await updateDoc(userRef, { stripeCustomerId: customerId })
    }

    const priceId = plan === 'BASIC' ? STRIPE_PRICES.BASIC : STRIPE_PRICES.PRO

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: {
        firebaseUid: userId,
        plan,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
