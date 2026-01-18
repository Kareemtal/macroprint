import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Terms of Service | MacroPrint',
    description: 'Terms of Service for MacroPrint nutrition label generator.',
    robots: { index: false, follow: false },
}

export default function TermsPage() {
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
                    <Link href="/">
                        <Button variant="ghost" size="sm">← Back to Home</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 py-12">
                <div className="container">
                    <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
                        <h1>Terms of Service</h1>
                        <p className="text-sm text-muted-foreground">Last updated: January 18, 2026</p>

                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using MacroPrint ("Service"), you agree to be bound by these Terms of Service.
                            If you do not agree, do not use the Service.
                        </p>

                        <h2>2. Description of Service</h2>
                        <p>
                            MacroPrint provides nutrition label generation software for meal prep businesses, catering services,
                            and food entrepreneurs. The Service uses USDA FoodData Central to calculate nutrition facts and
                            generate FDA-style nutrition labels.
                        </p>

                        <h2>3. User Accounts</h2>
                        <ul>
                            <li>You must be at least 18 years old to create an account</li>
                            <li>You are responsible for maintaining the security of your account</li>
                            <li>You are responsible for all activity under your account</li>
                            <li>You must provide accurate and complete information</li>
                        </ul>

                        <h2>4. Subscription and Payment</h2>
                        <ul>
                            <li><strong>Free Plan:</strong> Limited features as described on our pricing page</li>
                            <li><strong>Paid Plans:</strong> Subscription billing processed by Stripe</li>
                            <li><strong>Refunds:</strong> Pro-rated refunds available within 30 days of initial subscription</li>
                            <li><strong>Cancellation:</strong> You may cancel anytime; access continues until end of billing period</li>
                            <li><strong>Price Changes:</strong> We reserve the right to change pricing with 30 days notice</li>
                        </ul>

                        <h2>5. Use of Service</h2>
                        <p>You agree to:</p>
                        <ul>
                            <li>Use the Service only for lawful purposes</li>
                            <li>Not share your account credentials</li>
                            <li>Not attempt to reverse engineer or copy the Service</li>
                            <li>Not use the Service to create misleading or fraudulent nutrition labels</li>
                        </ul>

                        <h2>6. Disclaimer of Warranties</h2>
                        <div className="rounded-lg border-yellow-200 bg-yellow-50 p-4 not-prose dark:border-yellow-900 dark:bg-yellow-950">
                            <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                                IMPORTANT DISCLAIMER:
                            </p>
                            <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-200">
                                MacroPrint provides calculated nutrition information based on USDA data.
                                <strong> WE DO NOT GUARANTEE ACCURACY OR FDA COMPLIANCE.</strong> You are solely responsible for
                                verifying all nutrition facts before commercial use. MacroPrint is not a substitute for
                                professional nutritional analysis or legal advice.
                            </p>
                        </div>
                        <p className="mt-4">
                            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
                        </p>

                        <h2>7. Limitation of Liability</h2>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, MACROPRINT SHALL NOT BE LIABLE FOR ANY INDIRECT,
                            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
                        </p>
                        <ul>
                            <li>FDA warnings or fines resulting from use of our Service</li>
                            <li>Product recalls due to labeling errors</li>
                            <li>Customer allergic reactions or health issues</li>
                            <li>Loss of business or revenue</li>
                            <li>Data loss or corruption</li>
                        </ul>
                        <p>
                            Our total liability shall not exceed the amount you paid in the past 12 months.
                        </p>

                        <h2>8. Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless MacroPrint from any claims, damages, or expenses
                            arising from your use of the Service, including claims related to nutrition label accuracy
                            or FDA compliance.
                        </p>

                        <h2>9. Intellectual Property</h2>
                        <ul>
                            <li><strong>Your Data:</strong> You retain ownership of your recipes and data</li>
                            <li><strong>Our Service:</strong> MacroPrint retains all rights to the software and technology</li>
                            <li><strong>Generated Labels:</strong> You may use labels commercially, but cannot resell the software itself</li>
                        </ul>

                        <h2>10. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account if you violate these Terms or
                            engage in fraudulent activity. Upon termination, your right to use the Service ceases immediately.
                        </p>

                        <h2>11. Data Retention</h2>
                        <p>
                            If you cancel your subscription, we will retain your data for 30 days before deletion.
                            You can request immediate deletion by contacting support.
                        </p>

                        <h2>12. Modifications to Terms</h2>
                        <p>
                            We may modify these Terms at any time. Material changes will be communicated via email.
                            Continued use of the Service after changes constitutes acceptance.
                        </p>

                        <h2>13. Governing Law</h2>
                        <p>
                            These Terms are governed by the laws of [Your State/Country]. Any disputes shall be
                            resolved in the courts of [Your Jurisdiction].
                        </p>

                        <h2>14. Contact</h2>
                        <p>
                            For questions about these Terms, contact us at:
                            <br />
                            Email: support@macroprint.com
                        </p>
                    </div>
                </div>
            </main>

            <footer className="border-t bg-muted/30 py-6">
                <div className="container text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} MacroPrint. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
