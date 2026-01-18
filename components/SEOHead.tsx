import Head from 'next/head'

interface SEOHeadProps {
    title: string
    description: string
    canonical: string
    ogImage?: string
    ogType?: 'website' | 'article'
    keywords?: string[]
    noindex?: boolean
}

/**
 * Reusable SEO component for consistent meta tags across pages
 * Includes OpenGraph, Twitter Cards, and Schema.org markup
 */
export default function SEOHead({
    title,
    description,
    canonical,
    ogImage = '/og-image.png',
    ogType = 'website',
    keywords = [],
    noindex = false,
}: SEOHeadProps) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://macroprint.com'
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`
    const fullCanonical = canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`

    return (
        <>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

            {/* Canonical */}
            <link rel="canonical" href={fullCanonical} />

            {/* Robots */}
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

            {/* OpenGraph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="MacroPrint" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullOgImage} />
        </>
    )
}
