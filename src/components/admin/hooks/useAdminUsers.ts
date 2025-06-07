
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserWithRole {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  role: string;
}

export const useAdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // First get all users from auth.users via admin API
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw new Error(authError.message);
      }

      // Get user roles from user_roles table
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
      }

      // Get user profiles for additional info
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Combine the data
      const usersWithRoles: UserWithRole[] = authUsers.users.map(user => {
        const userRole = userRoles?.find(role => role.user_id === user.id);
        const profile = profiles?.find(p => p.id === user.id);
        
        return {
          id: user.id,
          email: user.email || '',
          full_name: profile?.full_name || user.user_metadata?.full_name || null,
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          role: userRole?.role || 'user'
        };
      });

      return usersWithRoles;
    },
  });

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAdded = () => {
    refetch();
    toast({
      title: "User list updated",
      description: "The user list has been refreshed with the latest data.",
    });
  };

  return {
    users,
    filteredUsers,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleUserAdded,
    refetch
  };
};
