
import React from "react";
import { Button } from "@/components/ui/button";

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

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-space-deep-blue max-w-4xl w-full rounded-xl overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-sm font-medium text-accent">{project.industry}</span>
              <h2 className="text-2xl md:text-3xl font-bold my-2 text-white">{project.title}</h2>
              <p className="text-gray-400 text-sm">Client: {project.client}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-300 my-6">{project.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
