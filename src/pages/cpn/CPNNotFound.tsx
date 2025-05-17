
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const CPNNotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Carrier Partner Network</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4 text-gradient bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-6 text-white">Page Not Found</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-purple-500 text-purple-400 hover:bg-purple-900/30"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CPNNotFound;
