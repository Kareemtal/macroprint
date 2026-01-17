# Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Firebase Admin (server-side only - JSON string)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# USDA FoodData Central API
# Get your free API key at: https://fdc.nal.usda.gov/api-key-signup.html
USDA_API_KEY=your_usda_api_key

# Nutritionix API (optional fallback)
NUTRITIONIX_APP_ID=your_app_id
NUTRITIONIX_API_KEY=your_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MacroPrint

# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Rate Limiting
RATE_LIMIT_INGREDIENT_SEARCH_PER_HOUR=100
RATE_LIMIT_EXPORTS_PER_DAY_FREE=3
RATE_LIMIT_EXPORTS_PER_DAY_BASIC=50
RATE_LIMIT_EXPORTS_PER_DAY_PRO=999999
```

## Setup Instructions

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication → Google provider
4. Create Firestore Database
5. Create Storage bucket
6. Go to Project Settings → General → Your apps → Add web app
7. Copy the config values

### 2. USDA API
1. Visit [USDA FoodData Central](https://fdc.nal.usda.gov/api-key-signup.html)
2. Sign up for a free API key

### 3. Stripe Setup
1. Create a [Stripe account](https://stripe.com)
2. Get API keys from Dashboard → Developers → API keys
3. Create products and prices for Basic ($29/mo) and Pro ($99/mo)
4. Set up webhook endpoint pointing to `/api/webhooks/stripe`
