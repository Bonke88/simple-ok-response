
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Shield, Key, Users, Settings, AlertTriangle } from 'lucide-react';

interface AuthConfig {
  enable_signup: boolean;
  enable_email_confirmations: boolean;
  enable_phone_confirmations: boolean;
  password_min_length: number;
  jwt_secret: string;
  jwt_exp: number;
}

interface AuthProvider {
  name: string;
  enabled: boolean;
  client_id?: string;
  client_secret?: string;
}

export const AdvancedAuth = () => {
  const [authConfig, setAuthConfig] = useState<AuthConfig>({
    enable_signup: true,
    enable_email_confirmations: true,
    enable_phone_confirmations: false,
    password_min_length: 8,
    jwt_secret: '',
    jwt_exp: 3600
  });

  const [authProviders, setAuthProviders] = useState<AuthProvider[]>([
    { name: 'Google', enabled: false },
    { name: 'GitHub', enabled: false },
    { name: 'Apple', enabled: false },
    { name: 'Facebook', enabled: false }
  ]);

  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAuthData();
  }, []);

  const fetchAuthData = async () => {
    try {
      setLoading(true);
      // In a real implementation, these would come from Supabase admin API
      // For now, we'll use mock data
      console.log('Fetching auth configuration...');
    } catch (error) {
      console.error('Error fetching auth data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAuthConfig = async (config: Partial<AuthConfig>) => {
    try {
      setAuthConfig(prev => ({ ...prev, ...config }));
      toast({
        title: 'Success',
        description: 'Authentication configuration updated'
      });
    } catch (error) {
      console.error('Error updating auth config:', error);
      toast({
        title: 'Error',
        description: 'Failed to update configuration',
        variant: 'destructive'
      });
    }
  };

  const toggleProvider = async (providerName: string) => {
    try {
      setAuthProviders(prev =>
        prev.map(provider =>
          provider.name === providerName
            ? { ...provider, enabled: !provider.enabled }
            : provider
        )
      );
      toast({
        title: 'Success',
        description: `${providerName} provider ${authProviders.find(p => p.name === providerName)?.enabled ? 'disabled' : 'enabled'}`
      });
    } catch (error) {
      console.error('Error toggling provider:', error);
      toast({
        title: 'Error',
        description: 'Failed to update provider',
        variant: 'destructive'
      });
    }
  };

  const revokeAllSessions = async () => {
    try {
      // In a real implementation, this would revoke all user sessions
      toast({
        title: 'Success',
        description: 'All user sessions have been revoked'
      });
    } catch (error) {
      console.error('Error revoking sessions:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke sessions',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Advanced Authentication</h1>
        <p className="text-gray-600">Manage authentication settings and security</p>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable Signups</Label>
                  <p className="text-sm text-gray-600">Allow new users to create accounts</p>
                </div>
                <Switch
                  checked={authConfig.enable_signup}
                  onCheckedChange={(checked) => updateAuthConfig({ enable_signup: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Email Confirmations</Label>
                  <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                </div>
                <Switch
                  checked={authConfig.enable_email_confirmations}
                  onCheckedChange={(checked) => updateAuthConfig({ enable_email_confirmations: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Phone Confirmations</Label>
                  <p className="text-sm text-gray-600">Require phone verification for new accounts</p>
                </div>
                <Switch
                  checked={authConfig.enable_phone_confirmations}
                  onCheckedChange={(checked) => updateAuthConfig({ enable_phone_confirmations: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-length">Minimum Password Length</Label>
                <Input
                  id="password-length"
                  type="number"
                  value={authConfig.password_min_length?.toString() ?? '8'}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      updateAuthConfig({ password_min_length: value });
                    }
                  }}
                  min="6"
                  max="50"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                OAuth Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {authProviders.map((provider) => (
                  <div key={provider.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{provider.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{provider.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={provider.enabled ? "default" : "secondary"}>
                          {provider.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <Switch
                          checked={provider.enabled}
                          onCheckedChange={() => toggleProvider(provider.name)}
                        />
                      </div>
                    </div>
                    {provider.enabled && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Client ID</Label>
                          <Input placeholder="Enter client ID" size="sm" />
                        </div>
                        <div>
                          <Label className="text-sm">Client Secret</Label>
                          <Input type="password" placeholder="Enter client secret" size="sm" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jwt-exp">JWT Expiration (seconds)</Label>
                <Input
                  id="jwt-exp"
                  type="number"
                  value={authConfig.jwt_exp?.toString() ?? '3600'}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      updateAuthConfig({ jwt_exp: value });
                    }
                  }}
                />
                <p className="text-sm text-gray-600">How long authentication tokens remain valid</p>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Security Notice</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Changing security settings can affect all users. Make sure you understand the implications before making changes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="destructive" onClick={revokeAllSessions}>
                  Revoke All User Sessions
                </Button>
                <p className="text-sm text-gray-600">
                  This will force all users to log in again. Use with caution.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Session management requires additional Supabase configuration.</p>
                <p className="text-sm mt-1">Contact your system administrator to enable this feature.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
