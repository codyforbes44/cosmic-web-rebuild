
import React from 'react';

interface RecentMessagesProps {
  voiceMessages: string[];
}

export const RecentMessages: React.FC<RecentMessagesProps> = ({ voiceMessages }) => {
  if (voiceMessages.length === 0) {
    return null;
  }

  return (
    <div className="bg-space-deep-blue/90 border border-gray-700 rounded-lg p-4">
      <h3 className="text-white text-sm font-medium mb-3">Recent Responses</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {voiceMessages.slice(-5).map((message, index) => (
          <div
            key={index}
            className="bg-green-900/20 border border-green-600 rounded p-2"
          >
            <p className="text-green-200 text-xs">{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
