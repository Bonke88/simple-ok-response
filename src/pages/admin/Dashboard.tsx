
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Calculator, Folders, Tags, Users, FileCode, BarChart, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [articles, tools, pillars, events] = await Promise.all([
        supabase.from('articles').select('status', { count: 'exact' }),
        supabase.from('tools').select('status', { count: 'exact' }),
        supabase.from('content_pillars').select('*', { count: 'exact' }),
        supabase.from('analytics_events').select('event_type', { count: 'exact' }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      ]);
      
      return {
        totalArticles: articles.count || 0,
        publishedArticles: articles.data?.filter(a => a.status === 'published').length || 0,
        totalTools: tools.count || 0,
        publishedTools: tools.data?.filter(t => t.status === 'published').length || 0,
        totalPillars: pillars.count || 0,
        weeklyEvents: events.count || 0
      };
    }
  });

  const navigationItems = [
    {
      category: 'Content Management',
      items: [
        { name: 'Articles', href: '/admin/articles', icon: FileText, description: 'Manage blog posts and guides', count: stats?.totalArticles },
        { name: 'Tools', href: '/admin/tools', icon: Calculator, description: 'Interactive calculators and generators', count: stats?.totalTools },
        { name: 'Pillars', href: '/admin/pillars', icon: Folders, description: 'Content categories and taxonomy', count: stats?.totalPillars },
        { name: 'Tags', href: '/admin/tags', icon: Tags, description: 'Content tagging system' },
      ]
    },
    {
      category: 'Settings & Analytics',
      items: [
        { name: 'Authors', href: '/admin/authors', icon: Users, description: 'Manage content authors' },
        { name: 'Templates', href: '/admin/templates', icon: FileCode, description: 'Content templates' },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart, description: 'Performance metrics', count: stats?.weeklyEvents },
        { name: 'SEO Settings', href: '/admin/seo', icon: Search, description: 'SEO optimization tools' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GTM Content Hub Admin</h1>
          <p className="text-gray-600 mt-2">Manage your content, tools, and analytics</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.publishedArticles || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalArticles || 0} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tools</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.publishedTools || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalTools || 0} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pillars</CardTitle>
              <Folders className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalPillars || 0}</div>
              <p className="text-xs text-muted-foreground">Content categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Events</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.weeklyEvents || 0}</div>
              <p className="text-xs text-muted-foreground">Analytics events</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Grid */}
        {navigationItems.map((category) => (
          <div key={category.category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.href}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-base">{item.name}</CardTitle>
                          </div>
                          {item.count !== undefined && (
                            <Badge variant="secondary">{item.count}</Badge>
                          )}
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
