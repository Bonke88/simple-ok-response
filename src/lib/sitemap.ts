
import { Article } from './content';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (articles: Article[]): string => {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString();
  
  const staticPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/start`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5
    }
  ];

  // Add article category pages
  const categoryPages: SitemapEntry[] = [
    'picking-winners',
    'ship-it', 
    'first-customers',
    'scale'
  ].map(category => ({
    url: `${baseUrl}/articles/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  // Add individual articles
  const articlePages: SitemapEntry[] = articles.map(article => ({
    url: `${baseUrl}/articles/${article.category}/${article.slug}`,
    lastModified: article.publishedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  // Add tool pages
  const toolPages: SitemapEntry[] = [
    'project-scorer',
    'launch-diagnostic',
    'customer-plan',
    'energy-scheduler',
    'customer-finder',
    'anonymous-launch'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  const allPages = [...staticPages, ...categoryPages, ...articlePages, ...toolPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const downloadSitemap = (articles: Article[]) => {
  const sitemap = generateSitemap(articles);
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
