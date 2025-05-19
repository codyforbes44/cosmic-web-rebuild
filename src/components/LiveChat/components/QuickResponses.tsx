
import React from 'react';

interface QuickResponsesProps {
  responses: string[];
  onSelectResponse: (response: string) => void;
}

const QuickResponses: React.FC<QuickResponsesProps> = ({ 
  responses, 
  onSelectResponse 
}) => {
  return (
    <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap">
      {responses.map((response, index) => (
        <button
          key={index}
          className="quick-response"
          onClick={() => onSelectResponse(response)}
        >
          {response}
        </button>
      ))}
    </div>
  );
};

export default QuickResponses;
