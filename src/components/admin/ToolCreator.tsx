
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const toolSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  tool_type: z.string().min(1, 'Tool type is required'),
  status: z.enum(['draft', 'published', 'archived']),
  pillar_id: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  can_embed: z.boolean(),
});

type ToolFormData = z.infer<typeof toolSchema>;

interface ToolCreatorProps {
  onSuccess?: () => void;
  editingTool?: any;
}

export const ToolCreator = ({ onSuccess, editingTool }: ToolCreatorProps) => {
  const [inputFields, setInputFields] = useState<Array<{ name: string; type: string; required: boolean }>>([]);
  const [outputFields, setOutputFields] = useState<Array<{ name: string; type: string }>>([]);
  const [pillars, setPillars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ToolFormData>({
    resolver: zodResolver(toolSchema),
    defaultValues: {
      name: editingTool?.name || '',
      slug: editingTool?.slug || '',
      description: editingTool?.description || '',
      tool_type: editingTool?.tool_type || 'calculator',
      status: editingTool?.status || 'draft',
      pillar_id: editingTool?.pillar_id || '',
      meta_title: editingTool?.meta_title || '',
      meta_description: editingTool?.meta_description || '',
      can_embed: editingTool?.can_embed ?? true,
    },
  });

  React.useEffect(() => {
    fetchPillars();
    if (editingTool) {
      setInputFields(editingTool.input_schema?.fields || []);
      setOutputFields(editingTool.output_schema?.fields || []);
    }
  }, [editingTool]);

  const fetchPillars = async () => {
    const { data, error } = await supabase
      .from('content_pillars')
      .select('id, name')
      .eq('is_active', true);
    
    if (error) {
      console.error('Error fetching pillars:', error);
    } else {
      setPillars(data || []);
    }
  };

  const addInputField = () => {
    setInputFields([...inputFields, { name: '', type: 'text', required: false }]);
  };

  const addOutputField = () => {
    setOutputFields([...outputFields, { name: '', type: 'text' }]);
  };

  const removeInputField = (index: number) => {
    setInputFields(inputFields.filter((_, i) => i !== index));
  };

  const removeOutputField = (index: number) => {
    setOutputFields(outputFields.filter((_, i) => i !== index));
  };

  const updateInputField = (index: number, field: Partial<typeof inputFields[0]>) => {
    const updated = [...inputFields];
    updated[index] = { ...updated[index], ...field };
    setInputFields(updated);
  };

  const updateOutputField = (index: number, field: Partial<typeof outputFields[0]>) => {
    const updated = [...outputFields];
    updated[index] = { ...updated[index], ...field };
    setOutputFields(updated);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const onSubmit = async (data: ToolFormData) => {
    setIsLoading(true);
    
    try {
      // Ensure all required fields are present for database insertion
      const toolData = {
        name: data.name, // Required field
        slug: data.slug, // Required field
        description: data.description || null,
        tool_type: data.tool_type,
        status: data.status,
        pillar_id: data.pillar_id || null,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        can_embed: data.can_embed,
        config: {
          type: data.tool_type,
          settings: {}
        },
        input_schema: {
          fields: inputFields
        },
        output_schema: {
          fields: outputFields
        }
      };

      if (editingTool) {
        const { error } = await supabase
          .from('tools')
          .update(toolData)
          .eq('id', editingTool.id);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Tool updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('tools')
          .insert(toolData);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Tool created successfully',
        });
      }
      
      form.reset();
      setInputFields([]);
      setOutputFields([]);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving tool:', error);
      toast({
        title: 'Error',
        description: 'Failed to save tool',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingTool ? 'Edit Tool' : 'Create New Tool'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tool Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.setValue('slug', generateSlug(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tool_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tool Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tool type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="calculator">Calculator</SelectItem>
                          <SelectItem value="analyzer">Analyzer</SelectItem>
                          <SelectItem value="generator">Generator</SelectItem>
                          <SelectItem value="checker">Checker</SelectItem>
                          <SelectItem value="planner">Planner</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pillar_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Pillar</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pillar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pillars.map((pillar) => (
                            <SelectItem key={pillar.id} value={pillar.id}>
                              {pillar.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="can_embed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Allow Embedding</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="meta_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meta_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Input Schema Builder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Input Fields</h3>
                  <Button type="button" onClick={addInputField} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Input Field
                  </Button>
                </div>
                
                {inputFields.map((field, index) => (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Input
                        placeholder="Field name"
                        value={field.name}
                        onChange={(e) => updateInputField(index, { name: e.target.value })}
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={field.type}
                        onValueChange={(value) => updateInputField(index, { type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="textarea">Textarea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.required}
                        onCheckedChange={(checked) => updateInputField(index, { required: checked })}
                      />
                      <span className="text-sm">Required</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeInputField(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Output Schema Builder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Output Fields</h3>
                  <Button type="button" onClick={addOutputField} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Output Field
                  </Button>
                </div>
                
                {outputFields.map((field, index) => (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Input
                        placeholder="Field name"
                        value={field.name}
                        onChange={(e) => updateOutputField(index, { name: e.target.value })}
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={field.type}
                        onValueChange={(value) => updateOutputField(index, { type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="list">List</SelectItem>
                          <SelectItem value="chart">Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeOutputField(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingTool ? 'Update Tool' : 'Create Tool'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
