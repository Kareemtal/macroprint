import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Scale, Calculator, CheckCircle, ArrowRight, Zap } from 'lucide-react'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'),
    title: 'How to Create Nutrition Labels (Step-by-Step Guide 2026)',
    description:
        'Learn how to create professional nutrition labels for your meal prep or food business. Step-by-step tutorial from recipe to FDA-compliant label.',
    keywords: [
        'how to create nutrition labels',
        'make nutrition label for homemade food',
        'nutrition label tutorial',
        'create FDA nutrition facts label',
        'nutrition label step by step',
    ],
    openGraph: {
        title: 'How to Create Nutrition Labels (Step-by-Step Guide)',
        description: 'Complete tutorial on creating FDA-compliant nutrition labels for meal prep businesses.',
        url: '/how-to-create-nutrition-labels',
        type: 'article',
    },
    alternates: {
        canonical: '/how-to-create-nutrition-labels',
    },
}

export default function HowToCreateNutritionLabelsPage() {
    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Create Nutrition Labels for Meal Prep',
        description: 'Step-by-step guide to creating FDA-compliant nutrition labels for meal prep and food businesses',
        totalTime: 'PT30M',
        step: [
            {
                '@type': 'HowToStep',
                name: 'Finalize Your Recipe',
                text: 'Lock in your exact recipe with precise ingredient weights in grams. Don\'t estimate.',
                position: 1,
            },
            {
                '@type': 'HowToStep',
                name: 'Look Up Ingredient Nutrition Data',
                text: 'Use USDA FoodData Central to find nutrition facts for each ingredient.',
                position: 2,
            },
            {
                '@type': 'HowToStep',
                name: 'Calculate Total Nutrition',
                text: 'Sum all nutrients from all ingredients to get batch totals.',
                position: 3,
            },
            {
                '@type': 'HowToStep',
                name: 'Divide by Servings',
                text: 'Divide total nutrition by number of servings to get per-serving values.',
                position: 4,
            },
            {
                '@type': 'HowToStep',
                name: 'Apply FDA Rounding Rules',
                text: 'Round calories, nutrients, and % Daily Value per FDA guidelines.',
                position: 5,
            },
            {
                '@type': 'HowToStep',
                name: 'Format the Label',
                text: 'Use FDA-compliant Nutrition Facts panel format with proper font sizes and spacing.',
                position: 6,
            },
            {
                '@type': 'HowToStep',
                name: 'Add Allergen Warnings',
                text: 'Disclose all top 9 allergens in a clear "Contains" statement.',
                position: 7,
            },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

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
                                    <Scale className="h-4 w-4 text-primary" />
                                    <span>Complete Tutorial</span>
                                </div>
                                <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                    How to Create Nutrition Labels (Step-by-Step)
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    Learn how to create professional, FDA-compliant nutrition labels for your meal prep or food business.
                                    From recipe to finished label in 7 steps.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Overview */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    Two Ways to Create Nutrition Labels
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Manual Method</CardTitle>
                                            <p className="text-sm text-muted-foreground">Spreadsheets + USDA database</p>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mb-4 text-sm">
                                                Free but time-intensive. Expect 2-3 hours per label.
                                            </p>
                                            <p className="text-sm font-semibold">Best for:</p>
                                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                <li>• 1-2 recipes total</li>
                                                <li>• One-time projects</li>
                                                <li>• Learning process</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-primary">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                Automated Software
                                                <Zap className="h-4 w-4 text-primary" />
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">Tools like MacroPrint</p>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mb-4 text-sm">
                                                Paid but fast. 15 minutes per label, automatic FDA rounding.
                                            </p>
                                            <p className="text-sm font-semibold">Best for:</p>
                                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                <li>• 10+ recipes</li>
                                                <li>• Recurring updates</li>
                                                <li>• Professional quality</li>
                                            </ul>
                                            <Link href="/nutrition-label-generator" className="mt-4 block">
                                                <Button className="w-full">Try Label Generator</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Step by Step */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                                    Step-by-Step: Manual Method
                                </h2>
                                <div className="space-y-8">
                                    {/* Step 1 */}
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-semibold">Finalize Your Recipe</h3>
                                            <p className="mb-3 text-sm text-muted-foreground">
                                                Lock in your exact recipe. Weigh every ingredient in grams (not cups/tablespoons).
                                                Don't estimate — precision matters for compliance.
                                            </p>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <p className="text-xs font-semibold">Example Recipe (Chicken Bowl):</p>
                                                    <ul className="mt-2 space-y-1 text-xs font-mono">
                                                        <li>• 200g chicken breast, cooked</li>
                                                        <li>• 150g brown rice, cooked</li>
                                                        <li>• 80g broccoli, steamed</li>
                                                        <li>• 20g olive oil</li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-semibold">Look Up Ingredient Nutrition Data</h3>
                                            <p className="mb-3 text-sm text-muted-foreground">
                                                Visit USDA FoodData Central (fdc.nal.usda.gov). Search for each ingredient.
                                                Download the nutrition info per 100g.
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                                <strong>Tip:</strong> Use "SR Legacy" for standard reference values rather than branded products.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-semibold">Calculate Total Nutrition</h3>
                                            <p className="mb-3 text-sm text-muted-foreground">
                                                For each ingredient, multiply the per-100g values by your actual weight.
                                                Sum all ingredients to get the batch total.
                                            </p>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <p className="text-xs font-semibold">Example Calculation (Protein):</p>
                                                    <ul className="mt-2 space-y-1 font-mono text-xs">
                                                        <li>• Chicken: 200g × 31g/100g = 62g</li>
                                                        <li>• Rice: 150g × 2.7g/100g = 4g</li>
                                                        <li>• Broccoli: 80g × 2.8g/100g = 2.2g</li>
                                                        <li>• Oil: 0g protein</li>
                                                        <li className="border-t pt-1">
                                                            <strong>Total: 68.2g protein (batch)</strong>
                                                        </li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            4
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-semibold">Divide by Servings</h3>
                                            <p className="mb-3 text-sm text-muted-foreground">
                                                Divide all batch totals by the number of servings. Use realistic serving sizes based on FDA RACC.
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                                If your batch makes 2 servings: 68.2g protein ÷ 2 = 34.1g protein per serving
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 5 */}
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            5
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-semibold">Apply FDA Rounding Rules</h3>
                                            <p className="mb-3 text-sm text-muted-foreground">
                                                Round per FDA guidelines. Calories round to nearest 10 (if ≥50 cal), protein/carbs/fat round to nearest 1g.
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                                34.1g protein → 34g  |  148 cal → 150 cal
                                                <Link href="/fda-rounding-rules" className="ml-2 text-primary underline">
                                                    See all FDA rounding rules →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 6 */}
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            6
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-semibold">Format the Label</h3>
                                            <p className="mb-3 text-sm text-muted-foreground">
                                                Use the FDA Nutrition Facts panel format. Download a template or use design software.
                                                The 2020 format has specific font sizes and spacing requirements.
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                                <strong>Font requirements:</strong> Use Helvetica Black for "Nutrition Facts", standard Helvetica for everything else.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 7 */}
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                            7
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-2 font-semibold">Add Allergen Warnings</h3>
                                            <p className="mb-3 text-sm text-muted-foreground">
                                                Check ingredients for top 9 allergens. Add a "Contains:" statement after the ingredient list.
                                            </p>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <p className="font-mono text-xs">Contains: Milk, Wheat</p>
                                                </CardContent>
                                            </Card>
                                            <Link href="/allergen-labeling-guide" className="mt-2 block text-xs text-primary underline">
                                                Read full allergen guide →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Common Mistakes */}
                    <section className="border-t py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    Common Mistakes to Avoid
                                </h2>
                                <div className="space-y-3">
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="font-semibold">❌ Using volume instead of weight</p>
                                            <p className="text-sm text-muted-foreground">
                                                "1 cup chicken" varies. Always use grams for accuracy.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="font-semibold">❌ Forgetting to account for cooking</p>
                                            <p className="text-sm text-muted-foreground">
                                                200g raw chicken ≠ 200g cooked chicken. Use "cooked" values or weigh after cooking.
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="font-semibold">❌ Wrong serving size calculation</p>
                                            <p className="text-sm text-muted-foreground">
                                                Don't manipulate servings to make macros look better. FDA requires realistic portions.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link href="/nutrition-labeling-mistakes">
                                        <Button variant="outline">See All 7 Mistakes →</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Automated Alternative */}
                    <section className="border-t bg-primary py-12 text-primary-foreground md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl text-center">
                                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                    Skip the Spreadsheets
                                </h2>
                                <p className="mb-6 text-lg opacity-90">
                                    MacroPrint automates steps 2-6. Add ingredients, get FDA-compliant labels in 15 minutes.
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
                            Verify all nutrition labels with a food safety professional before commercial use.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}
