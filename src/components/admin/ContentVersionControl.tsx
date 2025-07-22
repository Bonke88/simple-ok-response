
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { GitBranch, History, Save, Eye, RotateCcw } from 'lucide-react';

interface ContentVersion {
  id: string;
  content_id: string;
  content_type: string;
  version_number: number;
  content_data: any;
  change_summary: string;
  created_by: string;
  created_at: string;
  profiles?: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

interface ContentVersionControlProps {
  contentId: string;
  contentType: 'article' | 'tool';
  currentContent: any;
  onRestore?: (versionData: any) => void;
}

export const ContentVersionControl: React.FC<ContentVersionControlProps> = ({
  contentId,
  contentType,
  currentContent,
  onRestore
}) => {
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<ContentVersion | null>(null);
  const [changeSummary, setChangeSummary] = useState('');

  useEffect(() => {
    if (contentId) {
      fetchVersions();
    }
  }, [contentId, contentType]);

  const fetchVersions = async () => {
    try {
      setLoading(true);
      // Mock data until the database types are updated
      const mockVersions: ContentVersion[] = [
        {
          id: '1',
          content_id: contentId,
          content_type: contentType,
          version_number: 2,
          content_data: { title: 'Previous Version', content: 'Previous content...' },
          change_summary: 'Updated introduction and fixed typos',
          created_by: 'user-1',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          profiles: {
            email: 'admin@example.com',
            first_name: 'Admin',
            last_name: 'User'
          }
        },
        {
          id: '2',
          content_id: contentId,
          content_type: contentType,
          version_number: 1,
          content_data: { title: 'Initial Version', content: 'Initial content...' },
          change_summary: 'Initial version',
          created_by: 'user-1',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          profiles: {
            email: 'admin@example.com',
            first_name: 'Admin',
            last_name: 'User'
          }
        }
      ];
      setVersions(mockVersions);
    } catch (error) {
      console.error('Error fetching versions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch content versions',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveVersion = async () => {
    try {
      const nextVersionNumber = versions.length > 0 ? Math.max(...versions.map(v => v.version_number)) + 1 : 1;

      // Mock saving - in real implementation, this would use Supabase
      const newVersion: ContentVersion = {
        id: Date.now().toString(),
        content_id: contentId,
        content_type: contentType,
        version_number: nextVersionNumber,
        content_data: currentContent,
        change_summary: changeSummary,
        created_by: 'current-user',
        created_at: new Date().toISOString(),
        profiles: {
          email: 'current@example.com',
          first_name: 'Current',
          last_name: 'User'
        }
      };

      setVersions(prev => [newVersion, ...prev]);

      toast({
        title: 'Success',
        description: 'Version saved successfully'
      });

      setShowSaveDialog(false);
      setChangeSummary('');
    } catch (error) {
      console.error('Error saving version:', error);
      toast({
        title: 'Error',
        description: 'Failed to save version',
        variant: 'destructive'
      });
    }
  };

  const restoreVersion = async (version: ContentVersion) => {
    try {
      if (onRestore) {
        onRestore(version.content_data);
        toast({
          title: 'Success',
          description: `Restored to version ${version.version_number}`
        });
      }
    } catch (error) {
      console.error('Error restoring version:', error);
      toast({
        title: 'Error',
        description: 'Failed to restore version',
        variant: 'destructive'
      });
    }
  };

  const viewVersion = (version: ContentVersion) => {
    setSelectedVersion(version);
    setShowViewDialog(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <GitBranch className="w-5 h-5 mr-2" />
          Version Control
        </CardTitle>
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Version
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save New Version</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="summary">Change Summary</Label>
                <Textarea
                  id="summary"
                  value={changeSummary}
                  onChange={(e) => setChangeSummary(e.target.value)}
                  placeholder="Describe what changed in this version..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={saveVersion}>
                  Save Version
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-4">Loading versions...</div>
          ) : versions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No versions saved yet
            </div>
          ) : (
            versions.map((version) => (
              <div key={version.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline">
                      v{version.version_number}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      by {version.profiles?.first_name} {version.profiles?.last_name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mb-1">
                    {version.change_summary || 'No summary provided'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(version.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewVersion(version)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => restoreVersion(version)}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Version {selectedVersion?.version_number} Details
              </DialogTitle>
            </DialogHeader>
            {selectedVersion && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Change Summary:</h3>
                  <p className="text-gray-700">{selectedVersion.change_summary || 'No summary provided'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Content Data:</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {JSON.stringify(selectedVersion.content_data, null, 2)}
                  </pre>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                    Close
                  </Button>
                  <Button onClick={() => restoreVersion(selectedVersion)}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restore This Version
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
