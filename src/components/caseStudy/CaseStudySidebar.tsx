
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import ConsultationModal from '@/components/common/ConsultationModal';

interface CaseStudySidebarProps {
  client: string;
  industry: string;
  date: string;
  technologies: string[];
}

const CaseStudySidebar: React.FC<CaseStudySidebarProps> = ({
  client,
  industry,
  date,
  technologies
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="lg:col-span-1">
      {/* Project Details */}
      <div className="space-card p-6 rounded-xl mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Client</p>
            <p className="text-white">{client}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Industry</p>
            <p className="text-white">{industry}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Date</p>
            <p className="text-white">{date}</p>
          </div>
        </div>
      </div>
      
      {/* Technologies Used */}
      <div className="space-card p-6 rounded-xl mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <div className="space-card p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-2">Interested in Similar Results?</h3>
        <p className="text-gray-300 mb-4">
          Let's discuss how we can help your business achieve similar success.
        </p>
        <Button 
          className="w-full bg-accent hover:bg-accent/80 text-white"
          onClick={() => setModalOpen(true)}
        >
          Get a Free Consultation
          <ChevronRight size={16} />
        </Button>
      </div>
      
      <ConsultationModal isOpen={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default CaseStudySidebar;
