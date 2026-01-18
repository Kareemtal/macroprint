import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Privacy Policy | MacroPrint',
    description: 'Privacy Policy for MacroPrint nutrition label generator.',
    robots: { index: false, follow: false },
}

export default function PrivacyPage() {
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
                        <h1>Privacy Policy</h1>
                        <p className="text-sm text-muted-foreground">Last updated: January 18, 2026</p>

                        <h2>1. Information We Collect</h2>
                        <p>
                            When you use MacroPrint, we collect information you provide directly to us, including:
                        </p>
                        <ul>
                            <li>Account information (name, email address)</li>
                            <li>Recipe and nutrition data you input</li>
                            <li>Payment information (processed securely by Stripe)</li>
                            <li>Usage data and analytics</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process your transactions and send related information</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Respond to your comments and questions</li>
                            <li>Monitor and analyze trends and usage</li>
                        </ul>

                        <h2>3. Information Sharing</h2>
                        <p>
                            We do not sell your personal information. We may share your information only in the following circumstances:
                        </p>
                        <ul>
                            <li><strong>Service Providers:</strong> We share information with third-party service providers (e.g., Stripe for payments, Google Firebase for hosting)</li>
                            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                        </ul>

                        <h2>4. Data Security</h2>
                        <p>
                            We use industry-standard security measures to protect your data, including encryption and secure servers through Google Firebase.
                        </p>

                        <h2>5. Your Data Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access and download your data</li>
                            <li>Request deletion of your account and data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Request corrections to your data</li>
                        </ul>
                        <p>To exercise these rights, contact us at support@macroprint.com</p>

                        <h2>6. Cookies and Tracking</h2>
                        <p>
                            We use cookies and similar tracking technologies to analyze usage and improve our service.
                            You can control cookies through your browser settings.
                        </p>

                        <h2>7. Third-Party Services</h2>
                        <p>Our service integrates with:</p>
                        <ul>
                            <li><strong>Stripe:</strong> Payment processing (see Stripe's privacy policy)</li>
                            <li><strong>Google Firebase:</strong> Hosting and authentication</li>
                            <li><strong>USDA FoodData Central:</strong> Nutrition data</li>
                        </ul>

                        <h2>8. Children's Privacy</h2>
                        <p>
                            MacroPrint is not intended for users under 18. We do not knowingly collect information from children.
                        </p>

                        <h2>9. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant changes
                            by email or through the service.
                        </p>

                        <h2>10. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact us at:
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
