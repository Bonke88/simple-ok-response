
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye, Upload, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { RichTextEditor } from './RichTextEditor';
import { ToolCreator } from './ToolCreator';
import { ImageUpload } from './ImageUpload';
import { BulkOperations } from './BulkOperations';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  created_at: string;
  content_pillars?: {
    name: string;
    color_theme: string;
  } | null;
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
  } | null;
}

export const ContentManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRichEditor, setShowRichEditor] = useState(false);
  const [showToolCreator, setShowToolCreator] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // Fetch articles with proper table reference
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
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

      if (articlesError) {
        console.error('Error fetching articles:', articlesError);
        toast({
          title: 'Error',
          description: 'Failed to fetch articles',
          variant: 'destructive'
        });
      } else {
        setArticles(articlesData || []);
      }

      // Fetch tools with proper table reference
      const { data: toolsData, error: toolsError } = await supabase
        .from('tools')
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

      if (toolsError) {
        console.error('Error fetching tools:', toolsError);
        toast({
          title: 'Error',
          description: 'Failed to fetch tools',
          variant: 'destructive'
        });
      } else {
        setTools(toolsData || []);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch content',
        variant: 'destructive'
      });
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

  const handleEditContent = (content: any, type: 'article' | 'tool') => {
    setEditingContent({ ...content, type });
    if (type === 'article') {
      setShowRichEditor(true);
    } else {
      setShowToolCreator(true);
    }
  };

  const handleContentSuccess = () => {
    setShowRichEditor(false);
    setShowToolCreator(false);
    setEditingContent(null);
    fetchContent();
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
          <Dialog open={showRichEditor} onOpenChange={setShowRichEditor}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingContent(null)}>
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingContent ? 'Edit Article' : 'Create New Article'}
                </DialogTitle>
              </DialogHeader>
              <RichTextEditor
                value={editingContent?.content || ''}
                onChange={(value) => console.log('Content changed:', value)}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setShowRichEditor(false)}>
                  Cancel
                </Button>
                <Button onClick={handleContentSuccess}>
                  {editingContent ? 'Update' : 'Create'} Article
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showToolCreator} onOpenChange={setShowToolCreator}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setEditingContent(null)}>
                <Plus className="w-4 h-4 mr-2" />
                New Tool
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingContent ? 'Edit Tool' : 'Create New Tool'}
                </DialogTitle>
              </DialogHeader>
              <ToolCreator
                editingTool={editingContent?.type === 'tool' ? editingContent : null}
                onSuccess={handleContentSuccess}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Image Upload</DialogTitle>
              </DialogHeader>
              <ImageUpload onImageUploaded={(url) => console.log('Image uploaded:', url)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="articles">Articles ({articles.length})</TabsTrigger>
          <TabsTrigger value="tools">Tools ({tools.length})</TabsTrigger>
          <TabsTrigger value="bulk-articles">Bulk Actions - Articles</TabsTrigger>
          <TabsTrigger value="bulk-tools">Bulk Actions - Tools</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="versions">Version Control</TabsTrigger>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditContent(article, 'article')}
                      >
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditContent(tool, 'tool')}
                      >
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

        <TabsContent value="bulk-articles">
          <BulkOperations
            contentType="articles"
            items={articles}
            selectedItems={selectedArticles}
            onSelectionChange={setSelectedArticles}
            onOperationComplete={fetchContent}
          />
        </TabsContent>

        <TabsContent value="bulk-tools">
          <BulkOperations
            contentType="tools"
            items={tools}
            selectedItems={selectedTools}
            onSelectionChange={setSelectedTools}
            onOperationComplete={fetchContent}
          />
        </TabsContent>

        <TabsContent value="collaboration">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Collaboration features are available when editing specific content items.
                Select an article or tool to access commenting and real-time collaboration.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Recent Comments</h3>
                    <p className="text-sm text-gray-600">
                      View and manage comments across all content
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Active Collaborators</h3>
                    <p className="text-sm text-gray-600">
                      See who's currently working on content
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions">
          <Card>
            <CardHeader>
              <CardTitle>Version Control Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Version control features are available when editing specific content items.
                Select an article or tool to access version history and restore capabilities.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Total Versions</h3>
                    <div className="text-2xl font-bold">47</div>
                    <p className="text-sm text-gray-600">Across all content</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Recent Changes</h3>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm text-gray-600">This week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Contributors</h3>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-sm text-gray-600">Active editors</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
