import React from 'react';
import { SystemStatus } from '../SystemStatus';
import { CollaborativeIntelligence } from '../CollaborativeIntelligence';
import { ChatInterface } from '../ChatInterface';
import { SystemCommands } from '../SystemCommands';
import { VoiceInterfaceStatus } from '../VoiceInterfaceStatus';
import { systemCommands } from '../ZephelConfig';

interface ZephelInterfaceGridProps {
  messages: any[];
  input: string;
  setInput: (input: string) => void;
  onSendMessage: () => void;
  isProcessing: boolean;
  metrics: any;
  userId: string;
  onPresenceUpdate: (architects: any[]) => void;
  onSharedCommand: (command: string, author: string) => void;
  onCommandSelect: (command: string) => void;
  onConstructSelect: (construct: any) => void;
  quantumField: {
    intensity: number;
    phase: number;
    harmonics: number[];
  };
}

export const ZephelInterfaceGrid: React.FC<ZephelInterfaceGridProps> = ({
  messages,
  input,
  setInput,
  onSendMessage,
  isProcessing,
  metrics,
  userId,
  onPresenceUpdate,
  onSharedCommand,
  onCommandSelect
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
      {/* Left Column - System Status & Collaboration */}
      <div className="lg:col-span-1 space-y-6">
        <SystemStatus metrics={metrics} />
        <CollaborativeIntelligence
          currentUserId={userId}
          onPresenceUpdate={onPresenceUpdate}
          onSharedCommand={onSharedCommand}
        />
      </div>
      
      {/* Center Column - Chat Interface */}
      <div className="lg:col-span-3">
        <ChatInterface
          messages={messages}
          input={input}
          setInput={setInput}
          onSendMessage={onSendMessage}
          isProcessing={isProcessing}
        />
      </div>

      {/* Right Column - Commands & Voice Status */}
      <div className="lg:col-span-2 space-y-6">
        <SystemCommands
          commands={systemCommands}
          onCommandSelect={onCommandSelect}
        />
        <VoiceInterfaceStatus />
      </div>
    </div>
  );
};