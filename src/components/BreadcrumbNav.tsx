
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  currentPageLabel?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  items = [], 
  currentPageLabel 
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  // Determine current page name from the URL if not provided
  const pageName = currentPageLabel || pathname.split('/').pop() || '';
  
  // Convert first letter to uppercase and remove hyphens for display
  const formatPageName = (name: string) => {
    if (!name) return '';
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const displayPageName = currentPageLabel || formatPageName(pageName);

  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center">
                <HomeIcon className="h-4 w-4 mr-1" />
                <span>Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {/* Custom breadcrumb items */}
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.path ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <span>{item.label}</span>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
          
          {/* Current page */}
          {displayPageName && (
            <React.Fragment>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{displayPageName}</BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
