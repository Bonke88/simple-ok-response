
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bold, Italic, Link, List, ListOrdered, Quote, Code, Eye } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const insertMarkdown = useCallback((before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  }, [value, onChange]);

  const formatMarkdown = (markdown: string) => {
    return markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/^\* (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/\n/g, '<br>');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Content Editor</CardTitle>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'edit' | 'preview')}>
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'edit' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 p-2 border rounded">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown('**', '**')}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown('*', '*')}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown('[', '](url)')}
              >
                <Link className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown('`', '`')}
              >
                <Code className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown('\n* ', '')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown('\n1. ', '')}
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertMarkdown('\n> ', '')}
              >
                <Quote className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || "Start writing your content..."}
              className="min-h-[400px] font-mono"
            />
          </div>
        )}
        
        {activeTab === 'preview' && (
          <div 
            className="min-h-[400px] p-4 border rounded bg-gray-50 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(value) }}
          />
        )}
      </CardContent>
    </Card>
  );
};
