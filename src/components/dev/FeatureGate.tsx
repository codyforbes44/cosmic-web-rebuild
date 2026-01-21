import React from 'react';
import { isFeatureEnabled } from '@/config/environment';
import type { FeatureFlags } from '@/config/environment';

interface FeatureGateProps {
  feature: keyof FeatureFlags;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * FeatureGate - Conditionally render content based on feature flags
 * 
 * Usage:
 * <FeatureGate feature="showComponentCatalog">
 *   <ComponentCatalogRoute />
 * </FeatureGate>
 */
export const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  children, 
  fallback = null 
}) => {
  if (isFeatureEnabled(feature)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

/**
 * withFeatureGate - HOC version of FeatureGate
 * 
 * Usage:
 * const ProtectedComponent = withFeatureGate('showDevTools')(MyComponent);
 */
export function withFeatureGate<P extends object>(
  feature: keyof FeatureFlags,
  FallbackComponent?: React.ComponentType<P>
) {
  return function (WrappedComponent: React.ComponentType<P>) {
    const WithFeatureGate: React.FC<P> = (props) => {
      if (isFeatureEnabled(feature)) {
        return <WrappedComponent {...props} />;
      }
      
      if (FallbackComponent) {
        return <FallbackComponent {...props} />;
      }
      
      return null;
    };

    WithFeatureGate.displayName = `withFeatureGate(${WrappedComponent.displayName || WrappedComponent.name})`;
    
    return WithFeatureGate;
  };
}

export default FeatureGate;
