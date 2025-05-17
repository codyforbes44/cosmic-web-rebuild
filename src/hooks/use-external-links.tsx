
import { useEffect } from 'react';

/**
 * A custom hook to make all external links open in a new tab
 * This adds target="_blank" and rel="noopener noreferrer" attributes to all external links
 */
export const useExternalLinks = () => {
  useEffect(() => {
    // Function to process all links in the document
    const processExternalLinks = () => {
      const allLinks = document.querySelectorAll('a');
      
      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip if no href or if it's already been processed
        if (!href) return;
        
        // Check if it's an external link (starts with http or https and not pointing to the current domain)
        if ((href.startsWith('http') || href.startsWith('https')) && 
            !href.includes(window.location.hostname)) {
          
          // Skip if already has target="_blank"
          if (link.getAttribute('target') !== '_blank') {
            link.setAttribute('target', '_blank');
          }
          
          // Add rel="noopener noreferrer" for security if not already present
          const rel = link.getAttribute('rel');
          if (!rel || (!rel.includes('noopener') && !rel.includes('noreferrer'))) {
            link.setAttribute('rel', rel ? `${rel} noopener noreferrer` : 'noopener noreferrer');
          }
        }
      });
    };

    // Process links on initial load
    processExternalLinks();
    
    // Use MutationObserver to watch for newly added links
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          processExternalLinks();
        }
      });
    });
    
    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Clean up the observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);
};

export default useExternalLinks;
