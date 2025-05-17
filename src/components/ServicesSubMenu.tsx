
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const serviceCategories = [
  {
    title: "Strategic Consulting",
    description: "Technology strategy development and roadmap planning aligned with business objectives.",
    href: "/services?service=strategy",
    color: "#7C3AED"
  },
  {
    title: "Digital Transformation",
    description: "End-to-end digital transformation services to modernize legacy systems.",
    href: "/services?service=digital",
    color: "#2563EB"
  },
  {
    title: "Custom Software",
    description: "Tailored software solutions designed for your unique business challenges.",
    href: "/services?service=custom",
    color: "#E11D48"
  },
  {
    title: "Web & Mobile Apps",
    description: "Responsive, user-friendly applications for web and mobile platforms.",
    href: "/services?service=web",
    color: "#F59E0B"
  },
  {
    title: "Data Analytics",
    description: "Transform your data into actionable insights with advanced analytics.",
    href: "/services?service=analytics",
    color: "#059669"
  },
  {
    title: "AI & Machine Learning",
    description: "Leverage artificial intelligence to optimize operations and gain competitive advantages.",
    href: "/services?service=ai",
    color: "#8B5CF6"
  }
];

const ServicesSubMenu = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeService = searchParams.get('service') || 'strategy';

  return (
    <div className="w-full flex justify-center py-4 bg-gray-800/50 border-b border-gray-700">
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap justify-center">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 border border-gray-700">
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {serviceCategories.map((service) => (
                  <li key={service.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={service.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          activeService === service.href.split('=')[1]
                            ? "bg-gray-700"
                            : "hover:bg-gray-700 focus:bg-gray-700"
                        )}
                      >
                        <div className="text-sm font-medium leading-none" style={{ color: service.color }}>
                          {service.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                          {service.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {/* Direct access to services */}
          {serviceCategories.map((service) => (
            <NavigationMenuItem key={`direct-${service.href}`}>
              <Link 
                to={service.href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-sm px-3",
                  activeService === service.href.split('=')[1] 
                    ? "bg-gray-700 text-white" 
                    : "text-gray-300"
                )}
                style={activeService === service.href.split('=')[1] ? { borderBottom: `2px solid ${service.color}` } : {}}
              >
                {service.title.split(' ')[0]}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default ServicesSubMenu;
