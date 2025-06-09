import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { UserWithRole } from '../hooks/useAdminUsers';
import { UserActionsMenu } from './UserActionsMenu';

interface UserTableProps {
  users: UserWithRole[];
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
  onBanUser: (userId: string) => Promise<void>;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onUpdateRole, onBanUser }) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
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
          {users.map((user) => (
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
                <UserActionsMenu 
                  user={user} 
                  onUpdateRole={onUpdateRole}
                  onBanUser={onBanUser}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
