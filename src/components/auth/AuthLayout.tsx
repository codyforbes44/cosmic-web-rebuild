
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ScrollToTopLink from '@/components/ScrollToTopLink';
import StarBackground from '@/components/StarBackground';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children
}) => {
  return (
    <div className="min-h-screen bg-space-dark-blue flex items-center justify-center p-4 relative">
      <StarBackground />
      
      <div className="w-full max-w-md relative z-10">
        <div className="mb-6">
          <ScrollToTopLink 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </ScrollToTopLink>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
