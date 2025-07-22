
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string;
  created_at: string;
  content_pillars?: {
    name: string;
    color_theme: string;
  };
}

interface Tool {
  id: string;
  name: string;
  slug: string;
  status: string;
  tool_type: string;
  created_at: string;
  content_pillars?: {
    name: string;
    color_theme: string;
  };
}

export const ContentManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // Fetch articles
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles' as any)
        .select(`
          id,
          title,
          slug,
          status,
          published_at,
          created_at,
          content_pillars (
            name,
            color_theme
          )
        `)
        .order('created_at', { ascending: false });

      if (articlesError) throw articlesError;
      setArticles(articlesData || []);

      // Fetch tools
      const { data: toolsData, error: toolsError } = await supabase
        .from('tools' as any)
        .select(`
          id,
          name,
          slug,
          status,
          tool_type,
          created_at,
          content_pillars (
            name,
            color_theme
          )
        `)
        .order('created_at', { ascending: false });

      if (toolsError) throw toolsError;
      setTools(toolsData || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Content Manager</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Tool
          </Button>
        </div>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="articles">Articles ({articles.length})</TabsTrigger>
          <TabsTrigger value="tools">Tools ({tools.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid gap-4">
            {articles.map((article) => (
              <Card key={article.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <Badge className={getStatusColor(article.status)}>
                          {article.status}
                        </Badge>
                        {article.content_pillars && (
                          <Badge 
                            variant="outline"
                            style={{ borderColor: article.content_pillars.color_theme }}
                          >
                            {article.content_pillars.name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Slug: /{article.slug}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created: {formatDate(article.created_at)}
                        {article.published_at && (
                          <> • Published: {formatDate(article.published_at)}</>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4">
            {tools.map((tool) => (
              <Card key={tool.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{tool.name}</h3>
                        <Badge className={getStatusColor(tool.status)}>
                          {tool.status}
                        </Badge>
                        <Badge variant="secondary">
                          {tool.tool_type}
                        </Badge>
                        {tool.content_pillars && (
                          <Badge 
                            variant="outline"
                            style={{ borderColor: tool.content_pillars.color_theme }}
                          >
                            {tool.content_pillars.name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Slug: /tools/{tool.slug}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created: {formatDate(tool.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
