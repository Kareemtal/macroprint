import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    CheckCircle,
    Shield,
    Scale,
    Zap,
    AlertTriangle,
    ArrowRight,
    Calculator,
    FileText,
    Printer
} from 'lucide-react'

// SEO Metadata (per approved strategy)
export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'),
    title: 'Nutrition Labels for Meal Prep Businesses | MacroPrint',
    description:
        'Professional nutrition labeling for meal prep operators. FDA-compliant labels, allergen warnings, and batch recipe scaling. Start free.',
    keywords: [
        'nutrition labels for meal prep',
        'meal prep nutrition labeling',
        'nutrition facts for meal prep business',
        'meal prep label requirements',
        'FDA compliant meal prep labels',
    ],
    openGraph: {
        title: 'Nutrition Labels for Meal Prep Businesses | MacroPrint',
        description:
            'Professional nutrition labeling for meal prep operators. FDA-compliant labels, allergen warnings, and batch recipe scaling.',
        url: '/meal-prep-nutrition-labels',
        type: 'website',
        images: [
            {
                url: '/og-meal-prep-labels.png',
                width: 1200,
                height: 630,
                alt: 'Nutrition Labels for Meal Prep',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nutrition Labels for Meal Prep Businesses',
        description: 'Professional nutrition labeling for meal prep operators. FDA-compliant labels and allergen warnings.',
    },
    alternates: {
        canonical: '/meal-prep-nutrition-labels',
    },
}

export default function MealPrepNutritionLabelsPage() {
    // Schema markup for FAQPage
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Do meal prep businesses need nutrition labels?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'If you\'re selling packaged prepared meals, most states require nutrition labels. Federal FDA regulations apply if you\'re making nutrition or health claims, shipping across state lines, or selling in retail stores. Check your state\'s cottage food laws and local health department requirements.',
                },
            },
            {
                '@type': 'Question',
                name: 'Can I use the same label for different recipes?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. Each unique recipe requires its own nutrition label. If you substitute ingredients (e.g., chicken for turkey), you must recalculate and create a new label. MacroPrint makes batch label creation easy.',
                },
            },
            {
                '@type': 'Question',
                name: 'How do I scale nutrition facts when I increase batch size?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MacroPrint automatically recalculates nutrition facts per serving when you scale recipes from 4 servings to 400. All nutrients, allergen warnings, and FDA rounding rules are applied automatically.',
                },
            },
            {
                '@type': 'Question',
                name: 'What happens if my nutrition label is wrong?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Incorrect nutrition labels can result in FDA warning letters, fines ($1,000-$10,000+), product recalls, and liability if someone has an allergic reaction. Always verify calculations with a food safety professional.',
                },
            },
            {
                '@type': 'Question',
                name: 'Do I need to list allergens if they\'re obvious?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. All major allergens (milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, sesame) must be disclosed, even if obvious. MacroPrint auto-detects allergens from your ingredient list.',
                },
            },
        ],
    }

    // Breadcrumb schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Solutions',
                item: `${process.env.NEXT_PUBLIC_APP_URL}/solutions`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Nutrition Labels for Meal Prep',
                item: `${process.env.NEXT_PUBLIC_APP_URL}/meal-prep-nutrition-labels`,
            },
        ],
    }

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="flex min-h-screen flex-col">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
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
                <section className="hero-pattern relative overflow-hidden py-16 md:py-24">
                    <div className="container relative">
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
                                <Scale className="h-4 w-4 text-primary" />
                                <span>Built for meal prep professionals</span>
                            </div>
                            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                Nutrition Labels for{' '}
                                <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                                    Meal Prep Businesses
                                </span>
                            </h1>
                            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                                You're scaling from home kitchen to 50-100 meals/week. Customers ask about macros, allergens, calories.
                                You need professional labels without hiring a nutritionist. Compliance anxiety is real.
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

                {/* Why Meal Prep Businesses Need Labels */}
                <section className="border-t bg-muted/30 py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                Why Meal Prep Businesses Need Nutrition Labels
                            </h2>
                            <p className="mb-4 text-muted-foreground">
                                Customer trust and transparency. Compliance with local health departments.
                                Competitive advantage ("We label everything"). Reducing liability risk.
                            </p>
                            <div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-4 text-left dark:border-orange-900 dark:bg-orange-950">
                                <div className="flex gap-2">
                                    <AlertTriangle className="h-5 w-5 shrink-0 text-orange-600" />
                                    <div>
                                        <p className="font-semibold text-orange-900 dark:text-orange-100">
                                            Not sure if you're required to label?
                                        </p>
                                        <p className="mt-1 text-sm text-orange-800 dark:text-orange-200">
                                            Most states require nutrition facts if you're selling packaged prepared meals.{' '}
                                            <Link href="/fda-labeling-requirements-meal-prep" className="underline">
                                                Read FDA requirements →
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Required */}
                <section className="py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                What's Required on a Meal Prep Nutrition Label
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Nutrition Facts Panel</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Calories, macros (protein, carbs, fat), vitamins, minerals, and % Daily Value
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Serving Size</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Servings per container and realistic serving sizes (not manipulated)
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Allergen Disclosure</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Top 9 allergens (milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soy, sesame)
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Ingredient List</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Descending order by weight with parenthetical allergen disclosure
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                                <p className="text-sm text-muted-foreground">
                                    <strong className="text-foreground">Did you know?</strong> The FDA allows rounding.
                                    49 calories rounds to 50. We handle this automatically.{' '}
                                    <Link href="/fda-rounding-rules" className="text-primary underline">
                                        Learn FDA rounding rules →
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How MacroPrint Helps */}
                <section className="border-t bg-muted/30 py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                                How MacroPrint Helps Meal Prep Businesses
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="flex gap-4 text-left">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Scale className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Batch Recipe Scaling</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Scale from 1 serving to 100 with accurate nutrition per serving
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-left">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Allergen Auto-Detection</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically flag top 9 allergens from your ingredient list
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-left">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Macro-Focused Display</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Customers care about protein/carbs/fat first — highlight what matters
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-left">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Printer className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Multiple Formats</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Sticker labels, container inserts, or print-ready PDFs
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Mistakes */}
                <section className="py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                Common Meal Prep Labeling Mistakes (And How to Avoid Them)
                            </h2>
                            <div className="space-y-4">
                                <Card className="border-red-200 dark:border-red-900">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5 text-red-600" />
                                            Wrong Serving Size
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Using "1 container" instead of weight/volume. FDA requires RACC-based serving sizes.
                                        <span className="mt-2 block font-semibold text-foreground">
                                            Fix: Our calculator uses FDA serving size guidelines automatically.
                                        </span>
                                    </CardContent>
                                </Card>
                                <Card className="border-red-200 dark:border-red-900">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5 text-red-600" />
                                            Missing Allergens
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Forgetting to disclose cross-contamination or hidden allergens in sauces.
                                        <span className="mt-2 block font-semibold text-foreground">
                                            Fix: Auto-detect allergens from ingredient list.{' '}
                                            <Link href="/allergen-labeling-guide" className="text-primary underline">
                                                See allergen guide →
                                            </Link>
                                        </span>
                                    </CardContent>
                                </Card>
                                <Card className="border-red-200 dark:border-red-900">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5 text-red-600" />
                                            Rounding Errors
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Manual math mistakes (e.g., 4.8g protein labeled as 4g instead of 5g).
                                        <span className="mt-2 block font-semibold text-foreground">
                                            Fix: Built-in FDA rounding rules handle it for you.
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="mt-6 text-center">
                                <Link href="/nutrition-labeling-mistakes">
                                    <Button variant="outline">
                                        See All 7 Mistakes →
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="border-t bg-muted/30 py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <h2 className="mb-8 text-2xl font-bold text-center">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-2 font-semibold">Do meal prep businesses need nutrition labels?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        If you're selling packaged prepared meals, most states require nutrition labels. Federal FDA regulations
                                        apply if you're making nutrition or health claims, shipping across state lines, or selling in retail stores.
                                        Check your state's cottage food laws and local health department requirements.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold">Can I use the same label for different recipes?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        No. Each unique recipe requires its own nutrition label. If you substitute ingredients (e.g., chicken for turkey),
                                        you must recalculate and create a new label. MacroPrint makes batch label creation easy.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold">How do I scale nutrition facts when I increase batch size?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        MacroPrint automatically recalculates nutrition facts per serving when you scale recipes from 4 servings to 400.
                                        All nutrients, allergen warnings, and FDA rounding rules are applied automatically.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold">What happens if my nutrition label is wrong?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Incorrect nutrition labels can result in FDA warning letters, fines ($1,000-$10,000+), product recalls,
                                        and liability if someone has an allergic reaction. Always verify calculations with a food safety professional.
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
                                Ready to create professional labels?
                            </h2>
                            <p className="mb-8 text-lg opacity-90">
                                Join thousands of meal prep professionals who use MacroPrint for compliant nutrition labels.
                            </p>
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <Link href="/macro-calculator">
                                    <Button size="lg" variant="secondary" className="gap-2">
                                        <Calculator className="h-5 w-5" />
                                        Try Free Calculator
                                    </Button>
                                </Link>
                                <Link href="/pricing">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                                    >
                                        View Pricing
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t bg-muted/30 py-8">
                    <div className="container text-center text-sm text-muted-foreground">
                        <p>
                            © {new Date().getFullYear()} MacroPrint. Professional FDA-style nutrition labels for meal prep businesses.
                        </p>
                        <p className="mt-2">
                            <strong className="text-foreground">Disclaimer:</strong> MacroPrint provides FDA-style labels based on USDA data.
                            Users are responsible for verifying accuracy and compliance with local regulations. This is not legal advice.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}
