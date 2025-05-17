
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="flex items-center gap-2 text-red-400 mb-4 p-2 bg-red-900/20 rounded-md">
      <AlertCircle className="h-4 w-4" />
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default ErrorMessage;
