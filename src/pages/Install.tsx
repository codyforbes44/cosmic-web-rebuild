import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share, Plus, Check, Smartphone, Zap, Wifi, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

/**
 * Install Page - Dedicated page for PWA installation
 * 
 * Features:
 * - Platform-specific installation instructions
 * - Visual guide for iOS users
 * - Direct install trigger for Android/Chrome
 * - Benefits showcase
 */
const Install: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isStandalone, install } = usePWAInstall();

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Loads instantly, even on slow networks'
    },
    {
      icon: Wifi,
      title: 'Works Offline',
      description: 'Access key features without internet'
    },
    {
      icon: Home,
      title: 'Home Screen Access',
      description: 'Launch directly from your device'
    },
    {
      icon: Smartphone,
      title: 'Native Experience',
      description: 'Feels like a real mobile app'
    }
  ];

  return (
    <>
      <SEO 
        title="Install ƷBI App | Get the Mobile Experience"
        description="Install the ƷBI app on your device for quick access, offline support, and a native mobile experience."
      />
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              <Smartphone className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Install ƷBI App
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant access to ƷBI right from your home screen. 
              No app store required – install directly from your browser.
            </p>
          </motion.div>

          {/* Installation Status */}
          {isInstalled || isStandalone ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                App Installed!
              </h2>
              <p className="text-muted-foreground">
                You're already using the ƷBI app. Enjoy the full experience!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12"
            >
              {isIOS ? (
                // iOS Installation Instructions
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground text-center">
                    Install on iPhone/iPad
                  </h2>
                  <p className="text-muted-foreground text-center">
                    Follow these simple steps to add ƷBI to your home screen:
                  </p>
                  
                  <div className="space-y-4 max-w-md mx-auto">
                    {/* Step 1 */}
                    <div className="flex items-start gap-4 p-4 bg-accent/50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary-foreground">1</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">Tap the Share button</span>
                          <Share className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Located at the bottom of Safari (or top on iPad)
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-4 p-4 bg-accent/50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary-foreground">2</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">Select "Add to Home Screen"</span>
                          <Plus className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Scroll down in the share menu if needed
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-4 p-4 bg-accent/50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary-foreground">3</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">Tap "Add"</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          The app will appear on your home screen
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isInstallable ? (
                // Android/Chrome Direct Install
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Install with One Tap
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Add ƷBI to your home screen for instant access anytime.
                  </p>
                  <Button
                    onClick={install}
                    size="lg"
                    className="min-h-[52px] px-8 gap-2 text-lg"
                  >
                    <Download className="w-5 h-5" />
                    Install App
                  </Button>
                </div>
              ) : (
                // Browser doesn't support PWA install
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    Installation Not Available
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Your browser doesn't support app installation. Try opening this page in Chrome, Safari, or Edge.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Why Install?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Install;
