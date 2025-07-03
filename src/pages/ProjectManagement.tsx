
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';
import ProjectManagementContent from '@/components/projects/ProjectManagementContent';

const ProjectManagement = () => {
  return (
    <>
      <SEO
        title="Project Management Solutions"
        description="Manage your projects efficiently with advanced task tracking, team collaboration tools, and comprehensive project planning features."
        keywords="project management, task tracking, team collaboration, project planning, productivity tools"
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&crop=center"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <ProjectManagementContent />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectManagement;
