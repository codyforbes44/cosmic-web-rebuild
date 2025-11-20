
import React from 'react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import ProjectManagementContent from '@/components/projects/ProjectManagementContent';
import { FolderKanban } from 'lucide-react';

const ProjectManagement = () => {
  return (
    <StandardPageLayout
      seo={{
        title: "Project Management - ZepTech",
        description: "Manage your projects, track progress, and collaborate with your team efficiently.",
        keywords: "project management, task tracking, team collaboration, project planning",
        image: "/og-images/project-management.png"
      }}
      breadcrumb={{ label: "Project Management" }}
      header={{
        title: "Project Management",
        description: "Manage your projects, track progress, and collaborate with your team efficiently",
        icon: FolderKanban
      }}
      className="min-h-screen pt-20 pb-24"
    >
      <ProjectManagementContent />
    </StandardPageLayout>
  );
};

export default ProjectManagement;
