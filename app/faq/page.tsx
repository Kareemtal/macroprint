import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | MacroPrint',
  description:
    'Common questions about MacroPrint nutrition label generator. Learn about FDA compliance, pricing, allergen tracking, and more.',
  keywords: [
    'nutrition label FAQ',
    'FDA label questions',
    'meal prep labeling',
    'food label compliance',
  ],
  openGraph: {
    title: 'MacroPrint FAQ - Your Questions Answered',
    description:
      'Common questions about nutrition labels, FDA compliance, and meal prep labeling.',
    url: '/faq',
  },
}

const faqs = [
  {
    question: 'Are the labels FDA compliant?',
    answer:
      "MacroPrint generates FDA-style Nutrition Facts labels that follow the FDA's format requirements. However, we provide best-effort calculations using USDA data. You are responsible for verifying accuracy and ensuring compliance with your local regulations. We recommend consulting with a food safety professional for commercial products.",
  },
  {
    question: 'Where does the nutrition data come from?',
    answer:
      "We use the USDA FoodData Central database, which is the official source for nutrition information in the United States. This database contains nutrition data for over 300,000 food items including branded products, raw ingredients, and prepared foods.",
  },
  {
    question: 'How accurate are the calculations?',
    answer:
      "Accuracy depends on several factors: the quality of ingredient matches from the USDA database, accurate weight measurements you provide, and cooking method variations. We apply FDA-standard rounding rules and clearly flag any ingredients with incomplete data. For best results, verify critical values with independent testing.",
  },
  {
    question: 'How does allergen detection work?',
    answer:
      "We automatically scan ingredient names for the FDA's Big 9 allergens: milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, and sesame. However, this is best-effort detection based on ingredient names. You should manually verify all allergen statements, especially for cross-contamination risks.",
  },
  {
    question: 'What label sizes can I print?',
    answer:
      "MacroPrint supports common label stock sizes: 2×4 inches (thermal labels), 3×4 inches (standard labels), 4×6 inches (large labels), and 8.5×11 inches (full page for sheet labels). Exports are high-resolution PDFs optimized for clean printing on standard label stock from Office Depot, Avery, or similar suppliers.",
  },
  {
    question: 'Can I scale recipes?',
    answer:
      "Yes! When you change the number of servings per batch, all nutrition values automatically recalculate. This is perfect for scaling from test batches to production quantities while keeping your labels accurate.",
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer:
      "On the Free plan, you can save 3 recipes and export 3 labels per day. When you reach the limit, you'll see an upgrade prompt. Your recipes are never deleted—you just need to wait until the next day or upgrade to continue exporting.",
  },
  {
    question: 'Can I cancel my subscription?',
    answer:
      "Yes, you can cancel anytime from your billing page. You'll keep access to paid features until the end of your current billing period. We also offer a 7-day refund policy for first-time subscribers.",
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      "Our Free plan works like a permanent free trial—you can create 3 recipes and export 3 labels per day indefinitely. This lets you fully test MacroPrint before upgrading. No credit card required to start.",
  },
  {
    question: 'What if an ingredient isn\'t in the database?',
    answer:
      "If you can't find an exact match, try searching for similar items or generic versions. For specialty ingredients, you may need to find the closest equivalent or manually calculate nutrition from supplier specifications. We're continuously working to improve ingredient matching.",
  },
  {
    question: 'Can I add my business name and logo?',
    answer:
      "Yes! Pro plan subscribers can add their business name and address to labels. Logo support is coming soon. This helps your labels look professional and builds brand recognition.",
  },
  {
    question: 'Is my recipe data secure?',
    answer:
      "Yes. We use Firebase with industry-standard security. Your recipes are stored securely and only accessible to you. We never share or sell your recipe data. See our Privacy Policy for full details.",
  },
]

// Generate FAQ Schema.org structured data
function generateFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema()) }}
      />

      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">MacroPrint</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about MacroPrint and nutrition labeling
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="mt-16 rounded-lg bg-muted p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold">Still have questions?</h2>
            <p className="mb-4 text-muted-foreground">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/login">
                <Button>Get Started Free</Button>
              </Link>
              <a href="mailto:support@macroprint.com">
                <Button variant="outline">Contact Support</Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MacroPrint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
