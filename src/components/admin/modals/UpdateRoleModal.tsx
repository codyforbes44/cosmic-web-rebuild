
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield } from 'lucide-react';
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
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      await onUpdateRole(user.id, selectedRole);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update role');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedRole(user?.role || 'user');
    setError('');
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-space-deep-blue border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Update User Role
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Change the role for {user.full_name || user.email}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-white font-medium">Current Role: {user.role}</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="user" className="text-white hover:bg-gray-700">User</SelectItem>
                <SelectItem value="moderator" className="text-white hover:bg-gray-700">Moderator</SelectItem>
                <SelectItem value="admin" className="text-white hover:bg-gray-700">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || selectedRole === user.role}
              className="bg-accent hover:bg-accent-hover text-accent-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Role'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
