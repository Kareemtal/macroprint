import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PLAN_FEATURES, type PlanType } from '@/lib/stripe/config'
import { Check, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Pricing - MacroPrint',
  description:
    'Affordable pricing plans for FDA-style nutrition labels. Start free, upgrade when you need more. Perfect for meal prep businesses of any size.',
  keywords: [
    'nutrition label pricing',
    'meal prep software pricing',
    'FDA label generator cost',
    'affordable food labeling',
  ],
  openGraph: {
    title: 'MacroPrint Pricing - Affordable Nutrition Labels',
    description:
      'Start free, upgrade when you need more. Pricing plans for meal prep businesses of any size.',
    url: '/pricing',
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">MacroPrint</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="mx-auto max-w-5xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Start with our free calculator. Upgrade when you need unlimited recipes, 
              professional exports, and advanced features.
            </p>
          </div>

          {/* Plans */}
          <div className="grid gap-8 md:grid-cols-3">
            {(Object.keys(PLAN_FEATURES) as PlanType[]).map((planKey) => {
              const plan = PLAN_FEATURES[planKey]

              return (
                <Card
                  key={planKey}
                  className={cn(
                    'relative flex flex-col',
                    planKey === 'PRO' && 'border-primary shadow-lg'
                  )}
                >
                  {planKey === 'PRO' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-4xl font-bold text-foreground">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/login" className="w-full">
                      <Button
                        className="w-full"
                        variant={planKey === 'PRO' ? 'default' : 'outline'}
                        size="lg"
                      >
                        {planKey === 'FREE' ? 'Start Free' : `Get ${plan.name}`}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Comparison Table */}
          <div className="mt-16">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Compare Plans
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 text-left font-medium">Feature</th>
                    <th className="px-4 py-4 text-center font-medium">Free</th>
                    <th className="px-4 py-4 text-center font-medium">Basic</th>
                    <th className="px-4 py-4 text-center font-medium">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4">Saved Recipes</td>
                    <td className="px-4 py-4 text-center">3</td>
                    <td className="px-4 py-4 text-center">50</td>
                    <td className="px-4 py-4 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4">Label Exports per Day</td>
                    <td className="px-4 py-4 text-center">3</td>
                    <td className="px-4 py-4 text-center">50</td>
                    <td className="px-4 py-4 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4">Watermark-free Labels</td>
                    <td className="px-4 py-4 text-center">—</td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4">Allergen Tracking</td>
                    <td className="px-4 py-4 text-center">Basic</td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4">Recipe Scaling</td>
                    <td className="px-4 py-4 text-center">—</td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4">Custom Branding</td>
                    <td className="px-4 py-4 text-center">—</td>
                    <td className="px-4 py-4 text-center">—</td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4">Print-ready PDFs</td>
                    <td className="px-4 py-4 text-center">Watermarked</td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                    <td className="px-4 py-4 text-center"><Check className="mx-auto h-4 w-4 text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4">Support</td>
                    <td className="px-4 py-4 text-center">Community</td>
                    <td className="px-4 py-4 text-center">Email</td>
                    <td className="px-4 py-4 text-center">Priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-6">
                <h3 className="mb-2 font-semibold">Can I try before I buy?</h3>
                <p className="text-sm text-muted-foreground">
                  Absolutely! Our Free plan lets you create 3 recipes and export 
                  3 labels per day. It's a great way to test MacroPrint before upgrading.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-2 font-semibold">Can I cancel anytime?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll keep 
                  access until the end of your billing period.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-2 font-semibold">Is there a contract?</h3>
                <p className="text-sm text-muted-foreground">
                  No contracts. MacroPrint is billed monthly and you can cancel 
                  whenever you want. We also offer a 7-day refund policy.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-2 font-semibold">Do you offer discounts for annual billing?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Contact us at support@macroprint.com for annual pricing 
                  with up to 20% savings.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to look professional?
            </h2>
            <p className="mb-6 opacity-90">
              Join meal prep businesses that trust MacroPrint for their nutrition labels.
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MacroPrint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
