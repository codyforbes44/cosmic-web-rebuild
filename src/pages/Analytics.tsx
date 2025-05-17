
import React, { useEffect } from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import AuthRequired from '@/components/AuthRequired';

// Import our component structure
import AnalyticsLoadingState from '@/components/analytics/AnalyticsLoadingState';
import AnalyticsErrorState from '@/components/analytics/AnalyticsErrorState';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsSummaryCards from '@/components/analytics/AnalyticsSummaryCards';
import AnalyticsTabs from '@/components/analytics/AnalyticsTabs';

const Analytics = () => {
  const { user } = useAuth();
  const { visitorData, formData, chatData, loading, error, refetch } = useAnalytics();
  
  // Remove any auto-refresh behavior to prevent loops
  
  if (loading) {
    return <AnalyticsLoadingState />;
  }

  if (error) {
    return <AnalyticsErrorState error={error} />;
  }
  
  return (
    <AuthRequired>
      <SEO 
        title="Analytics Dashboard" 
        description="View website analytics and visitor data."
      />
      <StarBackground />
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <AnalyticsHeader />
              <Button 
                onClick={() => refetch()} 
                variant="outline" 
                className="flex items-center gap-2 border-gray-700 text-white hover:bg-gray-800"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh All Data
              </Button>
            </div>
            
            <div className="mb-6 bg-gray-800/50 border border-gray-700 rounded-md p-4 text-white">
              <p className="font-medium">Welcome, {user?.email}</p>
              <p className="text-sm text-gray-400 mt-1">
                Viewing data from all Supabase tables including visitor tracking, form submissions, 
                chat interactions, contacts, newsletters and quotes
              </p>
            </div>
            
            <AnalyticsSummaryCards 
              visitorData={visitorData} 
              formData={formData} 
              chatData={chatData} 
            />
            <AnalyticsTabs 
              visitorData={visitorData} 
              formData={formData} 
              chatData={chatData} 
              refetch={refetch}
            />
          </div>
        </div>
      </main>
      <Footer />
    </AuthRequired>
  );
};

export default Analytics;
