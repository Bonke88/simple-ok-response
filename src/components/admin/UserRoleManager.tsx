
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Shield, Edit, Trash2 } from 'lucide-react';

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'author' | 'user';
  created_at: string;
  profiles?: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export const UserRoleManager = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'editor' | 'author' | 'user'>('user');

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      // Mock data since user_roles table doesn't exist in current types
      const mockUserRoles: UserRole[] = [
        {
          id: '1',
          user_id: 'user-1',
          role: 'admin',
          created_at: '2024-01-15T10:00:00Z',
          profiles: {
            email: 'admin@example.com',
            first_name: 'John',
            last_name: 'Admin'
          }
        },
        {
          id: '2',
          user_id: 'user-2',
          role: 'editor',
          created_at: '2024-01-16T11:00:00Z',
          profiles: {
            email: 'editor@example.com',
            first_name: 'Jane',
            last_name: 'Editor'
          }
        },
        {
          id: '3',
          user_id: 'user-3',
          role: 'author',
          created_at: '2024-01-17T12:00:00Z',
          profiles: {
            email: 'author@example.com',
            first_name: 'Bob',
            last_name: 'Author'
          }
        }
      ];

      setUserRoles(mockUserRoles);
    } catch (error) {
      console.error('Error fetching user roles:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user roles',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addUserRole = async () => {
    try {
      // Mock implementation - in real app this would use Supabase
      const newRole: UserRole = {
        id: `new-${Date.now()}`,
        user_id: `user-${Date.now()}`,
        role: newUserRole,
        created_at: new Date().toISOString(),
        profiles: {
          email: newUserEmail,
          first_name: 'New',
          last_name: 'User'
        }
      };

      setUserRoles(prev => [...prev, newRole]);

      toast({
        title: 'Success',
        description: 'User role added successfully'
      });

      setShowAddDialog(false);
      setNewUserEmail('');
      setNewUserRole('user');
    } catch (error) {
      console.error('Error adding user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to add user role',
        variant: 'destructive'
      });
    }
  };

  const updateUserRole = async (roleId: string, newRole: string) => {
    try {
      setUserRoles(prev =>
        prev.map(userRole =>
          userRole.id === roleId
            ? { ...userRole, role: newRole as 'admin' | 'editor' | 'author' | 'user' }
            : userRole
        )
      );

      toast({
        title: 'Success',
        description: 'User role updated successfully'
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive'
      });
    }
  };

  const deleteUserRole = async (roleId: string) => {
    try {
      setUserRoles(prev => prev.filter(userRole => userRole.id !== roleId));

      toast({
        title: 'Success',
        description: 'User role removed successfully'
      });
    } catch (error) {
      console.error('Error deleting user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove user role',
        variant: 'destructive'
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'author': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-6">Loading user roles...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Role Management</h1>
          <p className="text-gray-600">Manage user permissions and access levels</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">User Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newUserRole} onValueChange={(value: any) => setNewUserRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={addUserRole}>
                  Add Role
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {userRoles.map((userRole) => (
          <Card key={userRole.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Shield className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">
                        {userRole.profiles?.first_name} {userRole.profiles?.last_name}
                      </h3>
                      <Badge className={getRoleBadgeColor(userRole.role)}>
                        {userRole.role}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{userRole.profiles?.email}</p>
                    <p className="text-sm text-gray-500">
                      Added: {new Date(userRole.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={userRole.role}
                    onValueChange={(value) => updateUserRole(userRole.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteUserRole(userRole.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
