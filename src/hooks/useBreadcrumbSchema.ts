import { useLocation } from "react-router-dom";
import { useMemo } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

const routeNameMap: Record<string, string> = {
  "": "Home",
  "services": "Services",
  "about": "About Us",
  "contact": "Contact",
  "partners": "Partners",
  "demo": "Demo",
  "features": "Features",
  "faq": "FAQ",
  "news": "News",
  "gallery": "Gallery",
  "planets": "Solar System",
  "case-study": "Case Study",
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "accessibility": "Accessibility",
  "recruitment-marketing": "Recruitment Marketing",
  "social-media-management": "Social Media Management",
  "strategy-consulting": "Strategy Consulting",
};

export const useBreadcrumbSchema = (): BreadcrumbItem[] => {
  const location = useLocation();

  return useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const baseUrl = window.location.origin;
    
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Home", url: baseUrl }
    ];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = routeNameMap[segment] || segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      breadcrumbs.push({
        name,
        url: `${baseUrl}${currentPath}`
      });
    });

    return breadcrumbs;
  }, [location.pathname]);
};
