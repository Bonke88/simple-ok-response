
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
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  article,
  noIndex = false
}) => {
  const siteName = 'GTM Night Shift';
  const defaultTitle = 'GTM Night Shift - Go-to-Market Advice for Corporate Engineers';
  const defaultDescription = 'Practical sales & marketing tactics for engineers building SaaS side projects. Learn to validate ideas, find customers, and scale without burnout.';
  const defaultImage = 'https://lovable.dev/opengraph-image-p98pqg.png';
  
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullImage = image || defaultImage;
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: fullTitle,
    description: fullDescription,
    url: fullUrl,
    image: fullImage,
    ...(type === 'article' && article && {
      author: {
        '@type': 'Person',
        name: article.author || 'GTM Night Shift'
      },
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime,
      articleSection: article.section,
      keywords: article.tags?.join(', ')
    }),
    ...(type === 'website' && {
      '@type': 'WebSite',
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: fullImage
        }
      }
    })
  };

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
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      
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
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
