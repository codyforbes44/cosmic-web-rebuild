
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
import { MoreHorizontal, Search, UserPlus, Shield, Ban } from 'lucide-react';
import { AddUserModal } from '../modals/AddUserModal';

export const AdminUsersPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // Mock user data - in real app this would come from Supabase
  const users = [
    {
      id: '1',
      email: 'admin@example.com',
      fullName: 'Admin User',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      email: 'user@example.com',
      fullName: 'Regular User',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-14',
      createdAt: '2024-01-10'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'moderator': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-accent/20 text-accent border-accent/50';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      case 'banned': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const handleUserAdded = () => {
    // In a real app, this would refresh the users list from Supabase
    console.log('User added, refreshing list...');
  };

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
                Manage user accounts, roles, and permissions
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
                        <p className="text-white font-medium">{user.fullName || 'N/A'}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{user.lastLogin}</TableCell>
                    <TableCell className="text-gray-300">{user.createdAt}</TableCell>
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
