import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  RotateCcw, 
  Trash2, 
  Clock,
  Save,
  Star,
  StarOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SessionSnapshot {
  id: string;
  name: string;
  timestamp: string;
  config: {
    mode: string;
    intensity: number;
    quality: number;
    particleCount: number;
  };
  isStarred: boolean;
  previewImage?: string;
}

interface SessionHistoryProps {
  onRestoreSession: (config: SessionSnapshot['config']) => void;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({
  onRestoreSession
}) => {
  const [sessions, setSessions] = useState<SessionSnapshot[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading session history
    const mockSessions: SessionSnapshot[] = [
      {
        id: '1',
        name: 'Quantum Storm Config',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        config: { mode: 'quantum', intensity: 85, quality: 90, particleCount: 5000 },
        isStarred: true
      },
      {
        id: '2',
        name: 'Neural Network Demo',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        config: { mode: 'neural', intensity: 70, quality: 75, particleCount: 3000 },
        isStarred: false
      },
      {
        id: '3',
        name: 'Data Flow Analysis',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        config: { mode: 'dataflow', intensity: 60, quality: 80, particleCount: 4000 },
        isStarred: false
      },
      {
        id: '4',
        name: 'Hybrid Visualization',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        config: { mode: 'hybrid', intensity: 75, quality: 85, particleCount: 6000 },
        isStarred: true
      }
    ];
    setSessions(mockSessions);
  }, []);

  const handleRestore = (session: SessionSnapshot) => {
    onRestoreSession(session.config);
    toast({
      title: "Session Restored",
      description: `Loaded configuration: ${session.name}`,
    });
  };

  const toggleStar = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, isStarred: !session.isStarred }
        : session
    ));
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    toast({
      title: "Session Deleted",
      description: "Configuration removed from history",
    });
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const saveCurrentSession = () => {
    const newSession: SessionSnapshot = {
      id: Date.now().toString(),
      name: `Session ${new Date().toLocaleTimeString()}`,
      timestamp: new Date().toISOString(),
      config: { mode: 'quantum', intensity: 70, quality: 75, particleCount: 3000 },
      isStarred: false
    };
    setSessions(prev => [newSession, ...prev]);
    toast({
      title: "Session Saved",
      description: "Current configuration saved to history",
    });
  };

  const starredSessions = sessions.filter(s => s.isStarred);
  const recentSessions = sessions.filter(s => !s.isStarred);

  return (
    <Card className="bg-slate-900/95 border-slate-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-400 text-sm flex items-center gap-2">
            <History className="w-4 h-4" />
            Session History
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={saveCurrentSession}
            className="h-6 px-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600"
          >
            <Save className="w-3 h-3 mr-1" />
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 px-4 pb-4">
          <div className="space-y-3">
            
            {/* Starred Sessions */}
            {starredSessions.length > 0 && (
              <div>
                <div className="text-xs text-yellow-400 font-medium mb-2 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Starred
                </div>
                <div className="space-y-2">
                  {starredSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-2 rounded border border-slate-600/50 bg-slate-800/30 hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-white text-xs font-medium">
                          {session.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleStar(session.id)}
                            className="text-yellow-400 hover:text-yellow-300"
                          >
                            <Star className="w-3 h-3 fill-current" />
                          </button>
                          <button
                            onClick={() => deleteSession(session.id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs text-cyan-300 border-cyan-500/30">
                          {session.config.mode}
                        </Badge>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(session.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                          Q:{session.config.quality}% I:{session.config.intensity}% P:{session.config.particleCount.toLocaleString()}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleRestore(session)}
                          className="h-5 px-2 text-xs bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Sessions */}
            {recentSessions.length > 0 && (
              <div>
                <div className="text-xs text-gray-400 font-medium mb-2">Recent</div>
                <div className="space-y-2">
                  {recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-2 rounded border border-slate-600/50 bg-slate-800/30 hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-white text-xs font-medium">
                          {session.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleStar(session.id)}
                            className="text-gray-400 hover:text-yellow-400"
                          >
                            <StarOff className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteSession(session.id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs text-cyan-300 border-cyan-500/30">
                          {session.config.mode}
                        </Badge>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(session.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                          Q:{session.config.quality}% I:{session.config.intensity}% P:{session.config.particleCount.toLocaleString()}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleRestore(session)}
                          className="h-5 px-2 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sessions.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No saved sessions yet</p>
                <p className="text-xs">Create and save configurations to see them here</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};