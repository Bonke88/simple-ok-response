
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAdminRole, setHasAdminRole] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        
        // Get current session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (currentSession?.user) {
          console.log('User authenticated:', currentSession.user.email);
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Check if user has admin role
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentSession.user.id)
            .eq('role', 'admin')
            .single();
          
          if (roleError && roleError.code !== 'PGRST116') {
            // PGRST116 is "not found" - user just doesn't have admin role
            console.error('Role check error:', roleError);
            setError('Unable to verify admin permissions');
          } else if (roleData) {
            console.log('Admin role verified');
            setHasAdminRole(true);
          } else {
            console.log('User does not have admin role');
            setHasAdminRole(false);
          }
        } else {
          console.log('No authenticated user');
          setUser(null);
          setSession(null);
          setHasAdminRole(false);
        }
      } catch (error: any) {
        console.error('Auth check failed:', error);
        setError('Authentication check failed');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state change:', event);
        setLoading(true);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Re-check admin role when auth state changes
          supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', newSession.user.id)
            .eq('role', 'admin')
            .single()
            .then(({ data: roleData, error: roleError }) => {
              if (roleError && roleError.code !== 'PGRST116') {
                console.error('Role recheck failed:', roleError);
                setHasAdminRole(false);
              } else {
                setHasAdminRole(!!roleData);
              }
              setLoading(false);
            });
        } else {
          setHasAdminRole(false);
          setLoading(false);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not authenticated or not admin
  if (!user || !hasAdminRole) {
    console.log('Redirecting to login - User:', !!user, 'Admin role:', hasAdminRole);
    return <Navigate to="/login" replace />;
  }

  // Authenticated admin user
  console.log('Admin access granted');
  return <>{children}</>;
};

export default AdminRoute;
