
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, Archive, FileText, Settings, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface BulkOperationsProps {
  contentType: 'articles' | 'tools';
  items: any[];
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
  onOperationComplete: () => void;
}

export const BulkOperations = ({ 
  contentType, 
  items, 
  selectedItems, 
  onSelectionChange, 
  onOperationComplete 
}: BulkOperationsProps) => {
  const [operation, setOperation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(items.map(item => item.id));
    }
  };

  const handleItemSelect = (itemId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, itemId]);
    } else {
      onSelectionChange(selectedItems.filter(id => id !== itemId));
    }
  };

  const executeBulkOperation = async () => {
    if (!operation || selectedItems.length === 0) return;

    setIsLoading(true);
    try {
      switch (operation) {
        case 'publish':
          await supabase
            .from(contentType)
            .update({ status: 'published' })
            .in('id', selectedItems);
          toast({ title: 'Success', description: `${selectedItems.length} items published` });
          break;

        case 'draft':
          await supabase
            .from(contentType)
            .update({ status: 'draft' })
            .in('id', selectedItems);
          toast({ title: 'Success', description: `${selectedItems.length} items moved to draft` });
          break;

        case 'archive':
          await supabase
            .from(contentType)
            .update({ status: 'archived' })
            .in('id', selectedItems);
          toast({ title: 'Success', description: `${selectedItems.length} items archived` });
          break;

        case 'delete':
          await supabase
            .from(contentType)
            .delete()
            .in('id', selectedItems);
          toast({ title: 'Success', description: `${selectedItems.length} items deleted` });
          break;

        case 'export':
          await exportItems();
          break;

        default:
          break;
      }

      onSelectionChange([]);
      onOperationComplete();
    } catch (error) {
      console.error('Bulk operation failed:', error);
      toast({
        title: 'Error',
        description: 'Bulk operation failed',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setOperation('');
    }
  };

  const exportItems = async () => {
    try {
      const { data, error } = await supabase
        .from(contentType)
        .select('*')
        .in('id', selectedItems);

      if (error) throw error;

      const exportData = JSON.stringify(data, null, 2);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${contentType}-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({ title: 'Success', description: 'Data exported successfully' });
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  };

  const getOperationIcon = (op: string) => {
    switch (op) {
      case 'publish':
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'archive':
        return <Archive className="w-4 h-4" />;
      case 'delete':
        return <Trash2 className="w-4 h-4" />;
      case 'export':
        return <Download className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getOperationColor = (op: string) => {
    switch (op) {
      case 'publish':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archive':
        return 'bg-gray-100 text-gray-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'export':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Bulk Operations</span>
            <Badge variant="outline">
              {selectedItems.length} of {items.length} selected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selection Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedItems.length === items.length && items.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm">Select All</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectionChange([])}
              disabled={selectedItems.length === 0}
            >
              Clear Selection
            </Button>
          </div>

          {/* Operation Selection */}
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-4">
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Choose operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publish">Publish</SelectItem>
                  <SelectItem value="draft">Move to Draft</SelectItem>
                  <SelectItem value="archive">Archive</SelectItem>
                  <SelectItem value="export">Export Data</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                onClick={executeBulkOperation}
                disabled={!operation || isLoading}
                variant={operation === 'delete' ? 'destructive' : 'default'}
              >
                {getOperationIcon(operation)}
                <span className="ml-2">
                  {isLoading ? 'Processing...' : 'Execute'}
                </span>
              </Button>
            </div>
          )}

          {/* Warning for destructive operations */}
          {operation === 'delete' && selectedItems.length > 0 && (
            <Alert>
              <AlertDescription>
                Warning: This will permanently delete {selectedItems.length} items. This action cannot be undone.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Item List with Selection */}
      <div className="grid gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border ${
              selectedItems.includes(item.id) ? 'bg-blue-50 border-blue-200' : 'bg-white'
            }`}
          >
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onCheckedChange={(checked) => handleItemSelect(item.id, checked as boolean)}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium truncate">
                  {item.title || item.name}
                </h4>
                <Badge className={getOperationColor(item.status || 'draft')}>
                  {item.status || 'draft'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {contentType === 'articles' ? `/${item.slug}` : `/tools/${item.slug}`}
              </p>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
