
import { ContentAPI } from './api/content';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = async (): Promise<string> => {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString();
  
  try {
    // Fetch dynamic content from CMS
    const [articlesResponse, pillarsData, toolsData] = await Promise.all([
      ContentAPI.getArticles({ limit: 1000 }), // Get all articles
      ContentAPI.getPillars(),
      ContentAPI.getTools()
    ]);

    const articles = articlesResponse.data || [];
    const pillars = pillarsData || [];
    const tools = toolsData || [];

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

    // Add dynamic pillar category pages
    const categoryPages: SitemapEntry[] = pillars.map(pillar => ({
      url: `${baseUrl}/articles/${pillar.slug}`,
      lastModified: pillar.updated_at || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }));

    // Add individual articles with proper dates
    const articlePages: SitemapEntry[] = articles.map(article => ({
      url: `${baseUrl}/articles/${article.content_pillars?.slug}/${article.slug}`,
      lastModified: article.updated_at || article.published_at || currentDate,
      changeFrequency: 'monthly' as const,
      priority: article.featured ? 0.9 : 0.7
    }));

    // Add tool pages
    const toolPages: SitemapEntry[] = tools.map(tool => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: tool.updated_at || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }));

    const allPages = [...staticPages, ...categoryPages, ...articlePages, ...toolPages];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Fallback to static sitemap if CMS fails
    return generateStaticSitemap(baseUrl, currentDate);
  }
};

const generateStaticSitemap = (baseUrl: string, currentDate: string): string => {
  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/start`, priority: 0.9 },
    { url: `${baseUrl}/newsletter`, priority: 0.8 },
    { url: `${baseUrl}/tools`, priority: 0.8 },
    { url: `${baseUrl}/about`, priority: 0.5 }
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};

export const downloadSitemap = async () => {
  try {
    const sitemap = await generateSitemap();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading sitemap:', error);
  }
};

export const generateSitemapIndex = async (): Promise<string> => {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
};
