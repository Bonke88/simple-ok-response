
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContentPillar {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  content_percentage: number | null;
  order_index: number;
  color_theme: string | null;
  icon_name: string | null;
  is_active: boolean;
}

interface PillarFormData {
  name: string;
  description: string;
  content_percentage: number;
  color_theme: string;
  icon_name: string;
}

const PillarManager = () => {
  const [isAddingPillar, setIsAddingPillar] = useState(false);
  const [editingPillar, setEditingPillar] = useState<ContentPillar | null>(null);
  const queryClient = useQueryClient();

  const { data: pillars, isLoading } = useQuery({
    queryKey: ['content-pillars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_pillars')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as ContentPillar[];
    }
  });

  const createPillarMutation = useMutation({
    mutationFn: async (pillarData: PillarFormData) => {
      const slug = pillarData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const { data, error } = await supabase
        .from('content_pillars')
        .insert({
          name: pillarData.name,
          description: pillarData.description,
          content_percentage: pillarData.content_percentage,
          color_theme: pillarData.color_theme,
          icon_name: pillarData.icon_name,
          slug,
          order_index: (pillars?.length || 0) + 1,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-pillars'] });
      setIsAddingPillar(false);
      toast({ title: 'Success', description: 'Pillar created successfully!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: `Failed to create pillar: ${error.message}`,
        variant: 'destructive'
      });
    }
  });

  const updatePillarMutation = useMutation({
    mutationFn: async (pillarData: ContentPillar) => {
      const { data, error } = await supabase
        .from('content_pillars')
        .update({
          name: pillarData.name,
          description: pillarData.description,
          content_percentage: pillarData.content_percentage,
          color_theme: pillarData.color_theme,
          icon_name: pillarData.icon_name,
          is_active: pillarData.is_active
        })
        .eq('id', pillarData.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-pillars'] });
      setEditingPillar(null);
      toast({ title: 'Success', description: 'Pillar updated successfully!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: `Failed to update pillar: ${error.message}`,
        variant: 'destructive'
      });
    }
  });

  const deletePillarMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('content_pillars')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-pillars'] });
      toast({ title: 'Success', description: 'Pillar deleted successfully!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: `Failed to delete pillar: ${error.message}`,
        variant: 'destructive'
      });
    }
  });

  const QuickAddForm = ({ onSubmit, onClose }: { onSubmit: (data: PillarFormData) => void; onClose: () => void }) => {
    const [formData, setFormData] = useState<PillarFormData>({
      name: '',
      description: '',
      content_percentage: 25,
      color_theme: '#3B82F6',
      icon_name: 'Folder'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Pillar Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., GTM Fundamentals"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of this content pillar"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="percentage">Content Percentage</Label>
          <Input
            id="percentage"
            type="number"
            min="1"
            max="100"
            value={formData.content_percentage}
            onChange={(e) => setFormData({ ...formData, content_percentage: parseInt(e.target.value) })}
          />
        </div>
        
        <div>
          <Label htmlFor="color">Theme Color</Label>
          <Input
            id="color"
            type="color"
            value={formData.color_theme}
            onChange={(e) => setFormData({ ...formData, color_theme: e.target.value })}
          />
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" disabled={createPillarMutation.isPending}>
            {createPillarMutation.isPending ? 'Creating...' : 'Create Pillar'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  if (isLoading) {
    return <div className="p-6">Loading pillars...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Pillars</h1>
            <p className="text-gray-600 mt-2">Manage your content taxonomy and organization</p>
          </div>
          
          <Dialog open={isAddingPillar} onOpenChange={setIsAddingPillar}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Pillar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Content Pillar</DialogTitle>
                <DialogDescription>
                  Add a new content pillar to organize your articles and tools.
                </DialogDescription>
              </DialogHeader>
              <QuickAddForm 
                onSubmit={(data) => createPillarMutation.mutate(data)}
                onClose={() => setIsAddingPillar(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {pillars?.map((pillar) => (
            <Card key={pillar.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: pillar.color_theme || '#3B82F6' }}
                    />
                    <div>
                      <CardTitle className="text-lg">{pillar.name}</CardTitle>
                      <CardDescription>/{pillar.slug}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{pillar.content_percentage || 0}%</Badge>
                    <Badge variant={pillar.is_active ? 'default' : 'secondary'}>
                      {pillar.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingPillar(pillar)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePillarMutation.mutate(pillar.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {pillar.description && (
                <CardContent>
                  <p className="text-gray-600">{pillar.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillarManager;
