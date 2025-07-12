import React from 'react';
import { Construct } from '@/types/reality';

interface ConstructDebuggerProps {
  selectedConstruct: Construct | null;
}

export const ConstructDebugger: React.FC<ConstructDebuggerProps> = ({
  selectedConstruct
}) => {
  if (!selectedConstruct) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
      <h3 className="text-cyan-400 font-medium mb-2">Selected Construct:</h3>
      <pre className="text-gray-300 text-sm">
        {JSON.stringify(selectedConstruct, null, 2)}
      </pre>
    </div>
  );
};