
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFoundState: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="space-card p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Case Study Not Found</h2>
          <p className="text-gray-300 mb-6">We couldn't find the case study you're looking for.</p>
          <Button asChild>
            <Link to="/portfolio">
              <ArrowLeft className="mr-2" size={18} />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundState;
