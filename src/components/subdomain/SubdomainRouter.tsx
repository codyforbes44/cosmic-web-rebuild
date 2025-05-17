
import React from 'react';
import { getSubdomain } from '@/lib/subdomain';
import CPNApp from '@/pages/cpn/CPNApp';

/**
 * Determines which app to render based on the subdomain
 */
const SubdomainRouter: React.FC = () => {
  const subdomain = getSubdomain();
  
  // Route to different applications based on subdomain
  switch (subdomain) {
    case 'cpn':
      return <CPNApp />;
    default:
      return null; // Return null to allow the main app to render
  }
};

export default SubdomainRouter;
