import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, ArrowRight, Calculator } from 'lucide-react'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'),
    title: 'Nutrition Facts vs Macros: What's the Difference?',
  description:
    'Understand the difference between nutrition facts and macros. Learn what meal prep businesses need to know about macronutrients vs full nutrition panels.',
    keywords: [
        'nutrition facts vs macros',
        'macros vs nutrition facts',
        'what is the difference between nutrition facts and macros',
        'macronutrients vs nutrition facts',
    ],
    openGraph: {
        title: 'Nutrition Facts vs Macros: What's the Difference?',
    description: 'Simple guide explaining the difference between nutrition facts and macros for meal prep businesses.',
        url: '/nutrition-facts-vs-macros',
        type: 'article',
    },
    alternates: {
        canonical: '/nutrition-facts-vs-macros',
    },
}

export default function NutritionFactsVsMacrosPage() {
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
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                Nutrition Facts vs Macros: What's the Difference?
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                If you're a meal prep business, customers often ask for "macros." But FDA requires "nutrition facts." Here's what you need to know.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Quick Answer</h2>
                            <Card className="border-primary">
                                <CardContent className="p-6">
                                    <p className="mb-4 font-semibold">Macros (short for macronutrients) are a subset of nutrition facts.</p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li>• <strong className="text-foreground">Macros</strong> = Protein, Carbs, Fat, Calories</li>
                                        <li>• <strong className="text-foreground">Nutrition Facts</strong> = Macros + Sodium, Cholesterol, Fiber, Sugars, Vitamins, Minerals, % Daily Value</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <h2 className="mb-6 mt-12 text-2xl font-bold md:text-3xl">What are Macros?</h2>
                            <p className="mb-4 text-muted-foreground">
                                "Macros" is fitness industry slang for the three macronutrients: protein, carbohydrates, and fat. Add calories, and that's what most people mean when they say "macros."
                            </p>
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <p className="mb-2 text-3xl font-bold text-primary">P</p>
                                        <p className="font-semibold">Protein</p>
                                        <p className="mt-2 text-xs text-muted-foreground">Builds muscle<br />4 cal/gram</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <p className="mb-2 text-3xl font-bold text-primary">C</p>
                                        <p className="font-semibold">Carbohydrates</p>
                                        <p className="mt-2 text-xs text-muted-foreground">Energy source<br />4 cal/gram</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <p className="mb-2 text-3xl font-bold text-primary">F</p>
                                        <p className="font-semibold">Fat</p>
                                        <p className="mt-2 text-xs text-muted-foreground">Hormone health<br />9 cal/gram</p>
                                    </CardContent>
                                </Card>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">
                                Meal prep customers care about macros because they're tracking their calorie/macro goals for fitness or weight loss.
                            </p>

                            <h2 className="mb-6 mt-12 text-2xl font-bold md:text-3xl">What are Nutrition Facts?</h2>
                            <p className="mb-4 text-muted-foreground">
                                The FDA "Nutrition Facts" panel is the full regulated label you see on packaged foods. It includes macros plus micronutrients, fiber, sodium, cholesterol, and more.
                            </p>
                            <Card>
                                <CardContent className="p-6">
                                    <p className="mb-3 font-semibold">Full Nutrition Facts Include:</p>
                                    <ul className="grid gap-2 text-sm md:grid-cols-2">
                                        <li>• Calories</li>
                                        <li>• Total Fat (Saturated, Trans)</li>
                                        <li>• Cholesterol</li>
                                        <li>• Sodium</li>
                                        <li>• Total Carbohydrate</li>
                                        <li>• Dietary Fiber</li>
                                        <li>• Total Sugars (Added Sugars)</li>
                                        <li>• Protein</li>
                                        <li>• Vitamin D</li>
                                        <li>• Calcium</li>
                                        <li>• Iron</li>
                                        <li>• Potassium</li>
                                        <li>• % Daily Value for each nutrient</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <h2 className="mb-6 mt-12 text-2xl font-bold md:text-3xl">Do Meal Prep Businesses Need Full Nutrition Facts?</h2>
                            <p className="mb-4 text-muted-foreground">It depends on your business model:</p>
                            <div className="space-y-4">
                                <Card className="border-green-200 dark:border-green-900">
                                    <CardContent className="p-6">
                                        <p className="mb-2 font-semibold text-green-700 dark:text-green-400">✅ YES, you need full Nutrition Facts if:</p>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• Selling packaged meals with any nutrition or health claims</li>
                                            <li>• Shipping across state lines</li>
                                            <li>• Making claims like "high protein" or "low carb"</li>
                                            <li>• Selling in retail stores</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="border-yellow-200 dark:border-yellow-900">
                                    <CardContent className="p-6">
                                        <p className="mb-2 font-semibold text-yellow-700 dark:text-yellow-400">⚠️ MAYBE, just macros are okay if:</p>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• You're a local meal prep service with no health claims</li>
                                            <li>• Providing nutrition info voluntarily (not required by law)</li>
                                            <li>• Customers only care about calories/protein/carbs/fat</li>
                                        </ul>
                                        <p className="mt-3 text-xs text-muted-foreground">
                                            However, offering full Nutrition Facts builds more trust and professionalism.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <h2 className="mb-6 mt-12 text-2xl font-bold md:text-3xl">Why Customers Want Macros</h2>
                            <p className="mb-4 text-muted-foreground">
                                The fitness industry has popularized "macro tracking" as a simple way to control calories without obsessing over every micronutrient. Apps like MyFitnessPal focus on macros.
                            </p>
                            <div className="rounded-lg border bg-muted p-4">
                                <p className="text-sm">
                                    <strong>Example:</strong> A customer tracking "40% carbs, 30% protein, 30% fat" for a 2,000 cal diet only cares about P/C/F totals, not sodium or vitamin D.
                                </p>
                            </div>

                            <h2 className="mb-6 mt-12 text-2xl font-bold md:text-3xl">Can You Display Just Macros?</h2>
                            <p className="mb-4 text-muted-foreground">
                                If you're <strong>not legally required</strong> to provide nutrition info, you can voluntarily display just macros on your website or menu.
                            </p>
                            <p className="mb-4 text-muted-foreground">
                                However, if you <strong>are required</strong> to label (e.g., packaged meals with claims), you must use the full FDA format, not a simplified macro-only display.
                            </p>
                            <div className="rounded-lg border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                                <p className="text-sm text-blue-900 dark:text-blue-100">
                                    <strong>Best practice:</strong> Provide full Nutrition Facts (compliant with FDA) and highlight macros prominently for customer convenience.
                                </p>
                            </div>

                            <h2 className="mb-6 mt-12 text-2xl font-bold md:text-3xl">Summary</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b bg-muted">
                                            <th className="p-3 text-left font-semibold"></th>
                                            <th className="p-3 text-left font-semibold">Macros Only</th>
                                            <th className="p-3 text-left font-semibold">Full Nutrition Facts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="p-3 font-medium">What's Included</td>
                                            <td className="p-3 text-muted-foreground">Protein, Carbs, Fat, Calories</td>
                                            <td className="p-3 text-muted-foreground">Macros + Sodium, Cholesterol, Fiber, Sugars, Vitamins, %DV</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-medium">Legal Use</td>
                                            <td className="p-3 text-muted-foreground">Voluntary info only</td>
                                            <td className="p-3 text-muted-foreground">Required if making claims or selling packaged</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-3 font-medium">Best For</td>
                                            <td className="p-3 text-muted-foreground">Fitness-focused customers</td>
                                            <td className="p-3 text-muted-foreground">FDA compliance + broader audience</td>
                                        </tr>
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
                                Get Both: Macros + Full Nutrition Facts
                            </h2>
                            <p className="mb-6 text-lg opacity-90">
                                MacroPrint generates FDA-compliant labels that highlight macros for your fitness-focused customers.
                            </p>
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <Link href="/macro-calculator">
                                    <Button size="lg" variant="secondary" className="gap-2">
                                        <Calculator className="h-5 w-5" />
                                        Try Free Macro Calculator
                                    </Button>
                                </Link>
                                <Link href="/nutrition-label-generator">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                                    >
                                        See Full Label Generator
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
                        Learn more: <Link href="/fda-labeling-requirements-meal-prep" className="text-primary underline">FDA Labeling Requirements</Link>
                    </p>
                </div>
            </footer>
        </div>
    )
}
