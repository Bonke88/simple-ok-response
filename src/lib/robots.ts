
export const generateRobotsTxt = (): string => {
  const baseUrl = window.location.origin;
  
  return `User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/
Disallow: /private/

# Allow specific search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
};

export const downloadRobotsTxt = () => {
  const robotsTxt = generateRobotsTxt();
  const blob = new Blob([robotsTxt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
