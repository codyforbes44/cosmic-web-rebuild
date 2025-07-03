
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
        title="Project Management - ZepTech"
        description="Manage your projects, track progress, and collaborate with your team efficiently."
        keywords="project management, task tracking, team collaboration, project planning"
        image="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630&fit=crop&crop=center"
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
