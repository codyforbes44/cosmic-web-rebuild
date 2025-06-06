
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

/**
 * Enhanced Link component that scrolls to the top of the page when clicked
 */
const ScrollToTopLink: React.FC<LinkProps> = ({ to, children, ...props }) => {
  // Create the URL with #top appended, preserving query parameters
  const createTopLink = (destination: LinkProps['to']) => {
    if (typeof destination === 'string') {
      // For string destinations, check if it already has a hash
      const hasHash = destination.includes('#');
      return hasHash ? destination : `${destination}#top`;
    } else if (typeof destination === 'object' && destination !== null) {
      // For object destinations, safely set the hash property
      return {
        ...destination,
        hash: destination.hash || 'top'
      };
    }
    // For function destinations (or any other type), return as is
    return destination;
  };

  return (
    <Link to={createTopLink(to)} {...props}>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;
