# MacroPrint - FDA-Style Nutrition Label Generator

A production-ready SaaS for generating FDA-style nutrition labels for meal prep businesses. Built with Next.js 14, Firebase, and Stripe.

## Features

- 🍎 **Instant Nutrition Calculations** - USDA FoodData Central integration
- 📊 **FDA-Style Labels** - Professional Nutrition Facts format
- 🔄 **Recipe Scaling** - Automatically recalculate when scaling servings
- ⚠️ **Allergen Tracking** - Auto-detect FDA Big 9 allergens
- 🖨️ **Print-Ready Exports** - PDF and PNG in standard label sizes
- 💳 **Subscription Billing** - Stripe integration with multiple tiers
- 🔐 **Google Authentication** - Secure sign-in with Firebase Auth
- 🔍 **SEO Optimized** - Lead magnet calculator, programmatic SEO pages

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Functions)
- **Payments**: Stripe Subscriptions
- **Nutrition Data**: USDA FoodData Central API
- **Export**: Puppeteer (PDF/PNG generation)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   ├── macro-calculator/  # Free lead magnet
│   ├── pricing/           # Pricing page
│   └── login/             # Auth page
├── components/            # React components
│   ├── calculator/        # Macro calculator components
│   ├── label/             # Nutrition label components
│   └── ui/                # Shadcn UI components
├── lib/                   # Shared utilities
│   ├── constants/         # FDA constants and rules
│   ├── context/           # React contexts
│   ├── firebase/          # Firebase config and services
│   ├── label/             # Label renderer
│   ├── nutrition/         # Calculation module and providers
│   ├── stripe/            # Stripe config
│   └── types/             # TypeScript types
├── functions/             # Firebase Cloud Functions
│   └── src/
│       └── index.ts       # Export functions
├── firestore.rules        # Firestore security rules
├── storage.rules          # Storage security rules
└── firebase.json          # Firebase config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project
- A Stripe account
- USDA FoodData Central API key (free)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd macroprint
npm install
cd functions && npm install && cd ..
```

### 2. Environment Setup

Create a `.env.local` file in the root directory. See `ENV_EXAMPLE.md` for all required variables.

**Required variables:**
- Firebase config (from Firebase Console)
- USDA API key (from https://fdc.nal.usda.gov/api-key-signup.html)
- Stripe keys and price IDs

### 3. Firebase Setup

```bash
# Login to Firebase
firebase login

# Initialize Firebase (select your project)
firebase use <your-project-id>

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules
```

### 4. Stripe Setup

1. Create products and prices in Stripe Dashboard:
   - Basic Plan: $29/month
   - Pro Plan: $99/month

2. Add price IDs to `.env.local`

3. Configure webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Run Firebase Emulators (Optional)

```bash
firebase emulators:start
```

### 7. Deploy Functions

```bash
cd functions
npm run deploy
```

## Testing

```bash
# Run unit tests
npm test

# Run tests once
npm run test:run
```

## Deployment

### Vercel (Recommended for Next.js)

1. Connect your repo to Vercel
2. Add environment variables
3. Deploy

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## Pricing Tiers

| Feature | Free | Basic ($29/mo) | Pro ($99/mo) |
|---------|------|----------------|--------------|
| Saved Recipes | 3 | 50 | Unlimited |
| Exports/Day | 3 | 50 | Unlimited |
| Watermark-free | ❌ | ✅ | ✅ |
| Allergen Tracking | Basic | ✅ | ✅ |
| Recipe Scaling | ❌ | ✅ | ✅ |
| Custom Branding | ❌ | ❌ | ✅ |

## Important Disclaimers

This software generates **FDA-style** nutrition labels using USDA data. Users are responsible for:

- Verifying accuracy of nutrition calculations
- Ensuring compliance with local food labeling regulations
- Confirming allergen statements
- Final label accuracy before commercial use

**MacroPrint is a tool, not legal advice.**

## API Reference

### USDA Food Search
```
GET /api/foods/search?q=chicken
```

### Get Food Details
```
GET /api/foods/{fdcId}
```

### Export Label (via Cloud Function)
```javascript
const { httpsCallable } = require('firebase/functions')
const exportLabel = httpsCallable(functions, 'exportLabel')
const result = await exportLabel({
  recipeId: 'abc123',
  format: 'PDF',
  preset: '3x4'
})
```

## License

MIT

## Support

For support, email support@macroprint.com
