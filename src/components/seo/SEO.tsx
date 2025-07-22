
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  noIndex?: boolean;
  structuredData?: any;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  article,
  noIndex = false,
  structuredData
}) => {
  const siteName = 'GTM Night Shift';
  const defaultTitle = 'GTM Night Shift - Go-to-Market Advice for Corporate Engineers';
  const defaultDescription = 'Practical sales & marketing tactics for engineers building SaaS side projects. Learn to validate ideas, find customers, and scale without burnout.';
  const defaultImage = 'https://lovable.dev/opengraph-image-p98pqg.png';
  
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullImage = image || defaultImage;
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href;
  
  // Enhanced JSON-LD structured data
  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: fullTitle,
    description: fullDescription,
    url: fullUrl,
    image: {
      '@type': 'ImageObject',
      url: fullImage,
      width: 1200,
      height: 630
    },
    ...(type === 'article' && article && {
      '@type': 'Article',
      headline: title,
      description: fullDescription,
      image: fullImage,
      author: {
        '@type': 'Person',
        name: article.author || 'GTM Night Shift Team',
        url: `${window.location.origin}/about`
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: fullImage,
          width: 200,
          height: 60
        },
        url: window.location.origin
      },
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      articleSection: article.section,
      keywords: article.tags?.join(', '),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl
      },
      isPartOf: {
        '@type': 'Blog',
        name: `${siteName} Blog`,
        url: `${window.location.origin}/articles`
      }
    }),
    ...(type === 'website' && {
      '@type': 'WebSite',
      name: siteName,
      url: window.location.origin,
      description: fullDescription,
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: fullImage,
          width: 200,
          height: 60
        },
        url: window.location.origin,
        sameAs: [
          'https://twitter.com/gtmnightshift',
          'https://linkedin.com/company/gtmnightshift'
        ]
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${window.location.origin}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    })
  };

  // Use custom structured data if provided, otherwise use default
  const jsonLd = structuredData || defaultJsonLd;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific OG tags */}
      {type === 'article' && article && (
        <>
          {article.author && <meta property="article:author" content={article.author} />}
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@gtmnightshift" />
      <meta name="twitter:creator" content="@gtmnightshift" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content={article?.author || 'GTM Night Shift Team'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

export default SEO;
