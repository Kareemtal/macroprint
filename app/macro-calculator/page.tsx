import type { Metadata } from 'next'
import { MacroCalculator } from '@/components/calculator/macro-calculator'

export const metadata: Metadata = {
  title: 'Free Macro Nutritional Calculator - MacroPrint',
  description:
    'Calculate nutrition facts for your recipes instantly. Free online tool for meal prep chefs and food businesses. Get calories, protein, carbs, fat, and more.',
  keywords: [
    'macro calculator',
    'nutrition calculator',
    'recipe nutrition',
    'calorie calculator',
    'meal prep calculator',
    'food label calculator',
  ],
  openGraph: {
    title: 'Free Macro Nutritional Calculator',
    description:
      'Calculate nutrition facts for your recipes instantly. Free tool for meal prep professionals.',
    url: '/macro-calculator',
  },
}

export default function MacroCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <svg
                className="h-5 w-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">MacroPrint</span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Log in
            </a>
            <a
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Free Macro Nutritional Calculator
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Calculate nutrition facts for your recipes instantly. Add ingredients, 
              set serving sizes, and get a professional label preview.
            </p>
          </div>

          {/* Calculator Component */}
          <MacroCalculator />

          {/* CTA Section */}
          <div className="mt-12 rounded-lg border bg-muted/30 p-6 text-center">
            <h2 className="mb-2 text-xl font-semibold">
              Want to save recipes and export print-ready labels?
            </h2>
            <p className="mb-4 text-muted-foreground">
              Sign up free to save your recipes, track allergens, and export 
              professional FDA-style nutrition labels.
            </p>
            <a
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign Up Free — No Credit Card Required
            </a>
          </div>

          {/* SEO Content */}
          <div className="mt-16">
            <h2 className="mb-4 text-2xl font-bold">
              How to Calculate Nutrition Facts for Your Recipes
            </h2>
            <div className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground">
                Calculating accurate nutrition information is essential for meal prep 
                businesses, catering companies, and cottage food producers. Our free 
                macro calculator uses the USDA FoodData Central database to provide 
                reliable nutrition data for thousands of ingredients.
              </p>
              
              <h3 className="mt-6 text-lg font-semibold">How It Works</h3>
              <ol className="mt-2 list-decimal space-y-2 pl-6 text-muted-foreground">
                <li>Search for ingredients using our USDA-powered search</li>
                <li>Enter the amount in grams (or use common units)</li>
                <li>Set your total servings per batch</li>
                <li>View calculated nutrition per serving</li>
                <li>Preview your FDA-style nutrition label</li>
              </ol>

              <h3 className="mt-6 text-lg font-semibold">What's Included</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>Calories and macronutrients (protein, carbs, fat)</li>
                <li>Sodium, cholesterol, and fiber</li>
                <li>Saturated fat and trans fat</li>
                <li>Sugars (total and added when available)</li>
                <li>Key vitamins and minerals</li>
                <li>Percent Daily Value (%DV) calculations</li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold">FDA-Style Labels</h3>
              <p className="text-muted-foreground">
                The nutrition label preview follows the FDA Nutrition Facts format, 
                making your meal prep business look professional. While this tool 
                provides best-effort calculations, you should always verify accuracy 
                for regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} MacroPrint. Nutrition data from USDA FoodData Central.
          </p>
          <p className="mt-2">
            This calculator provides estimates only. Verify all nutrition facts before 
            using for commercial purposes.
          </p>
        </div>
      </footer>
    </div>
  )
}
