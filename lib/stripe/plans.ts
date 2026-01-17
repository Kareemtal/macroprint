// Client-safe plan configuration (no server secrets)

export const PLAN_FEATURES = {
  FREE: {
    name: 'Free',
    price: 0,
    recipes: 3,
    exportsPerDay: 3,
    features: [
      '3 saved recipes',
      '3 label exports per day',
      'Watermarked labels',
      'Basic macro calculations',
      'USDA ingredient search',
    ],
  },
  BASIC: {
    name: 'Basic',
    price: 29,
    recipes: 50,
    exportsPerDay: 50,
    features: [
      '50 saved recipes',
      '50 label exports per day',
      'No watermarks',
      'Allergen tracking',
      'Recipe scaling',
      'Print-ready PDFs',
      'Email support',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 99,
    recipes: 'Unlimited',
    exportsPerDay: 'Unlimited',
    features: [
      'Unlimited recipes',
      'Unlimited exports',
      'No watermarks',
      'Allergen tracking',
      'Recipe scaling',
      'Print-ready PDFs',
      'Custom branding',
      'Priority support',
      'API access (coming soon)',
    ],
  },
}

export type PlanType = keyof typeof PLAN_FEATURES
