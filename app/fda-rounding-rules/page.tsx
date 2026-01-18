import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Scale, Calculator, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'),
    title: 'FDA Rounding Rules for Nutrition Labels (2026 Guide)',
    description:
        'Master FDA rounding rules for nutrition labels. Learn calorie, protein, carb, fat, and % Daily Value rounding thresholds to avoid compliance errors.',
    keywords: [
        'FDA rounding rules nutrition labels',
        'nutrition facts rounding',
        'FDA calorie rounding',
        'how to round nutrition facts',
        'nutrition label rounding thresholds',
    ],
    openGraph: {
        title: 'FDA Rounding Rules for Nutrition Labels',
        description: 'Complete guide to FDA rounding for calories, macros, and % Daily Value on nutrition labels.',
        url: '/fda-rounding-rules',
        type: 'article',
    },
    alternates: {
        canonical: '/fda-rounding-rules',
    },
}

export default function FDARoundingRulesPage() {
    return (
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
                <section className="border-b bg-muted/30 py-12 md:py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm">
                                <Scale className="h-4 w-4 text-primary" />
                                <span>Technical Reference</span>
                            </div>
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                FDA Rounding Rules for Nutrition Labels
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                The FDA requires specific rounding thresholds for nutrition facts. This guide covers calories, macros, vitamins, and % Daily Value rounding.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Why Rounding Matters</h2>
                            <p className="mb-4 text-muted-foreground">
                                The FDA doesn't want nutrition labels cluttered with decimal points. Rounding makes labels easier to read, but you must follow exact thresholds or risk non-compliance.
                            </p>
                            <div className="rounded-lg border bg-muted p-4">
                                <p className="text-sm">
                                    <strong>Example error:</strong> Rounding 148 calories to 145 cal instead of 150 cal is a violation.
                                </p>
                            </div>

                            <h2 className="mb-6 mt-12 text-2xl font-bold md:text-3xl">Complete FDA Rounding Rules</h2>

                            <div className="space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 text-lg font-semibold">Calories</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&lt;5 cal → Express as 0</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>5-50 cal → Round to nearest 5 (e.g., 49 → 50)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>Above 50 cal → Round to nearest 10 (e.g., 148 → 150)</span>
                                            </li>
                                        </ul>
                                        <div className="mt-4 rounded bg-muted p-3 font-mono text-xs">
                                            Examples: 3 cal → 0 cal  |  47 cal → 45 cal  |  148 cal → 150 cal
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 text-lg font-semibold">Total Fat, Saturated Fat, Trans Fat</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&lt;0.5g → Express as 0g</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>0.5g to &lt;5g → Round to nearest 0.5g</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>≥5g → Round to nearest 1g</span>
                                            </li>
                                        </ul>
                                        <div className="mt-4 rounded bg-muted p-3 font-mono text-xs">
                                            Examples: 0.3g → 0g  |  2.3g → 2.5g  |  6.8g → 7g
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 text-lg font-semibold">Cholesterol</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&lt;2mg → Express as 0mg (or "less than 5mg")</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>2-5mg → Express as "less than 5mg"</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>≥5mg → Round to nearest 5mg</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 text-lg font-semibold">Sodium</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&lt;5mg → Express as 0mg</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>5-140mg → Round to nearest 5mg</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&gt;140mg → Round to nearest 10mg</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 text-lg font-semibold">Total Carbohydrate, Dietary Fiber, Total Sugars, Added Sugars</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&lt;0.5g → Express as 0g (or "Contains less than 1g" if desired)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&lt;1g → Round to nearest 1g or use "Contains less than 1g"</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>≥1g → Round to nearest 1g</span>
                                            </li>
                                        </ul>
                                        <div className="mt-4 rounded bg-muted p-3 font-mono text-xs">
                                            Examples: 0.3g → 0g  |  4.8g → 5g
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 text-lg font-semibold">Protein</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&lt;0.5g → Express as 0g</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>&lt;1g → Round to "less than 1g" or nearest 1g</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>≥1g → Round to nearest 1g</span>
                                            </li>
                                        </ul>
                                        <div className="mt-4 rounded bg-muted p-3 font-mono text-xs">
                                            Examples: 0.3g → 0g  |  34.8g → 35g
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 text-lg font-semibold">Vitamins & Minerals (Vitamin D, Calcium, Iron, Potassium)</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>If &lt;2% DV → May declare as 0% or omit</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>Always express as whole % (no decimals)</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-3 text-lg font-semibold">% Daily Value (All Nutrients)</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>Always round to nearest whole number</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>If &lt;1% → May express as "&lt;1%" or omit asterisk</span>
                                            </li>
                                        </ul>
                                        <div className="mt-4 rounded bg-muted p-3 font-mono text-xs">
                                            Examples: 4.8% → 5%  |  0.3% → 0% or &lt;1%
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <h2 className="mb-6 mt-12 text-2xl font-bold md:text-3xl">Quick Reference Table</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b bg-muted">
                                            <th className="p-3 text-left font-semibold">Nutrient</th>
                                            <th className="p-3 text-left font-semibold">Increment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b"><td className="p-3">Calories (&lt;50)</td><td className="p-3">Nearest 5</td></tr>
                                        <tr className="border-b"><td className="p-3">Calories (≥50)</td><td className="p-3">Nearest 10</td></tr>
                                        <tr className="border-b"><td className="p-3">Fat (0.5-5g)</td><td className="p-3">Nearest 0.5g</td></tr>
                                        <tr className="border-b"><td className="p-3">Fat (≥5g)</td><td className="p-3">Nearest 1g</td></tr>
                                        <tr className="border-b"><td className="p-3">Cholesterol</td><td className="p-3">Nearest 5mg</td></tr>
                                        <tr className="border-b"><td className="p-3">Sodium (&lt;140mg)</td><td className="p-3">Nearest 5mg</td></tr>
                                        <tr className="border-b"><td className="p-3">Sodium (≥140mg)</td><td className="p-3">Nearest 10mg</td></tr>
                                        <tr className="border-b"><td className="p-3">Carbs, Protein, Fiber, Sugars</td><td className="p-3">Nearest 1g</td></tr>
                                        <tr className="border-b"><td className="p-3">% Daily Value</td><td className="p-3">Nearest 1%</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t bg-primary py-12 text-primary-foreground">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                Never Worry About Rounding Again
                            </h2>
                            <p className="mb-6 text-lg opacity-90">
                                MacroPrint applies all FDA rounding rules automatically. Zero manual math errors.
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
                        <strong className="text-foreground">Source:</strong> FDA Code of Federal Regulations Title 21, Part 101.
                    </p>
                </div>
            </footer>
        </div>
    )
}
