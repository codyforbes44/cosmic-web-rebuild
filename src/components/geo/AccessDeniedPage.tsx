import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, ShieldX, Mail, AlertTriangle } from 'lucide-react';
import StarBackground from '@/components/StarBackground';

interface AccessDeniedPageProps {
  country: string | null;
  countryCode: string | null;
  city: string | null;
}

const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({ country, countryCode, city }) => {
  const locationDisplay = [city, country].filter(Boolean).join(', ') || 'Unknown Location';

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <StarBackground />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-background/80 to-background pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center"
      >
        {/* Shield Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 border-2 border-destructive/30">
            <ShieldX className="w-12 h-12 text-destructive" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        >
          Access Restricted
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto"
        >
          This application is currently only available to visitors from North and South America.
        </motion.p>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-3 text-muted-foreground mb-4">
            <MapPin className="w-5 h-5 text-destructive" />
            <span className="text-sm uppercase tracking-wider font-medium">Your Detected Location</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            {locationDisplay}
            {countryCode && (
              <span className="ml-2 text-sm text-muted-foreground">({countryCode})</span>
            )}
          </p>
        </motion.div>

        {/* Allowed Regions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-3 text-accent mb-4">
            <Globe className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Allowed Regions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-md mx-auto">
            <div className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span className="text-muted-foreground">United States & Canada</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span className="text-muted-foreground">Mexico & Greenland</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span className="text-muted-foreground">Central America & Caribbean</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span className="text-muted-foreground">All South American Countries</span>
            </div>
          </div>
        </motion.div>

        {/* VPN Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-start gap-3 bg-muted/30 border border-muted rounded-lg p-4 mb-8 text-left"
        >
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Using a VPN?</strong> If you're located in an allowed region but using a VPN 
              that routes through a restricted country, please disconnect your VPN and refresh the page.
            </p>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-3">
            If you believe this is an error, please contact us:
          </p>
          <a 
            href="mailto:support@3bi.io?subject=Geo-Restriction Access Request"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
          >
            <Mail className="w-4 h-4" />
            support@3bi.io
          </a>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-xs text-muted-foreground"
        >
          © {new Date().getFullYear()} 3BI. Regional access restrictions apply.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AccessDeniedPage;
