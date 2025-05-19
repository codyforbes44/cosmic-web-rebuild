
import React from 'react';

interface QuickResponsesProps {
  responses: string[];
  onSelectResponse: (response: string) => void;
}

const QuickResponses: React.FC<QuickResponsesProps> = ({ 
  responses,
  onSelectResponse
}) => {
  if (responses.length === 0) return null;
  
  return (
    <div className="p-2 bg-slate-50 dark:bg-slate-900 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800">
      {responses.map((response, index) => (
        <button
          key={index}
          onClick={() => onSelectResponse(response)}
          className="text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-full 
                  bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 
                  hover:bg-brand-gold hover:text-white hover:border-brand-gold 
                  transition-colors duration-200"
        >
          {response}
        </button>
      ))}
    </div>
  );
};

export default QuickResponses;
