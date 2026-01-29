import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle,
  Zap,
  Shield,
  Printer,
  Calculator,
  Scale,
  AlertTriangle,
  ArrowRight,
  ChefHat,
  FileText,
  Star
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">MacroPrint</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/macro-calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Free Calculator
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </nav>
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

      {/* Hero Section */}
      <section className="hero-pattern relative overflow-hidden py-20 md:py-32">
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
              <ChefHat className="h-4 w-4 text-primary" />
              <span>Built for meal prep professionals</span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              FDA-Style Nutrition Labels{' '}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                in Seconds
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Stop wasting hours on spreadsheets or spending $500+ per recipe on consultants.
              Generate professional nutrition labels that make your meal prep business look like a national brand.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/macro-calculator">
                <Button size="lg" className="gap-2">
                  <Calculator className="h-5 w-5" />
                  Try Free Calculator
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required • 5 free labels
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="border-y bg-muted/30 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Mislabeled food costs more than you think
            </h2>
            <p className="mb-8 text-muted-foreground">
              One wrong allergen warning, one miscalculated calorie count, and you're facing angry customers,
              health department visits, or worse — lawsuits.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <AlertTriangle className="mb-2 h-8 w-8 text-destructive" />
                <CardTitle className="text-lg">$500+ Per Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nutrition consultants charge a premium for every recipe analysis.
                  Change a single ingredient? Pay again.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <AlertTriangle className="mb-2 h-8 w-8 text-destructive" />
                <CardTitle className="text-lg">Hours in Spreadsheets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manual macro calculations break every time you scale a recipe.
                  From 4 servings to 40? Start over.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <AlertTriangle className="mb-2 h-8 w-8 text-destructive" />
                <CardTitle className="text-lg">Unprofessional Labels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Handwritten labels or basic templates scream "home kitchen"
                  and cost you premium pricing opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Everything you need for professional labels
            </h2>
            <p className="text-lg text-muted-foreground">
              Built specifically for meal prep businesses, catering operations, and cottage food producers.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Instant Calculations</h3>
                <p className="text-sm text-muted-foreground">
                  Enter ingredients and serving sizes. Get accurate macro calculations in seconds using USDA data.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Recipe Scaling</h3>
                <p className="text-sm text-muted-foreground">
                  Scale from 4 to 400 servings instantly. All nutrients recalculate automatically.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Allergen Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic allergen detection for the FDA's Big 9. Edit and customize warnings as needed.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Printer className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Print-Ready Labels</h3>
                <p className="text-sm text-muted-foreground">
                  Export high-resolution PDFs optimized for standard label stock (2"x4", 3"x4", 4"x6").
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">FDA-Style Format</h3>
                <p className="text-sm text-muted-foreground">
                  Professional Nutrition Facts labels that match the FDA format requirements.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Custom Branding</h3>
                <p className="text-sm text-muted-foreground">
                  Add your business name, address, and custom footer text to every label.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to look like a national brand?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of meal prep professionals who trust MacroPrint for their nutrition labels.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/macro-calculator">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Calculator className="h-5 w-5" />
                  Try Free Calculator
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      {/* <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-2xl font-bold">Trusted by meal prep pros</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm italic">
                    "Saved me hours every week. My labels look professional and my customers trust the accuracy."
                  </p>
                  <p className="text-sm font-medium">— Sarah M., Meal Prep Kitchen</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm italic">
                    "I was spending $500 per recipe with a consultant. Now I can update labels instantly."
                  </p>
                  <p className="text-sm font-medium">— Mike R., Personal Chef</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-5">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold">MacroPrint</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Professional FDA-style nutrition labels for meal prep businesses.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/nutrition-label-generator" className="hover:text-foreground">Label Generator</Link></li>
                <li><Link href="/macro-calculator" className="hover:text-foreground">Free Calculator</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/meal-prep-nutrition-labels" className="hover:text-foreground">Meal Prep Labels</Link></li>
                <li><Link href="/allergen-labeling-guide" className="hover:text-foreground">Allergen Guide</Link></li>
                <li><Link href="/fda-labeling-requirements-meal-prep" className="hover:text-foreground">FDA Requirements</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Learn</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/how-to-create-nutrition-labels" className="hover:text-foreground">How to Create Labels</Link></li>
                <li><Link href="/nutrition-labeling-mistakes" className="hover:text-foreground">Common Mistakes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} MacroPrint. All rights reserved.</p>
            <p className="mt-2">
              Disclaimer: MacroPrint provides FDA-style labels based on USDA data.
              Users are responsible for verifying accuracy and compliance with local regulations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
