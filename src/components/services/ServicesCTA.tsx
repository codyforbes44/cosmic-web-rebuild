
import React, { useState } from 'react';
import ScrollToTopLink from '../ScrollToTopLink';
import { Button } from '@/components/ui/button';
import ConsultationModal from '@/components/common/ConsultationModal';

const ServicesCTA: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-gray-800 rounded-xl p-8 md:p-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
        <p className="text-gray-300 mb-8">
          Schedule a free consultation with our team to discuss how our services can help you achieve your business goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ScrollToTopLink to="/get-quote">
            <Button className="bg-accent hover:bg-accent/80 text-white px-6 py-3">
              Get Started
            </Button>
          </ScrollToTopLink>
          <Button 
            variant="outline" 
            className="border-white/20 hover:bg-white/5"
            onClick={() => setModalOpen(true)}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
      <ConsultationModal isOpen={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default ServicesCTA;
