
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Search, UserPlus, Shield, Ban, Loader2 } from 'lucide-react';
import { AddUserModal } from '../modals/AddUserModal';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserWithRole {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  role: string;
}

export const AdminUsersPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const { toast } = useToast();

  // Fetch users with their roles from Supabase
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

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'moderator': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-accent/20 text-accent border-accent/50';
    }
  };

  const getStatusBadgeColor = (lastSignIn: string | null) => {
    if (!lastSignIn) return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    
    const lastSignInDate = new Date(lastSignIn);
    const daysSinceLastSignIn = (Date.now() - lastSignInDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastSignIn <= 7) {
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    } else if (daysSinceLastSignIn <= 30) {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    } else {
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusText = (lastSignIn: string | null) => {
    if (!lastSignIn) return 'Never logged in';
    
    const lastSignInDate = new Date(lastSignIn);
    const daysSinceLastSignIn = (Date.now() - lastSignInDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastSignIn <= 1) {
      return 'Active';
    } else if (daysSinceLastSignIn <= 7) {
      return 'Recent';
    } else if (daysSinceLastSignIn <= 30) {
      return 'Inactive';
    } else {
      return 'Dormant';
    }
  };

  const handleUserAdded = () => {
    refetch();
    toast({
      title: "User list updated",
      description: "The user list has been refreshed with the latest data.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-space-deep-blue border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
              <span className="text-white">Loading users...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-space-deep-blue border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage user accounts, roles, and permissions ({users.length} total users)
              </CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddUserModalOpen(true)}
              className="bg-accent hover:bg-accent-hover text-accent-foreground focus:ring-2 focus:ring-accent"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Users Table */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Last Login</TableHead>
                  <TableHead className="text-gray-300">Joined</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{user.full_name || 'N/A'}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.last_sign_in_at)}>
                        {getStatusText(user.last_sign_in_at)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'}
                    </TableCell>
                    <TableCell className="text-gray-300">{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-700 focus:ring-2 focus:ring-accent">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-white hover:bg-gray-700 focus:bg-accent focus:text-accent-foreground">
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-gray-700 focus:bg-accent focus:text-accent-foreground">
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-red-500 focus:text-white">
                            <Ban className="h-4 w-4 mr-2" />
                            Ban User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <Shield className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-400">No users found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
};
