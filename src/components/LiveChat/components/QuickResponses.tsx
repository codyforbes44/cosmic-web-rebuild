
import React from 'react';

interface QuickResponsesProps {
  responses: string[];
  onSelectResponse: (response: string) => void;
}

const QuickResponses: React.FC<QuickResponsesProps> = ({ 
  responses, 
  onSelectResponse 
}) => {
  // Limit to only 3 responses
  const limitedResponses = responses.slice(0, 3);
  
  return (
    <div className="p-2 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-1">
      {limitedResponses.map((response, index) => (
        <button
          key={index}
          className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full transition-colors"
          onClick={() => onSelectResponse(response)}
        >
          {response}
        </button>
      ))}
    </div>
  );
};

export default QuickResponses;
