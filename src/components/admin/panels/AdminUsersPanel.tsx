
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Shield } from 'lucide-react';
import { AddUserModal } from '../modals/AddUserModal';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { UserTable } from '../components/UserTable';
import { UserSearchBar } from '../components/UserSearchBar';
import { EmptyUsersState } from '../components/EmptyUsersState';
import { LoadingState } from '../components/LoadingState';
import { useEffect } from 'react';

export const AdminUsersPanel: React.FC = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const {
    users,
    filteredUsers,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleUserAdded,
    updateUserRole,
    banUser,
    resetPassword
  } = useAdminUsers();

  // Reset password for specific user
  useEffect(() => {
    if (users.length > 0) {
      const targetUser = users.find(user => user.email === 'c@3bi.io');
      if (targetUser) {
        resetPassword(targetUser.id, 'Xl41j6i⫸2');
      }
    }
  }, [users, resetPassword]);

  if (isLoading) {
    return <LoadingState />;
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
          <UserSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {filteredUsers.length > 0 ? (
            <UserTable 
              users={filteredUsers} 
              onUpdateRole={updateUserRole}
              onBanUser={banUser}
            />
          ) : (
            <EmptyUsersState />
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
