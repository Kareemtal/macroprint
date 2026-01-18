import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Zap, Scale, Shield, Printer, FileText, Calculator, CheckCircle,
    ArrowRight, Star, AlertTriangle
} from 'lucide-react'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'),
    title: 'Nutrition Label Generator | FDA-Compliant Labels',
    description:
        'Create professional FDA-compliant nutrition labels for your meal prep or catering business. Free macro calculator included. Start in minutes.',
    keywords: [
        'nutrition label generator',
        'nutrition facts label generator',
        'FDA nutrition label generator',
        'nutrition label maker online',
        'professional nutrition label creator',
    ],
    openGraph: {
        title: 'Nutrition Label Generator | FDA-Compliant Labels',
        description:
            'Create professional FDA-compliant nutrition labels in minutes. Perfect for meal prep and catering businesses.',
        url: '/nutrition-label-generator',
        type: 'website',
    },
    alternates: {
        canonical: '/nutrition-label-generator',
    },
}

export default function NutritionLabelGeneratorPage() {
    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'MacroPrint Nutrition Label Generator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Create FDA-compliant nutrition labels for meal prep, catering, and small food businesses. Professional nutrition facts panels in minutes.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            priceValidUntil: '2027-12-31',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '127',
            bestRating: '5',
            worstRating: '1',
        },
        featureList: [
            'FDA-compliant Nutrition Facts panel',
            'Automatic allergen detection',
            'Batch recipe scaling',
            'Professional print-ready labels',
        ],
    }

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Is this FDA compliant?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MacroPrint uses FDA rounding rules and formatting guidelines. However, we recommend consulting a food safety professional for final compliance review. This is not legal advice.',
                },
            },
            {
                '@type': 'Question',
                name: 'Do I need to test my food in a lab?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The FDA allows calculated nutrition facts based on USDA databases for most small businesses. Lab testing is optional unless making nutrient content claims.',
                },
            },
            {
                '@type': 'Question',
                name: 'Can I use this for allergen labeling?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. We include allergen disclosure templates based on FDA requirements. Always verify with your local health department.',
                },
            },
            {
                '@type': 'Question',
                name: 'What\'s included in the free version?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The free macro calculator provides carbs, protein, fat, and calories. Full nutrition facts (vitamins, minerals, % DV) require a paid plan starting at $29/month.',
                },
            },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="flex min-h-screen flex-col">
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

                <main className="flex-1">
                    {/* Hero */}
                    <section className="hero-pattern relative overflow-hidden py-16 md:py-24">
                        <div className="container relative">
                            <div className="mx-auto max-w-4xl text-center">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
                                    <Zap className="h-4 w-4 text-primary" />
                                    <span>Professional labels in seconds</span>
                                </div>
                                <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                                    Nutrition Label Generator for{' '}
                                    <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                                        Small Food Businesses
                                    </span>
                                </h1>
                                <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                                    Stop wasting hours on spreadsheets or spending $500+ per recipe on consultants.
                                    Generate professional FDA-style nutrition labels that make your business look like a national brand.
                                </p>
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                    <Link href="/macro-calculator">
                                        <Button size="lg" className="gap-2">
                                            <Calculator className="h-5 w-5" />
                                            Try Free Macro Calculator
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

                    {/* Who This Is For */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
                                    Who This Is For
                                </h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Meal Prep Businesses</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Scaling from home kitchen to 50-100 meals/week and need professional labels
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Catering Services</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Adding packaged meals or need allergen disclosure for events
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Meal Delivery</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Health-focused operators shipping across state lines
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong className="text-foreground">NOT for:</strong> Home cooks, restaurants (dine-in only),
                                        or large manufacturers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                                    Create FDA-Compliant Nutrition Labels
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="flex gap-4 text-left">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Zap className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-semibold">Point-and-Click Interface</h3>
                                            <p className="text-sm text-muted-foreground">
                                                No spreadsheet formulas. Just add ingredients and get instant results.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-left">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <CheckCircle className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-semibold">Automatic FDA Rounding</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Built-in rounding rules (49 cal → 50 cal). No manual math errors.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-left">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Shield className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-semibold">Allergen Warnings Included</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Auto-detect top 9 allergens from your ingredient list.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-left">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Printer className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-semibold">Multi-Format Export</h3>
                                            <p className="text-sm text-muted-foreground">
                                                PDF, PNG, print-ready. Standard label sizes (2"×4", 3"×4", 4"×6").
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
                                    How It Works
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            1
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold">Enter Your Recipe</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Add ingredients and quantities using our USDA-powered search
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            2
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold">Generate Nutrition Facts</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Automatic calculation with FDA rounding and % Daily Value
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            3
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold">Customize Label</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Add brand logo, allergen warnings, and custom claims
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            4
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold">Download & Print</h3>
                                            <p className="text-sm text-muted-foreground">
                                                PDF or PNG, print-ready for any standard label stock
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Why Choose MacroPrint */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
                                    Why Small Food Businesses Choose MacroPrint
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                        <CardContent className="p-6">
                                            <CheckCircle className="mb-2 h-6 w-6 text-primary" />
                                            <h3 className="mb-1 font-semibold">No Nutritionist Required</h3>
                                            <p className="text-sm text-muted-foreground">
                                                (But not a substitute for professional advice when legally required)
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6">
                                            <CheckCircle className="mb-2 h-6 w-6 text-primary" />
                                            <h3 className="mb-1 font-semibold">Affordable for Small Businesses</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Plans start at $29/month. No $500/recipe consultant fees.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6">
                                            <CheckCircle className="mb-2 h-6 w-6 text-primary" />
                                            <h3 className="mb-1 font-semibold">Faster Than Spreadsheets</h3>
                                            <p className="text-sm text-muted-foreground">
                                                From 3 hours per label to 15 minutes. No manual calculations.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6">
                                            <CheckCircle className="mb-2 h-6 w-6 text-primary" />
                                            <h3 className="mb-1 font-semibold">Compliance Peace of Mind</h3>
                                            <p className="text-sm text-muted-foreground">
                                                FDA formatting, allergen templates, and rounding rules built-in.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        "We went from 3 hours per label to 15 minutes" — Sarah, MealPrepCo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Preview */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">Pricing</h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Free</CardTitle>
                                            <p className="text-2xl font-bold">$0</p>
                                        </CardHeader>
                                        <CardContent className="text-left">
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Macro calculator (carbs, protein, fat, calories)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Basic recipe storage (5 recipes)
                                                </li>
                                                <li className="flex items-center gap-2 text-muted-foreground">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    No full Nutrition Facts panel
                                                </li>
                                            </ul>
                                            <Link href="/macro-calculator" className="mt-4 block">
                                                <Button variant="outline" className="w-full">Start Free</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-primary relative">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                            Most Popular
                                        </div>
                                        <CardHeader>
                                            <CardTitle>Pro</CardTitle>
                                            <p className="text-2xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                                        </CardHeader>
                                        <CardContent className="text-left">
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Full Nutrition Facts panel
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    FDA-compliant label export (PDF, PNG)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Allergen auto-detection
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Unlimited recipes & exports
                                                </li>
                                            </ul>
                                            <Link href="/pricing" className="mt-4 block">
                                                <Button className="w-full">View All Plans</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 font-semibold">Is this FDA compliant?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            MacroPrint uses FDA rounding rules and formatting guidelines. However, we recommend consulting
                                            a food safety professional for final compliance review. This is not legal advice.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Do I need to test my food in a lab?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            The FDA allows calculated nutrition facts based on USDA databases for most small businesses.
                                            Lab testing ($300-$800/product) is optional unless making specific nutrient content claims.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Can I use this for allergen labeling?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Yes. We include allergen disclosure templates based on FDA requirements for the top 9 allergens.
                                            Always verify with your local health department.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">What's included in the free version?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            The free macro calculator provides carbs, protein, fat, and calories. Full Nutrition Facts
                                            (vitamins, minerals, % DV, FDA-compliant formatting) require a paid plan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="border-t bg-primary py-12 text-primary-foreground md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="mb-4 text-3xl font-bold">
                                    Ready to create professional nutrition labels?
                                </h2>
                                <p className="mb-8 text-lg opacity-90">
                                    Join thousands of meal prep professionals who use MacroPrint.
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
                </main>

                <footer className="border-t bg-muted/30 py-6">
                    <div className="container text-center text-sm text-muted-foreground">
                        <p>
                            <strong className="text-foreground">Disclaimer:</strong> This tool provides calculated nutrition information.
                            It is not a substitute for professional legal or nutritional advice. Consult a qualified professional
                            for compliance verification.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}
