import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, AlertTriangle, CheckCircle, ArrowRight, Calculator, XCircle } from 'lucide-react'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'),
    title: '7 Nutrition Labeling Mistakes That Cost You Money (+ Fixes)',
    description:
        'Avoid costly nutrition labeling mistakes. Learn the 7 most common errors meal prep businesses make and how to fix them before FDA notices.',
    keywords: [
        'nutrition labeling mistakes',
        'FDA labeling errors',
        'nutrition facts label mistakes',
        'meal prep labeling errors',
        'common food labeling violations',
    ],
    openGraph: {
        title: '7 Nutrition Labeling Mistakes That Cost You Money',
        description: 'Avoid costly nutrition labeling errors. Learn the 7 most common mistakes meal prep businesses make.',
        url: '/nutrition-labeling-mistakes',
        type: 'article',
    },
    alternates: {
        canonical: '/nutrition-labeling-mistakes',
    },
}

export default function NutritionLabelingMistakesPage() {
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '7 Nutrition Labeling Mistakes That Cost You Money',
        description: 'Common nutrition labeling errors made by meal prep and food businesses, with solutions.',
        author: {
            '@type': 'Organization',
            name: 'MacroPrint',
        },
        datePublished: '2026-01-18',
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

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
                                    <AlertTriangle className="h-4 w-4 text-red-600" />
                                    <span>Compliance Risk</span>
                                </div>
                                <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                    7 Nutrition Labeling Mistakes That Cost You Money
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    These errors can trigger FDA warnings, product recalls, or customer lawsuits.
                                    Most meal prep businesses make at least 2 of these mistakes.
                                </p>
                                <div className="mt-6 rounded-lg border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                                    <div className="flex gap-2">
                                        <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
                                        <div>
                                            <p className="font-semibold text-red-900 dark:text-red-100">
                                                WARNING: FDA penalties range from $1,000 to $10,000+ per violation
                                            </p>
                                            <p className="mt-1 text-sm text-red-800 dark:text-red-200">
                                                Plus liability if someone has an allergic reaction due to mislabeling.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mistake 1 */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                                            <span className="text-lg font-bold text-red-600">1</span>
                                        </div>
                                        <h2 className="text-2xl font-bold md:text-3xl">
                                            Wrong Serving Size
                                        </h2>
                                    </div>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <XCircle className="h-5 w-5 text-red-600" />
                                                The Mistake
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                Using "1 container" or arbitrary amounts instead of FDA RACC (Reference Amounts Customarily Consumed).
                                            </p>
                                            <p className="text-sm font-semibold">Why it's risky:</p>
                                            <p className="text-sm text-muted-foreground">
                                                The FDA can cite you for misleading serving sizes that make macros look better than they are.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="mt-3 border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                The Fix
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Use FDA's RACC guidelines for your food category. For "meal type dishes,"
                                            the RACC is typically 8 oz (240g). If your container is 12 oz, label it as 1.5 servings.
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Mistake 2 */}
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                                            <span className="text-lg font-bold text-red-600">2</span>
                                        </div>
                                        <h2 className="text-2xl font-bold md:text-3xl">
                                            Missing or Incomplete Allergen Disclosure
                                        </h2>
                                    </div>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <XCircle className="h-5 w-5 text-red-600" />
                                                The Mistake
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Forgetting sesame (added 2023), missing allergens in sauces/condiments,
                                                or vague "may contain allergens" statements.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="mt-3 border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                The Fix
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Always disclose all top 9 allergens (milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soy, sesame).
                                            Use clear "Contains: [allergen list]" statements.
                                            <Link href="/allergen-labeling-guide" className="ml-1 text-primary underline">
                                                See allergen guide →
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Mistake 3 */}
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                                            <span className="text-lg font-bold text-red-600">3</span>
                                        </div>
                                        <h2 className="text-2xl font-bold md:text-3xl">
                                            Rounding Errors
                                        </h2>
                                    </div>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <XCircle className="h-5 w-5 text-red-600" />
                                                The Mistake
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Manual math mistakes (4.8g protein → 4g instead of 5g) or rounding calories incorrectly
                                                (148 cal → 145 cal instead of 150 cal).
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="mt-3 border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                The Fix
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Follow FDA rounding rules. Software like MacroPrint applies these automatically.
                                            <Link href="/fda-rounding-rules" className="ml-1 text-primary underline">
                                                See all rounding rules →
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Mistake 4 */}
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                                            <span className="text-lg font-bold text-red-600">4</span>
                                        </div>
                                        <h2 className="text-2xl font-bold md:text-3xl">
                                            Using Volume Instead of Weight
                                        </h2>
                                    </div>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <XCircle className="h-5 w-5 text-red-600" />
                                                The Mistake
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Measuring ingredients in cups/tablespoons instead of grams. "1 cup chicken" varies wildly.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="mt-3 border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                The Fix
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Always use a digital kitchen scale and measure in grams. This is the only way to ensure consistent, accurate labels.
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Mistake 5 */}
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                                            <span className="text-lg font-bold text-red-600">5</span>
                                        </div>
                                        <h2 className="text-2xl font-bold md:text-3xl">
                                            Not Accounting for Cooking Weight Loss
                                        </h2>
                                    </div>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <XCircle className="h-5 w-5 text-red-600" />
                                                The Mistake
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Using raw chicken nutrition data when you're serving cooked chicken.
                                                200g raw ≠ 200g cooked.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="mt-3 border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                The Fix
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Always use "cooked" nutrition data from USDA, or weigh ingredients after cooking.
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Mistake 6 */}
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                                            <span className="text-lg font-bold text-red-600">6</span>
                                        </div>
                                        <h2 className="text-2xl font-bold md:text-3xl">
                                            Old Nutrition Facts Format
                                        </h2>
                                    </div>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <XCircle className="h-5 w-5 text-red-600" />
                                                The Mistake
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Still using the pre-2020 Nutrition Facts format without updated Daily Values and font sizes.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="mt-3 border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                The Fix
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Use the 2020+ format with larger calorie font, updated % DV, and "Added Sugars" row.
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Mistake 7 */}
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                                            <span className="text-lg font-bold text-red-600">7</span>
                                        </div>
                                        <h2 className="text-2xl font-bold md:text-3xl">
                                            Zero Fiber When There Should Be Some
                                        </h2>
                                    </div>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <XCircle className="h-5 w-5 text-red-600" />
                                                The Mistake
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Forgetting to add fiber from vegetables, whole grains, or legumes. This makes macros look incomplete.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="mt-3 border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                The Fix
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Double-check USDA data for all plant-based ingredients to capture fiber values accurately.
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How to Avoid These Mistakes */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    How to Avoid These Mistakes
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2 text-left">
                                    <Card>
                                        <CardContent className="p-6">
                                            <p className="mb-2 font-semibold">✅ Use USDA Database</p>
                                            <p className="text-sm text-muted-foreground">
                                                Always pull from FoodData Central, not consumer apps
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6">
                                            <p className="mb-2 font-semibold">✅ Weigh in Grams</p>
                                            <p className="text-sm text-muted-foreground">
                                                Digital scale for all ingredients
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6">
                                            <p className="mb-2 font-semibold">✅ Apply FDA Rounding</p>
                                            <p className="text-sm text-muted-foreground">
                                                Follow exact rounding thresholds
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6">
                                            <p className="mb-2 font-semibold">✅ Use Software</p>
                                            <p className="text-sm text-muted-foreground">
                                                Automate calculations to reduce human error
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="border-t bg-primary py-12 text-primary-foreground md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                    Eliminate Labeling Errors Automatically
                                </h2>
                                <p className="mb-6 text-lg opacity-90">
                                    MacroPrint handles FDA rounding, allergen detection, and serving sizes so you don't have to worry about compliance errors.
                                </p>
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                    <Link href="/macro-calculator">
                                        <Button size="lg" variant="secondary" className="gap-2">
                                            <Calculator className="h-5 w-5" />
                                            Try Free Calculator
                                        </Button>
                                    </Link>
                                    <Link href="/nutrition-label-generator">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                                        >
                                            See Label Generator
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
                            <strong className="text-foreground">Disclaimer:</strong> This guide is for educational purposes.
                            Consult a food safety professional for compliance verification.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}
