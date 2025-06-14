
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
      const { data, error } = await supabase.functions.invoke('admin-users', {
        method: 'GET',
      });

      if (error) {
        throw new Error(error.message || 'Failed to fetch users');
      }

      return data.users as UserWithRole[];
    },
  });

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        method: 'POST',
        body: { 
          action: 'update-role',
          userId, 
          newRole 
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to update role');
      }

      toast({
        title: "Role updated",
        description: "User role has been successfully updated.",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const banUser = async (userId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        method: 'POST',
        body: { 
          action: 'ban-user',
          userId 
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to ban user');
      }

      toast({
        title: "User banned",
        description: "User has been successfully banned.",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (userId: string, newPassword: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        method: 'POST',
        body: { 
          action: 'reset-password',
          userId,
          newPassword
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to reset password');
      }

      toast({
        title: "Password reset",
        description: "User password has been successfully reset.",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
    updateUserRole,
    banUser,
    resetPassword,
    refetch
  };
};
