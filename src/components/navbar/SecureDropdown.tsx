
import React from 'react';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { secureNavLinks } from './constants';
import { Shield, Settings, BarChart, FolderOpen, Cloud, Calculator, Brain, Stethoscope, Wrench } from 'lucide-react';

interface SecureDropdownProps {
  isActive: boolean;
}

const getIconForPage = (path: string) => {
  switch (path) {
    case '/admin':
      return <Settings className="w-4 h-4" />;
    case '/analytics':
      return <BarChart className="w-4 h-4" />;
    case '/projects':
      return <FolderOpen className="w-4 h-4" />;
    case '/weather':
      return <Cloud className="w-4 h-4" />;
    case '/calculator':
      return <Calculator className="w-4 h-4" />;
    case '/openai':
    case '/huggingface':
      return <Brain className="w-4 h-4" />;
    case '/medical-diagnosis':
      return <Stethoscope className="w-4 h-4" />;
    case '/features':
      return <Wrench className="w-4 h-4" />;
    default:
      return <Shield className="w-4 h-4" />;
  }
};

const SecureDropdown: React.FC<SecureDropdownProps> = ({ isActive }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={`text-white hover:text-accent transition-colors duration-200 ${
              isActive ? 'text-accent' : ''
            }`}
          >
            <Shield className="w-4 h-4 mr-2" />
            Secure Pages
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-[400px] p-4 bg-space-deep-blue border-gray-700"
            >
              <div className="grid grid-cols-1 gap-2">
                {secureNavLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <div className="text-accent group-hover:text-accent-hover transition-colors">
                      {getIconForPage(link.path)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-accent transition-colors">
                        {link.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {link.path === '/admin' && 'Administrative dashboard and controls'}
                        {link.path === '/analytics' && 'Website analytics and visitor insights'}
                        {link.path === '/projects' && 'Project management and tracking'}
                        {link.path === '/weather' && 'Weather data and forecasts'}
                        {link.path === '/calculator' && 'Scientific calculator tool'}
                        {link.path === '/openai' && 'OpenAI-powered chat interface'}
                        {link.path === '/huggingface' && 'HuggingFace AI model playground'}
                        {link.path === '/medical-diagnosis' && 'AI-powered medical diagnosis tool'}
                        {link.path === '/features' && 'Platform features and capabilities'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SecureDropdown;
