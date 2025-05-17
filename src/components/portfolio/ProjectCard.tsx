
import React from "react";

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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div 
      className="space-card overflow-hidden rounded-xl cursor-pointer hover:scale-[1.02] transition-all duration-300"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <span className="text-xs font-medium text-accent">{project.industry}</span>
        <h3 className="text-xl font-bold my-2 text-white">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4">Client: {project.client}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
