import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCollaborativeConnection } from './collaborative/hooks/useCollaborativeConnection';
import { ConnectionControls } from './collaborative/components/ConnectionControls';
import { CollaborativeStatus } from './collaborative/components/CollaborativeStatus';
import { ArchitectsList } from './collaborative/components/ArchitectsList';
import { CollaborativeFeatures } from './collaborative/components/CollaborativeFeatures';
import { QuantumSyncStatus } from './collaborative/components/QuantumSyncStatus';
import { CollaborativeIntelligenceProps } from './collaborative/types';

export const CollaborativeIntelligence: React.FC<CollaborativeIntelligenceProps> = ({
  currentUserId,
  onPresenceUpdate,
  onSharedCommand
}) => {
  const {
    architects,
    isConnected,
    sessionMode,
    setSessionMode,
    broadcastCommand,
    updatePresenceLocation
  } = useCollaborativeConnection(currentUserId, onPresenceUpdate, onSharedCommand);

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm">
          <CollaborativeStatus 
            isConnected={isConnected} 
            architectCount={architects.length} 
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ConnectionControls
          sessionMode={sessionMode}
          onModeChange={setSessionMode}
          isConnected={isConnected}
        />

        {isConnected && <ArchitectsList architects={architects} />}

        <CollaborativeFeatures />

        <QuantumSyncStatus 
          isConnected={isConnected}
          architectCount={architects.length}
        />
      </CardContent>
    </Card>
  );
};