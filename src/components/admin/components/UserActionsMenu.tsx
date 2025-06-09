
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Ban, Shield, UserX } from 'lucide-react';
import { UserWithRole } from '../hooks/useAdminUsers';
import { UpdateRoleModal } from '../modals/UpdateRoleModal';

interface UserActionsMenuProps {
  user: UserWithRole;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
  onBanUser: (userId: string) => Promise<void>;
}

export const UserActionsMenu: React.FC<UserActionsMenuProps> = ({ 
  user, 
  onUpdateRole, 
  onBanUser 
}) => {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const handleBanUser = () => {
    if (window.confirm(`Are you sure you want to ban ${user.full_name || user.email}?`)) {
      onBanUser(user.id);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-700 focus:ring-2 focus:ring-accent">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
          <DropdownMenuItem 
            onClick={() => setIsRoleModalOpen(true)}
            className="text-white hover:bg-gray-700 focus:bg-accent focus:text-accent-foreground"
          >
            <Shield className="h-4 w-4 mr-2" />
            Change Role
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleBanUser}
            className="text-red-400 hover:bg-gray-700 focus:bg-red-500 focus:text-white"
          >
            <Ban className="h-4 w-4 mr-2" />
            Ban User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateRoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        user={user}
        onUpdateRole={onUpdateRole}
      />
    </>
  );
};
