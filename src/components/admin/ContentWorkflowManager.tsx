
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Workflow, Plus, Edit, Trash2, Calendar, User, AlertCircle } from 'lucide-react';

interface ContentWorkflow {
  id: string;
  name: string;
  description: string;
  stages: string[];
  is_active: boolean;
  created_at: string;
}

interface ContentAssignment {
  id: string;
  content_id: string;
  content_type: string;
  assigned_to?: string;
  assigned_by?: string;
  workflow_id?: string;
  current_stage?: string;
  due_date?: string;
  priority: string;
  notes?: string;
  created_at: string;
  profiles?: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
  workflow?: {
    name: string;
  };
}

export const ContentWorkflowManager = () => {
  const [workflows, setWorkflows] = useState<ContentWorkflow[]>([]);
  const [assignments, setAssignments] = useState<ContentAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWorkflowDialog, setShowWorkflowDialog] = useState(false);
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<ContentWorkflow | null>(null);

  const [workflowForm, setWorkflowForm] = useState({
    name: '',
    description: '',
    stages: ['Draft', 'Review', 'Published']
  });

  const [assignmentForm, setAssignmentForm] = useState({
    content_id: '',
    content_type: 'article',
    assigned_to: '',
    workflow_id: '',
    current_stage: '',
    due_date: '',
    priority: 'medium',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch workflows
      const { data: workflowData, error: workflowError } = await supabase
        .from('content_workflows')
        .select('*')
        .order('created_at', { ascending: false });

      if (workflowError) throw workflowError;
      setWorkflows(workflowData || []);

      // Fetch assignments
      const { data: assignmentData, error: assignmentError } = await supabase
        .from('content_assignments')
        .select(`
          *,
          profiles:assigned_to (
            email,
            first_name,
            last_name
          ),
          workflow:workflow_id (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (assignmentError) throw assignmentError;
      setAssignments(assignmentData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch workflow data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveWorkflow = async () => {
    try {
      if (editingWorkflow) {
        const { error } = await supabase
          .from('content_workflows')
          .update({
            name: workflowForm.name,
            description: workflowForm.description,
            stages: workflowForm.stages
          })
          .eq('id', editingWorkflow.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('content_workflows')
          .insert({
            name: workflowForm.name,
            description: workflowForm.description,
            stages: workflowForm.stages
          });

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Workflow ${editingWorkflow ? 'updated' : 'created'} successfully`
      });

      setShowWorkflowDialog(false);
      setEditingWorkflow(null);
      setWorkflowForm({ name: '', description: '', stages: ['Draft', 'Review', 'Published'] });
      fetchData();
    } catch (error) {
      console.error('Error saving workflow:', error);
      toast({
        title: 'Error',
        description: 'Failed to save workflow',
        variant: 'destructive'
      });
    }
  };

  const saveAssignment = async () => {
    try {
      const { error } = await supabase
        .from('content_assignments')
        .insert(assignmentForm);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Assignment created successfully'
      });

      setShowAssignmentDialog(false);
      setAssignmentForm({
        content_id: '',
        content_type: 'article',
        assigned_to: '',
        workflow_id: '',
        current_stage: '',
        due_date: '',
        priority: 'medium',
        notes: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error saving assignment:', error);
      toast({
        title: 'Error',
        description: 'Failed to create assignment',
        variant: 'destructive'
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-6">Loading workflows...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Workflow Management</h1>
          <p className="text-gray-600">Manage content workflows and assignments</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showWorkflowDialog} onOpenChange={setShowWorkflowDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Workflow className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingWorkflow ? 'Edit Workflow' : 'Create Workflow'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={workflowForm.name}
                    onChange={(e) => setWorkflowForm({...workflowForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={workflowForm.description}
                    onChange={(e) => setWorkflowForm({...workflowForm, description: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowWorkflowDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveWorkflow}>
                    {editingWorkflow ? 'Update' : 'Create'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showAssignmentDialog} onOpenChange={setShowAssignmentDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Content Type</Label>
                  <Select
                    value={assignmentForm.content_type}
                    onValueChange={(value) => setAssignmentForm({...assignmentForm, content_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="tool">Tool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select
                    value={assignmentForm.priority}
                    onValueChange={(value) => setAssignmentForm({...assignmentForm, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={assignmentForm.notes}
                    onChange={(e) => setAssignmentForm({...assignmentForm, notes: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAssignmentDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveAssignment}>
                    Create Assignment
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Workflows */}
        <Card>
          <CardHeader>
            <CardTitle>Workflows</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{workflow.name}</h3>
                  <Badge variant={workflow.is_active ? "default" : "secondary"}>
                    {workflow.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
                <div className="flex flex-wrap gap-1">
                  {workflow.stages.map((stage, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {stage}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.slice(0, 5).map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{assignment.content_type}</Badge>
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                  </div>
                  {assignment.due_date && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {assignment.profiles && (
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <User className="w-4 h-4 mr-1" />
                    {assignment.profiles.first_name} {assignment.profiles.last_name}
                  </div>
                )}
                {assignment.current_stage && (
                  <Badge variant="secondary" className="text-xs">
                    {assignment.current_stage}
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
