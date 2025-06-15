export interface ArchitectPresence {
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

export interface CollaborativeIntelligenceProps {
  currentUserId?: string;
  onPresenceUpdate?: (architects: ArchitectPresence[]) => void;
  onSharedCommand?: (command: string, author: string) => void;
}

export type SessionMode = 'private' | 'collaborative';