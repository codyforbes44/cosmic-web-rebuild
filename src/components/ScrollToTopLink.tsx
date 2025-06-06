
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

/**
 * Enhanced Link component that scrolls to the top of the page when clicked
 */
const ScrollToTopLink: React.FC<LinkProps> = ({ to, children, ...props }) => {
  // Create the URL with #top appended, preserving query parameters
  const createTopLink = (destination: string | { pathname: string; search?: string; hash?: string }) => {
    if (typeof destination === 'string') {
      // For string destinations, check if it already has a hash
      const hasHash = destination.includes('#');
      return hasHash ? destination : `${destination}#top`;
    } else {
      // For object destinations, set the hash property
      return {
        ...destination,
        hash: destination.hash || 'top'
      };
    }
  };

  return (
    <Link to={createTopLink(to)} {...props}>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;
