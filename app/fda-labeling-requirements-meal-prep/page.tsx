import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Shield, Scale, AlertTriangle, CheckCircle, ArrowRight, Calculator } from 'lucide-react'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'),
    title: 'FDA Labeling Requirements for Meal Prep | 2026 Compliance',
    description:
        'Understand FDA nutrition labeling requirements for meal prep businesses. Plain-language guide to nutrition facts, allergens, and serving sizes.',
    keywords: [
        'FDA labeling requirements for meal prep',
        'meal prep FDA compliance',
        'FDA nutrition label requirements small business',
        'meal delivery labeling laws',
        'prepared food labeling regulations',
    ],
    openGraph: {
        title: 'FDA Labeling Requirements for Meal Prep | 2026 Compliance',
        description: 'Plain-language guide to nutrition labeling requirements for meal prep businesses.',
        url: '/fda-labeling-requirements-meal-prep',
        type: 'article',
    },
    alternates: {
        canonical: '/fda-labeling-requirements-meal-prep',
    },
}

export default function FDALabelingRequirementsPage() {
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'FDA Labeling Requirements for Meal Prep Businesses',
        description: 'Complete guide to FDA nutrition labeling requirements for meal prep, catering, and prepared food businesses.',
        author: {
            '@type': 'Organization',
            name: 'MacroPrint',
        },
        publisher: {
            '@type': 'Organization',
            name: 'MacroPrint',
            logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
            },
        },
        datePublished: '2026-01-18',
        dateModified: '2026-01-18',
    }

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Can I use nutritional data from MyFitnessPal or other apps?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The FDA recommends using USDA FoodData Central or lab analysis. Consumer apps aren\'t designed for compliance labeling.',
                },
            },
            {
                '@type': 'Question',
                name: 'What if my recipe changes slightly?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'If the change affects nutrition facts by more than 20%, you should update the label.',
                },
            },
            {
                '@type': 'Question',
                name: 'Do I need to register with the FDA?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Most meal prep businesses must register as food facilities. This is separate from labeling compliance.',
                },
            },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
                    <section className="border-b bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm">
                                    <Shield className="h-4 w-4 text-primary" />
                                    <span>Compliance Guide 2026</span>
                                </div>
                                <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                    FDA Labeling Requirements for Meal Prep Businesses
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    Understand FDA nutrition labeling requirements for meal prep businesses. Plain-language guide
                                    to nutrition facts, allergens, and serving sizes.
                                </p>
                                <div className="mt-6 rounded-lg border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                                    <div className="flex gap-2">
                                        <AlertTriangle className="h-5 w-5 shrink-0 text-blue-600" />
                                        <div>
                                            <p className="font-semibold text-blue-900 dark:text-blue-100">
                                                IMPORTANT: This is educational content only.
                                            </p>
                                            <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">
                                                Always consult your local health department or food safety professional for compliance verification.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Do You Need a Label */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    Do You Need a Nutrition Label?
                                </h2>
                                <div className="space-y-4">
                                    <Card className="border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                YES if:
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li>• Selling packaged prepared meals with nutrition or health claims</li>
                                                <li>• Shipping across state lines</li>
                                                <li>• Making claims like "high protein" or "low carb"</li>
                                                <li>• Selling in retail stores</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-yellow-200 dark:border-yellow-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                                MAYBE if:
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li>• Selling locally (check state cottage food laws)</li>
                                                <li>• Prepared on-site for immediate consumption</li>
                                                <li>• Small volume operations (check state thresholds)</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                                                NO if:
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li>• Dine-in restaurant only (no packaged foods)</li>
                                                <li>• No nutrition or health claims made</li>
                                                <li>• Exempt under cottage food laws</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Not sure? Check your state's requirements. Federal FDA regulations are baseline,
                                    but states may have additional rules.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* What's Required on the Panel */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    What's Required on the Nutrition Facts Panel
                                </h2>
                                <div className="rounded-lg border bg-background p-6">
                                    <h3 className="mb-4 font-semibold">Required Nutrients (in order):</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span><strong>Calories</strong></span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span><strong>Total Fat</strong> (Saturated Fat, Trans Fat)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span><strong>Cholesterol</strong></span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span><strong>Sodium</strong></span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span><strong>Total Carbohydrate</strong> (Dietary Fiber, Total Sugars, Added Sugars)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span><strong>Protein</strong></span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span><strong>Vitamin D, Calcium, Iron, Potassium</strong></span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary" />
                                            <span><strong>% Daily Value</strong> for each applicable nutrient</span>
                                        </li>
                                    </ul>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        The FDA updated the format in 2020. Make sure you're using the new design with larger font
                                        for calories and updated Daily Value percentages.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Serving Size Rules */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    Serving Size Rules
                                </h2>
                                <p className="mb-4 text-muted-foreground">
                                    Serving sizes must be based on Reference Amounts Customarily Consumed (RACC), not arbitrary amounts.
                                </p>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Example: Meal-Type Dishes</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                        <p>
                                            If your meal prep container is 12 oz but the RACC for "meal type dishes" is 8 oz,
                                            you may need to label it as 1.5 servings.
                                        </p>
                                        <div className="rounded-lg bg-muted p-3 font-mono text-xs">
                                            Serving size: 8 oz (240g)<br />
                                            Servings per container: 1.5
                                        </div>
                                        <p className="text-muted-foreground">
                                            <strong>Important:</strong> Don't manipulate serving sizes to make nutrition look better.
                                            The FDA requires realistic portions.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Allergen Disclosure */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    Allergen Disclosure Requirements
                                </h2>
                                <p className="mb-4 text-muted-foreground">
                                    Top 9 major allergens (milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, sesame)
                                    must be disclosed.
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-2 font-semibold">Required Format:</h3>
                                        <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
                                            Contains: Milk, Eggs, Wheat
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Cross-Contamination (Optional but Recommended):</h3>
                                        <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
                                            May contain: Tree nuts, Sesame
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    <Link href="/allergen-labeling-guide" className="text-primary underline">
                                        Read full allergen labeling guide →
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Rounding Rules */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    FDA Rounding Rules
                                </h2>
                                <p className="mb-4 text-muted-foreground">
                                    The FDA has specific rounding thresholds to simplify labels and reduce clutter.
                                </p>
                                <div className="space-y-3">
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="font-medium">Calories</p>
                                            <p className="text-sm text-muted-foreground">
                                                Round to nearest 5 if &lt;50 cal, nearest 10 if ≥50 cal
                                            </p>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                Example: 49 cal → 50 cal, 148 cal → 150 cal
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="font-medium">Fat, Carbs, Protein</p>
                                            <p className="text-sm text-muted-foreground">
                                                &lt;1g → Round to nearest 0.5g  |  ≥1g → Round to nearest 1g
                                            </p>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                Example: 4.8g protein → 5g, 0.3g fat → 0g (if &lt;0.5g)
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="font-medium">% Daily Value</p>
                                            <p className="text-sm text-muted-foreground">
                                                Always round to whole numbers
                                            </p>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                Example: 4.8% → 5%
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    MacroPrint handles all FDA rounding automatically.
                                    <Link href="/fda-rounding-rules" className="ml-1 text-primary underline">
                                        Learn more about rounding rules →
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Exemptions */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    Exemptions for Small Businesses
                                </h2>
                                <div className="rounded-lg border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
                                    <div className="flex gap-2">
                                        <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-600" />
                                        <div>
                                            <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                                                WARNING: Exemptions may not apply if making nutrient claims
                                            </p>
                                            <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-200">
                                                If you claim "high protein" or "low carb," you MUST have a nutrition label,
                                                even if you qualify for an exemption.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <h3 className="mb-2 font-semibold">Low-Volume Exemption:</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Fewer than 100,000 units sold annually OR average fewer than 100,000 units sold per year
                                            over the past 3 years
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Small Business Exemption:</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Fewer than 100 full-time employees AND low annual food sales (check current threshold)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How to Get Nutrition Facts */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    How to Get Nutrition Facts
                                </h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">USDA Database</CardTitle>
                                            <p className="text-sm text-muted-foreground">Most common for small businesses</p>
                                        </CardHeader>
                                        <CardContent className="text-sm">
                                            <p className="font-semibold text-primary">Free</p>
                                            <p className="mt-2 text-muted-foreground">
                                                Calculate nutrition from FoodData Central ingredient database
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Lab Testing</CardTitle>
                                            <p className="text-sm text-muted-foreground">Most accurate</p>
                                        </CardHeader>
                                        <CardContent className="text-sm">
                                            <p className="font-semibold">$300-$800/product</p>
                                            <p className="mt-2 text-muted-foreground">
                                                Required for specific nutrient claims or marketing needs
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-primary">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Software (MacroPrint)</CardTitle>
                                            <p className="text-sm text-muted-foreground">Fast & affordable</p>
                                        </CardHeader>
                                        <CardContent className="text-sm">
                                            <p className="font-semibold text-primary">$29/month</p>
                                            <p className="mt-2 text-muted-foreground">
                                                Automated USDA calculations with FDA rounding
                                            </p>
                                            <Link href="/nutrition-label-generator" className="mt-3 block">
                                                <Button size="sm" className="w-full">Try Generator</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 font-semibold">Can I use nutritional data from MyFitnessPal or other apps?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            The FDA recommends using USDA FoodData Central or lab analysis. Consumer apps aren't designed
                                            for compliance labeling.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">What if my recipe changes slightly?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            If the change affects nutrition facts by more than 20%, you should update the label.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Do I need to register with the FDA?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Most meal prep businesses must register as food facilities. This is separate from labeling compliance.
                                            Visit FDA.gov for registration requirements.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="border-t bg-primary py-12 text-primary-foreground">
                        <div className="container">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                    Automate FDA-Compliant Labels
                                </h2>
                                <p className="mb-6 text-lg opacity-90">
                                    MacroPrint uses FDA rounding rules and formatting guidelines automatically.
                                </p>
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                    <Link href="/macro-calculator">
                                        <Button size="lg" variant="secondary" className="gap-2">
                                            <Calculator className="h-5 w-5" />
                                            Try Free Calculator
                                        </Button>
                                    </Link>
                                    <Link href="/how-to-create-nutrition-labels">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                                        >
                                            Step-by-Step Guide
                                            <ArrowRight className="ml-2 h-4 w-4" />
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
                            <strong className="text-foreground">Disclaimer:</strong> This guide is for educational purposes only.
                            MacroPrint is not a law firm and does not provide legal advice. Consult a qualified food safety attorney
                            or regulatory consultant for compliance verification.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}
