import React from 'react';

interface QuantumSyncStatusProps {
  isConnected: boolean;
  architectCount: number;
}

export const QuantumSyncStatus: React.FC<QuantumSyncStatusProps> = ({
  isConnected,
  architectCount
}) => {
  if (!isConnected) {
    return null;
  }

  return (
    <div className="bg-blue-900/20 border border-blue-600 rounded p-2">
      <div className="text-xs text-blue-200 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
        Quantum entanglement synchronized across {architectCount} consciousness{architectCount !== 1 ? 'es' : ''}
      </div>
    </div>
  );
};