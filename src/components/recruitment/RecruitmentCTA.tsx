
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ConsultationModal from '@/components/common/ConsultationModal';

interface RecruitmentCTAProps {
  serviceColor: string;
}

const RecruitmentCTA = ({ serviceColor }: RecruitmentCTAProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="mt-20">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 rounded-2xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Solve Your Recruitment Challenges?
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Schedule a free consultation with our recruitment marketing specialists to discuss your hiring needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/get-quote">
              <Button 
                size="lg"
                style={{ backgroundColor: serviceColor }}
                className="text-white hover:opacity-90"
              >
                Get a Quote
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setModalOpen(true)}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
      <ConsultationModal isOpen={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default RecruitmentCTA;
