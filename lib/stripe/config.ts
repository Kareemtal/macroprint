import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Stripe secret key not configured')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const STRIPE_PRICES = {
  BASIC: process.env.STRIPE_BASIC_PRICE_ID || 'prod_TspSsYEIQwDGgm',
  PRO: process.env.STRIPE_PRO_PRICE_ID || 'prod_TspT18qriF0uLP',
}
