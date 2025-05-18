
import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw, Database } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AnalyticsLoadingState: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Simple query to check if we can connect to Supabase
        const { data, error } = await supabase
          .from('visitor_tracking')
          .select('id')
          .limit(1)
          .maybeSingle();
        
        if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus('error');
          setErrorMessage(error.message || 'Could not connect to database. Please try again.');
        } else {
          setConnectionStatus('connected');
          setErrorMessage(null);
        }
      } catch (err: any) {
        console.error('Unexpected error checking connection:', err);
        setConnectionStatus('error');
        setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
      }
    };

    checkConnection();
  }, [retryCount]);

  const handleRetry = () => {
    setConnectionStatus('checking');
    setErrorMessage(null);
    setRetryCount(prevCount => prevCount + 1);
  };

  return (
    <>
      <SEO 
        title="Analytics Dashboard" 
        description="View website analytics and visitor data."
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24 flex items-center justify-center">
        <div className="text-center max-w-md w-full bg-gray-800/60 p-8 rounded-lg border border-gray-700">
          {connectionStatus === 'checking' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Connecting to Analytics...</h2>
              <p className="text-gray-300 mb-4">Establishing secure connection to the database</p>
            </>
          )}

          {connectionStatus === 'connected' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Loading analytics data...</h2>
              <p className="text-gray-300">Please wait while we retrieve your analytics information</p>
            </>
          )}

          {connectionStatus === 'error' && (
            <>
              <Database className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
              <p className="text-red-400 mb-6">{errorMessage || 'Could not connect to the analytics database.'}</p>
              <Button onClick={handleRetry} className="flex items-center gap-2 mx-auto">
                <RefreshCw className="h-4 w-4" />
                Retry Connection
              </Button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AnalyticsLoadingState;
