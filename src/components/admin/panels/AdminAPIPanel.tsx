import React from 'react';
import { APIUsageOverview } from './api/APIUsageOverview';
import { SecretsManagement } from './api/SecretsManagement';
import { APIHealthStatus } from './api/APIHealthStatus';
import { EdgeFunctionPerformance } from './api/EdgeFunctionPerformance';

export const AdminAPIPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <EdgeFunctionPerformance />
      <APIUsageOverview />
      <SecretsManagement />
      <APIHealthStatus />
    </div>
  );
};
