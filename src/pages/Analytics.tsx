
import React from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import { useAnalytics } from '@/hooks/useAnalytics';

// Import our component structure
import AnalyticsLoadingState from '@/components/analytics/AnalyticsLoadingState';
import AnalyticsErrorState from '@/components/analytics/AnalyticsErrorState';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsSummaryCards from '@/components/analytics/AnalyticsSummaryCards';
import AnalyticsTabs from '@/components/analytics/AnalyticsTabs';

const Analytics = () => {
  const { visitorData, formData, loading, error } = useAnalytics();
  
  if (loading) {
    return <AnalyticsLoadingState />;
  }

  if (error) {
    return <AnalyticsErrorState error={error} />;
  }
  
  return (
    <>
      <SEO 
        title="Analytics Dashboard" 
        description="View website analytics and visitor data."
      />
      <StarBackground />
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <AnalyticsHeader />
            <AnalyticsSummaryCards visitorData={visitorData} formData={formData} />
            <AnalyticsTabs visitorData={visitorData} formData={formData} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analytics;
