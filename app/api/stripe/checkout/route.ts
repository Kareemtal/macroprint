import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase/admin'
import type { UserProfile } from '@/lib/types'


export async function POST(request: NextRequest) {
  try {
    // Validate environment variables first
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
    const stripeKey = process.env.STRIPE_SECRET_KEY

    console.log('[Checkout] Environment check:', {
      hasAppUrl: !!appUrl,
      appUrl: appUrl || 'NOT SET',
      hasStripeKey: !!stripeKey,
      stripeKeyPrefix: stripeKey ? stripeKey.substring(0, 7) : 'NOT SET'
    })

    if (!stripeKey) {
      console.error('[Checkout] Missing STRIPE_SECRET_KEY')
      return NextResponse.json(
        { error: 'Stripe not configured. Please contact support.' },
        { status: 500 }
      )
    }

    if (!appUrl) {
      console.error('[Checkout] Missing NEXT_PUBLIC_APP_URL')
      return NextResponse.json(
        { error: 'App URL not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Lazy import to avoid build-time initialization
    const { stripe, STRIPE_PRICES } = await import('@/lib/stripe/config')
    const db = getAdminDb()

    console.log('[Checkout] Stripe prices:', STRIPE_PRICES)

    const { plan, userId } = await request.json()
    console.log('[Checkout] Request:', { plan, userId })

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    if (!['BASIC', 'PRO'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get user from Firestore using Admin SDK
    console.log('[Checkout] Fetching user from Firestore...')
    const userRef = db.collection('users').doc(userId)
    const userSnap = await userRef.get()

    if (!userSnap.exists) {
      console.error('[Checkout] User not found:', userId)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userSnap.data() as UserProfile
    console.log('[Checkout] User data:', {
      email: userData.email,
      hasStripeCustomerId: !!userData.stripeCustomerId
    })

    let customerId = userData.stripeCustomerId

    // Create Stripe customer if not exists
    if (!customerId) {
      console.log('[Checkout] Creating new Stripe customer...')
      const customer = await stripe.customers.create({
        email: userData.email,
        name: userData.displayName || undefined,
        metadata: {
          firebaseUid: userId,
        },
      })
      customerId = customer.id
      console.log('[Checkout] Created customer:', customerId)

      await userRef.update({ stripeCustomerId: customerId })
    }

    const priceId = plan === 'BASIC' ? STRIPE_PRICES.BASIC : STRIPE_PRICES.PRO
    console.log('[Checkout] Using price ID:', priceId)

    if (!priceId) {
      console.error('[Checkout] Price ID not set for plan:', plan)
      return NextResponse.json(
        { error: 'Pricing not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Create checkout session
    console.log('[Checkout] Creating checkout session...')
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
      success_url: `${appUrl}/dashboard/billing?success=true`,
      cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
      metadata: {
        firebaseUid: userId,
        plan,
      },
    })

    console.log('[Checkout] Session created:', session.id)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[Checkout] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error
    })
    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
