import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Maximize, 
  Minimize, 
  Monitor
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FullScreenControlsProps {
  onFullScreenToggle: (isFullScreen: boolean) => void;
}

export const FullScreenControls: React.FC<FullScreenControlsProps> = ({
  onFullScreenToggle
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen = !!document.fullscreenElement;
      setIsFullScreen(isCurrentlyFullScreen);
      onFullScreenToggle(isCurrentlyFullScreen);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        exitFullScreen();
      }
      if (event.key === 'F11') {
        event.preventDefault();
        toggleFullScreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreen, onFullScreenToggle]);

  const enterFullScreen = async () => {
    try {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      }
      toast({
        title: "Entered Full Screen",
        description: "Press ESC or F11 to exit",
      });
    } catch (error) {
      toast({
        title: "Full Screen Failed",
        description: "Could not enter full screen mode",
        variant: "destructive"
      });
    }
  };

  const exitFullScreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
      toast({
        title: "Exited Full Screen",
        description: "Returned to windowed mode",
      });
    } catch (error) {
      toast({
        title: "Exit Failed",
        description: "Could not exit full screen mode",
        variant: "destructive"
      });
    }
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={toggleFullScreen}
        className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600"
      >
        {isFullScreen ? (
          <Minimize className="w-3 h-3 mr-2" />
        ) : (
          <Maximize className="w-3 h-3 mr-2" />
        )}
        {isFullScreen ? 'Exit' : 'Full Screen'}
      </Button>
      
      {isFullScreen && (
        <Badge variant="outline" className="text-xs text-green-300 border-green-500/30">
          <Monitor className="w-3 h-3 mr-1" />
          Full Screen Active
        </Badge>
      )}
      
      {isFullScreen && (
        <div className="text-xs text-gray-400 hidden md:block">
          Press <kbd className="px-1 py-0.5 bg-slate-700 rounded text-xs">ESC</kbd> or{' '}
          <kbd className="px-1 py-0.5 bg-slate-700 rounded text-xs">F11</kbd> to exit
        </div>
      )}
    </div>
  );
};