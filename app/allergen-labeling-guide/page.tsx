import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, AlertTriangle, CheckCircle, FileText, ArrowRight, Calculator } from 'lucide-react'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'),
    title: 'Allergen Labeling Requirements | FDA Guide for Food Business',
    description:
        'Complete guide to allergen labeling requirements for prepared meals. Learn FDA top 9 allergens, disclosure rules, and cross-contamination warnings.',
    keywords: [
        'allergen labeling requirements for prepared meals',
        'food allergen labeling laws',
        'allergen disclosure meal prep',
        'FDA allergen requirements',
        'top 9 allergens labeling',
    ],
    openGraph: {
        title: 'Allergen Labeling Requirements | FDA Guide',
        description: 'Complete guide to allergen labeling for prepared meals. FDA top 9 allergens and disclosure rules.',
        url: '/allergen-labeling-guide',
        type: 'website',
    },
    alternates: {
        canonical: '/allergen-labeling-guide',
    },
}

export default function AllergenLabelingGuidePage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Do I need to list allergens if they\'re obvious (e.g., milk in yogurt)?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. All major allergens must be disclosed, even if obvious. The FDA requires clear allergen statements for milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, and sesame.',
                },
            },
            {
                '@type': 'Question',
                name: 'What if I\'m not sure if there\'s cross-contamination?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Use a precautionary statement ("May contain [allergen]" or "Processed in a facility that also handles [allergen]"). Better safe than liable.',
                },
            },
            {
                '@type': 'Question',
                name: 'Are gluten-free claims regulated?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. "Gluten-free" claims have specific FDA requirements (under 20 ppm gluten). You cannot make this claim without meeting the standard.',
                },
            },
        ],
    }

    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Label Allergens on Prepared Meals',
        description: 'Step-by-step guide to FDA allergen labeling for meal prep and food businesses',
        step: [
            {
                '@type': 'HowToStep',
                name: 'Identify the Top 9 Major Allergens',
                text: 'Check if your ingredients contain milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, or sesame.',
            },
            {
                '@type': 'HowToStep',
                name: 'Add "Contains" Statement',
                text: 'Include a clear "Contains: [allergen list]" statement immediately after the ingredient list.',
            },
            {
                '@type': 'HowToStep',
                name: 'Check for Cross-Contamination',
                text: 'If you share equipment or facilities, add precautionary statements like "May contain [allergen]".',
            },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
                    <section className="border-b bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm">
                                    <Shield className="h-4 w-4 text-primary" />
                                    <span>FDA Compliance Guide</span>
                                </div>
                                <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                    Allergen Labeling Guide for Prepared Meal Businesses
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    Allergen mislabeling is a serious compliance risk. FDA requires disclosure of top 9 allergens.
                                    This guide is for meal prep, catering, and delivery services.
                                </p>
                                <div className="mt-6 rounded-lg border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                                    <div className="flex gap-2">
                                        <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
                                        <div>
                                            <p className="font-semibold text-red-900 dark:text-red-100">
                                                CAUTION: Allergen mislabeling can result in recalls, fines, or serious harm to customers.
                                            </p>
                                            <p className="mt-1 text-sm text-red-800 dark:text-red-200">
                                                Always verify with a food safety professional.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Top 9 Allergens */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    The Top 9 Major Food Allergens
                                </h2>
                                <p className="mb-6 text-muted-foreground">
                                    These account for 90% of food allergies and must be disclosed even in trace amounts.
                                </p>
                                <div className="grid gap-3 md:grid-cols-3">
                                    {['Milk', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat', 'Soybeans', 'Sesame'].map((allergen) => (
                                        <Card key={allergen}>
                                            <CardContent className="flex items-center gap-2 p-4">
                                                <CheckCircle className="h-5 w-5 text-primary" />
                                                <span className="font-medium">{allergen}</span>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    <strong>Note:</strong> Sesame was added as the 9th major allergen in 2023. Many businesses still miss this one.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* How to Disclose */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    How to Disclose Allergens on Labels
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">Option 1: "Contains" Statement (Recommended)</h3>
                                        <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
                                            Contains: Milk, Eggs, Wheat
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Clearer and easier for customers to spot quickly.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">Option 2: Parenthetical in Ingredient List</h3>
                                        <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
                                            Ingredients: Enriched flour (wheat), whey (milk), eggs
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Acceptable but less prominent than "Contains" statement.
                                        </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        The "Contains" statement must appear immediately after the ingredient list.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cross-Contamination */}
                    <section className="py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    Cross-Contamination Warnings
                                </h2>
                                <p className="mb-4 text-muted-foreground">
                                    "May contain" or "Processed in a facility that also processes [allergen]" statements are not required by FDA
                                    but recommended for liability protection, especially in shared kitchen environments (ghost kitchens, co-packers).
                                </p>
                                <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
                                    Allergen Warning: Processed in a facility that also handles tree nuts and shellfish.
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Common in shared commercial kitchens where cross-contact is possible.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Common Mistakes */}
                    <section className="border-t bg-muted/30 py-12 md:py-16">
                        <div className="container">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                                    Common Allergen Labeling Mistakes
                                </h2>
                                <div className="space-y-4">
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                                Missing Sesame (newly added 2023)
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Many businesses haven't updated labels to include sesame, which became the 9th major allergen in 2023.
                                        </CardContent>
                                    </Card>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                                Incomplete Disclosure
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Listing "whey" in ingredients but not disclosing "milk" in the Contains statement.
                                        </CardContent>
                                    </Card>
                                    <Card className="border-red-200 dark:border-red-900">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                                Vague Language
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Using "may contain allergens" instead of specifically listing which allergens.
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
                                <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 font-semibold">Do I need to list allergens if they're obvious (e.g., milk in yogurt)?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Yes. All major allergens must be disclosed, even if obvious.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">What if I'm not sure if there's cross-contamination?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Use a precautionary statement ("May contain [allergen]"). Better safe than liable.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Are gluten-free claims regulated?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Yes. "Gluten-free" claims have specific FDA requirements (under 20 ppm gluten).
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
                                    Automatically detect allergens with our label generator
                                </h2>
                                <p className="mb-6 text-lg opacity-90">
                                    MacroPrint auto-detects all top 9 allergens from your ingredient list and generates compliant disclosure statements.
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
