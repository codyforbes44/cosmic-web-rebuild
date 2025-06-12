
import React from 'react';
import { AdminUserVerification } from '../components/AdminUserVerification';

export const AdminUserVerificationPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-4">
        <AdminUserVerification />
      </div>
    </div>
  );
};
