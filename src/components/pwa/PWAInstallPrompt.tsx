import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share, X, Smartphone, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/hooks/usePWAInstall';

/**
 * PWAInstallPrompt - Mobile-first install banner
 * 
 * Features:
 * - Platform-specific instructions (iOS vs Android)
 * - Animated entrance/exit
 * - Dismissible with session persistence
 * - Touch-optimized (44px+ touch targets)
 */
export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isIOS, install, dismiss } = usePWAInstall();

  if (!isInstallable) return null;

  const handleInstall = async () => {
    const success = await install();
    if (!success && !isIOS) {
      // If install failed and not iOS, just dismiss
      dismiss();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-area-inset-bottom"
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Install ƷBI App</h3>
                <p className="text-sm text-muted-foreground">Get the best experience</p>
              </div>
            </div>
            <button
              onClick={dismiss}
              className="p-2 hover:bg-accent rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Dismiss install prompt"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {isIOS ? (
              // iOS-specific instructions
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Install this app on your iPhone for quick access and offline use:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Tap the</span>
                      <Share className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">Share</span>
                      <span className="text-sm">button</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Select</span>
                      <Plus className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">"Add to Home Screen"</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={dismiss}
                  variant="outline"
                  className="w-full min-h-[44px]"
                >
                  Got it
                </Button>
              </div>
            ) : (
              // Android/Chrome install button
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Install our app for quick access, offline support, and a native app experience.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Works offline
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Fast loading
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Home screen access
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button
                    onClick={dismiss}
                    variant="outline"
                    className="flex-1 min-h-[44px]"
                  >
                    Not now
                  </Button>
                  <Button
                    onClick={handleInstall}
                    className="flex-1 min-h-[44px] gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Install
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
