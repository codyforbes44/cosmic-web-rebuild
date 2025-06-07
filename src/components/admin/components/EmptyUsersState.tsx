
import React from 'react';
import { Shield } from 'lucide-react';

export const EmptyUsersState: React.FC = () => {
  return (
    <div className="text-center py-8">
      <Shield className="mx-auto h-12 w-12 text-gray-400 mb-3" />
      <p className="text-gray-400">No users found matching your search.</p>
    </div>
  );
};
