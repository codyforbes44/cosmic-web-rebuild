
import React from 'react';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children, fallback }) => {
  const { isAdmin, loading } = useAdminRole();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return fallback || (
      <Alert className="border-red-500/50 bg-red-500/10">
        <Shield className="h-4 w-4" />
        <AlertDescription className="text-red-300">
          Access denied. Administrator privileges required to view this content.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};
