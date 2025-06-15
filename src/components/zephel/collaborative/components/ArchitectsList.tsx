import React from 'react';
import { Crown, Eye, Users } from 'lucide-react';
import { ArchitectPresence } from '../types';

interface ArchitectsListProps {
  architects: ArchitectPresence[];
}

export const ArchitectsList: React.FC<ArchitectsListProps> = ({ architects }) => {
  const getPermissionIcon = (permissions: string) => {
    switch (permissions) {
      case 'architect':
        return <Crown className="w-3 h-3 text-yellow-400" />;
      case 'observer':
        return <Eye className="w-3 h-3 text-blue-400" />;
      default:
        return <Users className="w-3 h-3 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'away':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (architects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-400 font-semibold">Active Architects:</div>
      {architects.map((architect) => (
        <div key={architect.user_id} className="flex items-center justify-between p-2 bg-black/20 rounded border border-gray-800">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(architect.status)}`}></div>
            <span className="text-xs text-white font-mono">{architect.username}</span>
            {getPermissionIcon(architect.permissions)}
          </div>
          {architect.location && (
            <div className="text-xs text-gray-500">
              {architect.location.section}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};