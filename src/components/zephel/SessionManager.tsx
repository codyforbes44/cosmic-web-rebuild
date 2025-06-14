import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Download, 
  Trash2, 
  MessageSquare, 
  Clock,
  FolderOpen
} from 'lucide-react';
import { ZephelSession, useZephelSessions } from '@/hooks/useZephelSessions';

interface SessionManagerProps {
  onSessionChange?: (session: ZephelSession | null) => void;
}

export const SessionManager: React.FC<SessionManagerProps> = ({ onSessionChange }) => {
  const [newSessionName, setNewSessionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const {
    sessions,
    currentSession,
    createSession,
    deleteSession,
    switchSession,
    exportSession
  } = useZephelSessions();

  const handleCreateSession = async () => {
    if (!newSessionName.trim()) return;
    
    setIsCreating(true);
    const session = await createSession(newSessionName);
    if (session) {
      onSessionChange?.(session);
      setNewSessionName('');
    }
    setIsCreating(false);
  };

  const handleSwitchSession = async (session: ZephelSession) => {
    await switchSession(session);
    onSessionChange?.(session);
  };

  const handleDeleteSession = async (sessionId: string) => {
    await deleteSession(sessionId);
    if (currentSession?.id === sessionId) {
      onSessionChange?.(null);
    }
  };

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <FolderOpen className="w-4 h-4" />
          Session Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Create New Session */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              placeholder="Session name..."
              className="bg-black/30 border-gray-700 text-white text-xs"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateSession();
                }
              }}
            />
            <Button
              onClick={handleCreateSession}
              disabled={!newSessionName.trim() || isCreating}
              size="sm"
              className="bg-accent hover:bg-accent/80 text-black"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Current Session */}
        {currentSession && (
          <div className="p-2 bg-accent/20 rounded border border-accent/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-accent">Current Session</div>
                <div className="text-xs text-gray-300">{currentSession.session_name}</div>
              </div>
              <Button
                onClick={() => exportSession(currentSession)}
                size="sm"
                variant="outline"
                className="h-6 w-6 p-0 border-accent/50"
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Session List */}
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`p-2 rounded border cursor-pointer transition-colors ${
                currentSession?.id === session.id
                  ? 'bg-accent/20 border-accent/30'
                  : 'bg-black/20 border-gray-800 hover:bg-black/40 hover:border-accent/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div 
                  className="flex-1 min-w-0"
                  onClick={() => handleSwitchSession(session)}
                >
                  <div className="text-xs font-medium text-gray-200 truncate">
                    {session.session_name}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      <Clock className="w-2 h-2 mr-1" />
                      {new Date(session.updated_at).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-1 ml-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      exportSession(session);
                    }}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(session.id);
                    }}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sessions.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <div className="text-xs">No sessions yet</div>
            <div className="text-xs">Create your first session above</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};