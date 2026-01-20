import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

/**
 * AdminProtectedRoute - Protects routes that require admin privileges
 * 
 * Security flow:
 * 1. Check if user is authenticated
 * 2. Verify admin role via server-side RPC (is_admin)
 * 3. Redirect to auth or show access denied if checks fail
 */
const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children,
  fallbackPath = '/'
}) => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('is_admin', { user_id: user.id });
        
        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data || false);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (!authLoading) {
      checkAdminRole();
    }
  }, [user, authLoading]);

  // Show loading state while checking auth and admin status
  if (authLoading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-foreground">
          <div className="relative">
            <Shield className="h-12 w-12 text-primary animate-pulse" />
            <Loader2 className="h-6 w-6 animate-spin absolute -bottom-1 -right-1 text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">Verifying access...</span>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    // Store intended destination for post-login redirect
    const returnTo = encodeURIComponent(location.pathname + location.search);
    navigate(`/auth?returnTo=${returnTo}`, { replace: true });
    return null;
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-destructive/20 rounded-lg p-8 text-center shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="h-16 w-16 text-destructive" />
              <AlertTriangle className="h-6 w-6 text-destructive absolute -bottom-1 -right-1" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Access Denied
          </h1>
          
          <p className="text-muted-foreground mb-6">
            This area requires administrator privileges. If you believe you should have access, 
            please contact your system administrator.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate(fallbackPath)}
              variant="default"
              className="w-full"
            >
              Return to Home
            </Button>
            
            <Button
              onClick={() => navigate('/profile')}
              variant="outline"
              className="w-full"
            >
              Go to Profile
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-6">
            Logged in as: {user.email}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
