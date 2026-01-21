import React, { ReactNode } from 'react';
import { useGeoBlock } from '@/context/GeoBlockContext';
import AccessDeniedPage from './AccessDeniedPage';
import { PageLoading } from '@/components/ui/UnifiedLoading';

interface GeoBlockWrapperProps {
  children: ReactNode;
}

const GeoBlockWrapper: React.FC<GeoBlockWrapperProps> = ({ children }) => {
  const { isLoading, isAllowed, country, countryCode, city } = useGeoBlock();

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <PageLoading message="Verifying access..." />
      </div>
    );
  }

  // Show access denied page if blocked
  if (!isAllowed) {
    return (
      <AccessDeniedPage 
        country={country} 
        countryCode={countryCode} 
        city={city} 
      />
    );
  }

  // Allow access
  return <>{children}</>;
};

export default GeoBlockWrapper;
