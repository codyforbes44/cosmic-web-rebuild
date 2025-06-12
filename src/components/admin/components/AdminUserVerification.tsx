
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const targetAdminUsers = [
  'c@3bi.io',
  'ken.munck@crengland.com',
  'wayne.cederholm@crengland.com'
];

export const AdminUserVerification: React.FC = () => {
  const { data: adminUsers, isLoading } = useQuery({
    queryKey: ['admin-verification'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        method: 'GET',
      });

      if (error) {
        throw new Error(error.message || 'Failed to fetch users');
      }

      return data.users.filter((user: any) => user.role === 'admin');
    },
  });

  const checkAdminStatus = (email: string) => {
    return adminUsers?.some((user: any) => user.email === email && user.role === 'admin');
  };

  if (isLoading) {
    return (
      <Card className="bg-space-deep-blue border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-space-deep-blue border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Admin User Verification
        </CardTitle>
        <CardDescription className="text-gray-400">
          Verification status for required admin users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {targetAdminUsers.map((email) => {
          const isAdmin = checkAdminStatus(email);
          return (
            <div key={email} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
              <div className="flex items-center gap-3">
                {isAdmin ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className="text-white font-medium">{email}</span>
              </div>
              <Badge className={isAdmin ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}>
                {isAdmin ? 'Admin Confirmed' : 'Not Admin'}
              </Badge>
            </div>
          );
        })}
        
        <div className="mt-6 p-4 bg-black/30 rounded-lg border border-gray-600">
          <h4 className="text-white font-medium mb-2">Current Admin Users:</h4>
          <div className="space-y-2">
            {adminUsers?.length > 0 ? (
              adminUsers.map((user: any) => (
                <div key={user.id} className="flex items-center gap-2 text-gray-300">
                  <Shield className="h-4 w-4 text-accent" />
                  <span>{user.email}</span>
                  <Badge className="bg-accent/20 text-accent border-accent/50">Admin</Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No admin users found</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
