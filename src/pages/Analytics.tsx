
import React from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { RefreshCw, ShieldAlert } from 'lucide-react';
import AuthRequired from '@/components/AuthRequired';
import { toast } from '@/components/ui/use-toast';

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
  
  const handleRefresh = async () => {
    try {
      toast({
        title: "Refreshing data",
        description: "Fetching latest analytics data from Supabase...",
        variant: "default"
      });
      await refetch();
    } catch (err) {
      console.error('Error refreshing analytics data:', err);
    }
  };
  
  if (loading) {
    return <AnalyticsLoadingState />;
  }

  if (error) {
    // Check if the error is related to RLS permissions
    const isPermissionError = error.includes('permission') || error.includes('access') || error.includes('policy');
    
    if (isPermissionError) {
      return (
        <>
          <SEO 
            title="Analytics Dashboard" 
            description="View website analytics and visitor data."
          />
          <div id="top"></div>
          <StarBackground />
          <Navbar />
          <main className="relative min-h-screen pt-20 pb-24 flex items-center justify-center z-10">
            <div className="text-center max-w-3xl mx-auto px-4">
              <ShieldAlert className="h-16 w-16 text-amber-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Admin Access Required</h2>
              <p className="text-gray-300 mb-6">
                You don't have sufficient permissions to view analytics data. 
                This dashboard requires admin privileges.
              </p>
              <div className="text-sm text-gray-400 bg-gray-800/50 p-4 rounded-md border border-gray-700 mb-6">
                <p>Note to developers: The Supabase RLS policies for analytics tables require the JWT token to have an 'admin_access' claim.</p>
              </div>
            </div>
          </main>
          <Footer />
        </>
      );
    }
    
    return <AnalyticsErrorState error={error} />;
  }
  
  // If we have no data across all tables but no error, it's likely an RLS policy issue
  if (visitorData.length === 0 && formData.length === 0 && chatData.length === 0) {
    return (
      <>
        <SEO 
          title="Analytics Dashboard" 
          description="View website analytics and visitor data."
        />
        <div id="top"></div>
        <StarBackground />
        <Navbar />
        <main className="relative min-h-screen pt-20 pb-24 z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <AnalyticsHeader />
                <Button 
                  onClick={handleRefresh} 
                  variant="outline" 
                  className="flex items-center gap-2 border-gray-700 text-white hover:bg-gray-800"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh All Data
                </Button>
              </div>
              
              <div className="mb-6 bg-amber-900/30 border border-amber-700 rounded-md p-4 text-white">
                <h3 className="font-medium flex items-center">
                  <ShieldAlert className="h-5 w-5 text-amber-500 mr-2" />
                  No data available
                </h3>
                <p className="text-sm text-amber-200 mt-1">
                  This may be due to Row Level Security (RLS) policies on the Supabase tables. 
                  You need admin access to view analytics data.
                </p>
              </div>
              
              <div className="text-center py-10">
                <p className="text-gray-400">
                  No analytics data is available to display. If you believe this is an error,
                  please check your access permissions or contact the system administrator.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <AuthRequired>
      <SEO 
        title="Analytics Dashboard" 
        description="View website analytics and visitor data."
      />
      <div id="top"></div>
      <StarBackground />
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <AnalyticsHeader />
              <Button 
                onClick={handleRefresh} 
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
