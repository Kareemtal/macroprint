import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { UserProfile } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get user from Firestore
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userSnap.data() as UserProfile

    if (!userData.stripeCustomerId) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 400 })
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Portal error:', error)
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
