import React from 'react';
import { Users, Wifi, WifiOff, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { useUserPresence, UserPresence } from '@/hooks/use-realtime';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

interface UserPresenceIndicatorProps {
  userId?: string;
  username?: string;
  showPopover?: boolean;
  className?: string;
}

export const UserPresenceIndicator: React.FC<UserPresenceIndicatorProps> = ({
  userId,
  username,
  showPopover = true,
  className
}) => {
  const { onlineUsers, onlineCount, updateStatus } = useUserPresence(userId, username);

  const getStatusColor = (status: UserPresence['status']) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      case 'busy':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const getStatusIcon = (status: UserPresence['status']) => {
    switch (status) {
      case 'online':
        return <Wifi className="h-3 w-3" />;
      case 'offline':
        return <WifiOff className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours > 0) {
      return `${diffInHours}h ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Users className="h-5 w-5 text-muted-foreground" />
        {onlineCount > 0 && (
          <div className={cn(
            "absolute -top-1 -right-1 h-3 w-3 rounded-full",
            getStatusColor('online')
          )} />
        )}
      </div>
      
      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">{onlineCount}</span>
        {onlineCount > 0 && (
          <Badge variant="success" size="sm" className="h-4 px-1.5 text-xs">
            online
          </Badge>
        )}
      </div>
    </div>
  );

  if (!showPopover) {
    return content;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={cn("flex items-center gap-2 hover:bg-muted/50 p-2 rounded-md transition-colors", className)}>
          {content}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold">Users Online ({onlineCount})</h3>
        </div>

        <ScrollArea className="h-60">
          {onlineUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <WifiOff className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No users online</p>
            </div>
          ) : (
            <div className="space-y-1">
              {onlineUsers.map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium text-accent-foreground">
                          {(user.username || user.userId).charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                        getStatusColor(user.status)
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {user.username || user.userId}
                      </p>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(user.status)}
                        <Badge
                          variant={user.status === 'online' ? 'success' : 'secondary'}
                          size="sm"
                          className="text-xs capitalize"
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      {user.currentPage && (
                        <p className="text-xs text-muted-foreground truncate">
                          {user.currentPage}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatLastSeen(user.lastSeen)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {userId && (
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              {['online', 'away', 'busy'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status as UserPresence['status'])}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                    "hover:bg-muted",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  )}
                >
                  <div className={cn("h-2 w-2 rounded-full", getStatusColor(status as UserPresence['status']))} />
                  <span className="capitalize">{status}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};