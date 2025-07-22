
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Eye, Trash2, FileText, Clock, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

console.log('ArticleManager component loaded');

interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  content: any;
  status: string;
  word_count?: number;
  reading_time?: number;
  published_at?: string;
  pillar_id: string;
  content_pillars?: {
    name: string;
    color_theme: string;
  };
  view_count: number;
}

const ArticleManager = () => {
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const queryClient = useQueryClient();

  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', filter],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select(`
          *,
          content_pillars (
            name,
            color_theme
          )
        `)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Article[];
    }
  });

  const { data: pillars } = useQuery({
    queryKey: ['content-pillars-select'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_pillars')
        .select('id, name')
        .eq('is_active', true)
        .order('order_index');
      
      if (error) throw error;
      return data;
    }
  });

  const createArticleMutation = useMutation({
    mutationFn: async (articleData: any) => {
      const slug = articleData.title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      const wordCount = articleData.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);
      
      const { data, error } = await supabase
        .from('articles')
        .insert({
          ...articleData,
          slug,
          word_count: wordCount,
          reading_time: readingTime,
          content: { blocks: [{ type: 'paragraph', content: articleData.content }] }
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      setIsAddingArticle(false);
      toast({ title: 'Success', description: 'Article created successfully!' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error', 
        description: `Failed to create article: ${error.message}`,
        variant: 'destructive'
      });
    }
  });

  const publishArticleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('articles')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({ title: 'Success', description: 'Article published successfully!' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error', 
        description: `Failed to publish article: ${error.message}`,
        variant: 'destructive'
      });
    }
  });

  const ArticleForm = ({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      title: '',
      subtitle: '',
      content: '',
      pillar_id: '',
      meta_description: '',
      difficulty_level: 'Beginner',
      time_investment: '30 minutes'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Article Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter article title"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="subtitle">Subtitle (Optional)</Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Brief subtitle or hook"
          />
        </div>
        
        <div>
          <Label htmlFor="pillar">Content Pillar</Label>
          <Select 
            value={formData.pillar_id} 
            onValueChange={(value) => setFormData({ ...formData, pillar_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select content pillar" />
            </SelectTrigger>
            <SelectContent>
              {pillars?.map((pillar) => (
                <SelectItem key={pillar.id} value={pillar.id}>
                  {pillar.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Article content..."
            rows={6}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select 
              value={formData.difficulty_level} 
              onValueChange={(value) => setFormData({ ...formData, difficulty_level: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Uncomfortable but necessary">Uncomfortable but necessary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="time">Time Investment</Label>
            <Select 
              value={formData.time_investment} 
              onValueChange={(value) => setFormData({ ...formData, time_investment: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15 minutes">15 minutes</SelectItem>
                <SelectItem value="30 minutes">30 minutes</SelectItem>
                <SelectItem value="1 hour">1 hour</SelectItem>
                <SelectItem value="2 hours">2 hours</SelectItem>
                <SelectItem value="Half day">Half day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea
            id="meta_description"
            value={formData.meta_description}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            placeholder="SEO meta description (160 characters max)"
            rows={2}
          />
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" disabled={createArticleMutation.isPending}>
            {createArticleMutation.isPending ? 'Creating...' : 'Create Article'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading articles...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Article Management</h1>
            <p className="text-gray-600 mt-2">Create and manage your content articles</p>
          </div>
          
          <Dialog open={isAddingArticle} onOpenChange={setIsAddingArticle}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Article</DialogTitle>
                <DialogDescription>
                  Add a new article to your content library.
                </DialogDescription>
              </DialogHeader>
              <ArticleForm 
                onSubmit={(data) => createArticleMutation.mutate(data)}
                onClose={() => setIsAddingArticle(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'published', 'draft', 'archived'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid gap-4">
          {articles?.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={getStatusColor(article.status)}
                        className="capitalize"
                      >
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
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    {article.subtitle && (
                      <CardDescription className="mt-1">{article.subtitle}</CardDescription>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      {article.word_count && (
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {article.word_count} words
                        </div>
                      )}
                      {article.reading_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.reading_time} min read
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {article.view_count} views
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {article.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => publishArticleMutation.mutate(article.id)}
                        disabled={publishArticleMutation.isPending}
                      >
                        Publish
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {articles?.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first article.</p>
            <Button onClick={() => setIsAddingArticle(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleManager;
