
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";

interface Project {
  id: number;
  title: string;
  client: string;
  industry: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
}

interface ProjectGridProps {
  projects: Project[];
  activeCategory: string;
}

const ProjectGrid = ({ projects, activeCategory }: ProjectGridProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={handleCloseDetails} 
        />
      )}
    </>
  );
};

export default ProjectGrid;
