import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArchitectPresence, SessionMode } from '../types';

export const useCollaborativeConnection = (
  currentUserId?: string,
  onPresenceUpdate?: (architects: ArchitectPresence[]) => void,
  onSharedCommand?: (command: string, author: string) => void
) => {
  const { toast } = useToast();
  const [architects, setArchitects] = useState<ArchitectPresence[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [channel, setChannel] = useState<any>(null);
  const [sessionMode, setSessionMode] = useState<SessionMode>('private');

  const initializeCollaboration = useCallback(async () => {
    try {
      // Prevent multiple subscriptions
      if (channel) {
        await supabase.removeChannel(channel);
      }

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
              const presence = presences[0] as any;
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
          if (newArchitect && key !== currentUserId) {
            toast({
              title: "ARCHITECT.JOIN",
              description: `${newArchitect.username || 'Unknown Architect'} has entered the ZEPHEL simulation space.`,
              duration: 3000,
            });
          }
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          const leftArchitect = leftPresences[0];
          if (leftArchitect && key !== currentUserId) {
            toast({
              title: "ARCHITECT.LEAVE", 
              description: `${leftArchitect.username || 'Unknown Architect'} has left the simulation space.`,
              duration: 3000,
            });
          }
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
          
          // Track our presence with a delay to ensure subscription is ready
          setTimeout(async () => {
            try {
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
            } catch (error) {
              console.error('Failed to track presence:', error);
            }
          }, 500);
          
          toast({
            title: "ZEPHEL.COLLECTIVE_ONLINE",
            description: "Connected to the Architect Collective. Shared intelligence active.",
            duration: 4000,
          });
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          toast({
            title: "COLLECTIVE.CONNECTION_ERROR",
            description: "Real-time connection error. Attempting to reconnect...",
            variant: "destructive",
          });
        }
      });

    } catch (error) {
      console.error('Failed to initialize collaboration:', error);
      setIsConnected(false);
      toast({
        title: "COLLECTIVE.ERROR",
        description: "Failed to establish connection to Architect Collective.",
        variant: "destructive",
      });
    }
  }, [currentUserId, onPresenceUpdate, onSharedCommand, toast, channel]);

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
    let mounted = true;
    
    const handleMode = async () => {
      if (!mounted) return;
      
      if (sessionMode === 'collaborative') {
        await initializeCollaboration();
      } else {
        await disconnectCollaboration();
      }
    };

    handleMode();

    return () => {
      mounted = false;
      disconnectCollaboration();
    };
  }, [sessionMode]);

  return {
    architects,
    isConnected,
    sessionMode,
    setSessionMode,
    broadcastCommand,
    updatePresenceLocation
  };
};