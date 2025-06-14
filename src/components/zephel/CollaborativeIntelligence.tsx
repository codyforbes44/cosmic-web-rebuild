import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Crown, Eye, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ArchitectPresence {
  user_id: string;
  username: string;
  status: 'active' | 'idle' | 'away';
  last_seen: string;
  permissions: 'architect' | 'observer' | 'guest';
  location?: {
    x: number;
    y: number;
    section: string;
  };
}

interface CollaborativeIntelligenceProps {
  currentUserId?: string;
  onPresenceUpdate?: (architects: ArchitectPresence[]) => void;
  onSharedCommand?: (command: string, author: string) => void;
}

export const CollaborativeIntelligence: React.FC<CollaborativeIntelligenceProps> = ({
  currentUserId,
  onPresenceUpdate,
  onSharedCommand
}) => {
  const { toast } = useToast();
  const [architects, setArchitects] = useState<ArchitectPresence[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [channel, setChannel] = useState<any>(null);
  const [sessionMode, setSessionMode] = useState<'private' | 'collaborative'>('private');

  const initializeCollaboration = useCallback(async () => {
    try {
      const zephelChannel = supabase.channel('zephel_architects', {
        config: {
          presence: {
            key: currentUserId || 'anonymous'
          }
        }
      });

      // Track presence changes
      zephelChannel
        .on('presence', { event: 'sync' }, () => {
          const presenceState = zephelChannel.presenceState();
          const currentArchitects: ArchitectPresence[] = [];
          
          Object.keys(presenceState).forEach(key => {
            const presences = presenceState[key];
            if (presences && presences.length > 0) {
              const presence = presences[0];
              currentArchitects.push({
                user_id: key,
                username: presence.username || 'Unknown Architect',
                status: presence.status || 'active',
                last_seen: new Date().toISOString(),
                permissions: presence.permissions || 'guest',
                location: presence.location
              });
            }
          });
          
          setArchitects(currentArchitects);
          onPresenceUpdate?.(currentArchitects);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          const newArchitect = newPresences[0];
          toast({
            title: "ARCHITECT.JOIN",
            description: `${newArchitect.username || 'Unknown Architect'} has entered the ZEPHEL simulation space.`,
            duration: 3000,
          });
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          const leftArchitect = leftPresences[0];
          toast({
            title: "ARCHITECT.LEAVE", 
            description: `${leftArchitect.username || 'Unknown Architect'} has left the simulation space.`,
            duration: 3000,
          });
        })
        .on('broadcast', { event: 'zephel_command' }, (payload) => {
          const { command, author, timestamp } = payload;
          onSharedCommand?.(command, author);
          
          toast({
            title: "SHARED.COMMAND",
            description: `${author} executed: ${command.substring(0, 50)}${command.length > 50 ? '...' : ''}`,
            duration: 2000,
          });
        })
        .on('broadcast', { event: 'quantum_sync' }, (payload) => {
          // Handle quantum state synchronization
          console.log('Quantum sync received:', payload);
        });

      // Subscribe to the channel
      const status = await zephelChannel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setChannel(zephelChannel);
          
          // Track our presence
          await zephelChannel.track({
            username: `Architect_${currentUserId?.substring(0, 8) || 'Anonymous'}`,
            status: 'active',
            permissions: 'architect',
            joined_at: new Date().toISOString(),
            location: {
              x: 0,
              y: 0,
              section: 'main_interface'
            }
          });
          
          toast({
            title: "ZEPHEL.COLLECTIVE_ONLINE",
            description: "Connected to the Architect Collective. Shared intelligence active.",
            duration: 4000,
          });
        }
      });

    } catch (error) {
      console.error('Failed to initialize collaboration:', error);
      toast({
        title: "COLLECTIVE.ERROR",
        description: "Failed to establish connection to Architect Collective.",
        variant: "destructive",
      });
    }
  }, [currentUserId, onPresenceUpdate, onSharedCommand, toast]);

  const disconnectCollaboration = useCallback(async () => {
    if (channel) {
      await supabase.removeChannel(channel);
      setChannel(null);
      setIsConnected(false);
      setArchitects([]);
      
      toast({
        title: "ZEPHEL.COLLECTIVE_OFFLINE",
        description: "Disconnected from Architect Collective. Operating in solo mode.",
        duration: 3000,
      });
    }
  }, [channel, toast]);

  const broadcastCommand = useCallback(async (command: string) => {
    if (channel && isConnected) {
      await channel.send({
        type: 'broadcast',
        event: 'zephel_command',
        payload: {
          command,
          author: `Architect_${currentUserId?.substring(0, 8) || 'Anonymous'}`,
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [channel, isConnected, currentUserId]);

  const updatePresenceLocation = useCallback(async (x: number, y: number, section: string) => {
    if (channel && isConnected) {
      await channel.track({
        username: `Architect_${currentUserId?.substring(0, 8) || 'Anonymous'}`,
        status: 'active',
        permissions: 'architect',
        location: { x, y, section },
        last_update: new Date().toISOString()
      });
    }
  }, [channel, isConnected, currentUserId]);

  useEffect(() => {
    if (sessionMode === 'collaborative') {
      initializeCollaboration();
    } else {
      disconnectCollaboration();
    }

    return () => {
      disconnectCollaboration();
    };
  }, [sessionMode, initializeCollaboration, disconnectCollaboration]);

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

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          {isConnected ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-gray-400" />
          )}
          Architect Collective
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Connection Controls */}
        <div className="flex gap-2">
          <Button
            onClick={() => setSessionMode('collaborative')}
            variant={sessionMode === 'collaborative' ? 'default' : 'outline'}
            className="flex-1 text-xs"
            disabled={isConnected}
          >
            Collective Mode
          </Button>
          <Button
            onClick={() => setSessionMode('private')}
            variant={sessionMode === 'private' ? 'default' : 'outline'}
            className="flex-1 text-xs"
          >
            Solo Mode
          </Button>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`text-xs ${
            isConnected ? 'border-green-500 text-green-400' : 'border-gray-500 text-gray-400'
          }`}>
            {isConnected ? `COLLECTIVE ACTIVE (${architects.length})` : 'SOLO MODE'}
          </Badge>
        </div>

        {/* Active Architects */}
        {isConnected && architects.length > 0 && (
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
        )}

        {/* Collective Features */}
        <div className="text-xs text-gray-400 space-y-1">
          <div>• Real-time command sharing across architects</div>
          <div>• Synchronized quantum state processing</div>
          <div>• Collective intelligence amplification</div>
          <div>• Distributed simulation computing</div>
        </div>

        {/* Quantum Sync Status */}
        {isConnected && (
          <div className="bg-blue-900/20 border border-blue-600 rounded p-2">
            <div className="text-xs text-blue-200 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              Quantum entanglement synchronized across {architects.length} consciousness{architects.length !== 1 ? 'es' : ''}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};