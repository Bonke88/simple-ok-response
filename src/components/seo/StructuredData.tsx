
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ArticleStructuredDataProps {
  article: {
    title: string;
    subtitle?: string;
    content: any;
    slug: string;
    published_at: string;
    updated_at?: string;
    reading_time?: number;
    word_count?: number;
    content_pillars?: {
      name: string;
      slug: string;
    };
    article_authors?: Array<{
      authors: {
        name: string;
        bio?: string;
        avatar_url?: string;
      };
    }>;
    article_tags?: Array<{
      tags: {
        name: string;
        slug: string;
      };
    }>;
  };
  url: string;
}

export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({ article, url }) => {
  const baseUrl = window.location.origin;
  const author = article.article_authors?.[0]?.authors;
  const tags = article.article_tags?.map(tag => tag.tags.name) || [];
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url,
    headline: article.title,
    description: article.subtitle,
    image: author?.avatar_url || `${baseUrl}/placeholder.svg`,
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    author: {
      '@type': 'Person',
      name: author?.name || 'GTM Night Shift Team',
      description: author?.bio,
      image: author?.avatar_url,
      url: `${baseUrl}/about`
    },
    publisher: {
      '@type': 'Organization',
      name: 'GTM Night Shift',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/placeholder.svg`,
        width: 200,
        height: 60
      },
      url: baseUrl
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    articleSection: article.content_pillars?.name,
    keywords: tags.join(', '),
    wordCount: article.word_count,
    timeRequired: `PT${article.reading_time || 5}M`,
    articleBody: typeof article.content === 'string' ? article.content : JSON.stringify(article.content),
    isPartOf: {
      '@type': 'Blog',
      name: 'GTM Night Shift Blog',
      url: `${baseUrl}/articles`
    },
    about: {
      '@type': 'Thing',
      name: 'Go-to-Market Strategy',
      description: 'Practical sales and marketing tactics for engineers building SaaS side projects'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Software Engineers, Technical Founders, SaaS Builders'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

interface OrganizationStructuredDataProps {
  page?: 'homepage' | 'about' | 'tools';
}

export const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({ page = 'homepage' }) => {
  const baseUrl = window.location.origin;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GTM Night Shift',
    url: baseUrl,
    logo: `${baseUrl}/placeholder.svg`,
    description: 'Practical sales & marketing tactics for engineers building SaaS side projects. Learn to validate ideas, find customers, and scale without burnout.',
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Person',
        name: 'GTM Night Shift Team'
      }
    ],
    sameAs: [
      'https://twitter.com/gtmnightshift',
      'https://linkedin.com/company/gtmnightshift'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${baseUrl}/about`
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Go-to-Market Strategy',
      'SaaS Marketing',
      'Product Validation',
      'Customer Acquisition',
      'Sales Strategy',
      'Marketing Automation'
    ],
    ...(page === 'homepage' && {
      mainEntity: {
        '@type': 'WebSite',
        name: 'GTM Night Shift',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({ items }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};
