import React, { useState, useEffect } from 'react';
import { FormModal } from '@/components/common/BaseModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { UserWithRole } from '../hooks/useAdminUsers';

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserWithRole | null;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
}

export const UpdateRoleModal: React.FC<UpdateRoleModalProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  onUpdateRole 
}) => {
  const [selectedRole, setSelectedRole] = useState(user?.role || 'user');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync selectedRole when user changes
  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      await onUpdateRole(user.id, selectedRole);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update role');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setSelectedRole(user?.role || 'user');
      setError(null);
      onClose();
    }
  };

  if (!user) return null;

  return (
    <FormModal
      isOpen={isOpen}
      onOpenChange={handleClose}
      title="Update User Role"
      description={`Change the role for ${user.full_name || user.email}`}
      headerContent={
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Update User Role</h2>
            <p className="text-sm text-muted-foreground">
              Change the role for {user.full_name || user.email}
            </p>
          </div>
        </div>
      }
      error={error}
      onRetry={() => setError(null)}
      isSubmitting={isLoading}
      submitLabel="Update Role"
      onSubmit={handleSubmit}
      submitDisabled={selectedRole === user.role}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Current Role: <span className="text-foreground font-medium">{user.role}</span></Label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </FormModal>
  );
};
