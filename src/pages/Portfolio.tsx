import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Enterprise Resource Planning System",
    client: "Global Manufacturing Inc.",
    industry: "Manufacturing",
    description: "Designed and implemented a comprehensive ERP system to streamline operations across 12 manufacturing facilities, resulting in a 35% increase in productivity.",
    image: "https://images.unsplash.com/photo-1664575599736-c5197c684128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    category: "enterprise"
  },
  {
    id: 2,
    title: "Healthcare Patient Management Platform",
    client: "Regional Medical Center",
    industry: "Healthcare",
    description: "Built a secure, HIPAA-compliant patient management system with telemedicine capabilities, electronic health records, and automated billing integration.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Angular", "Python", "MongoDB", "AWS"],
    category: "healthcare"
  },
  {
    id: 3,
    title: "Retail E-commerce Platform",
    client: "Fashion Retailer",
    industry: "Retail",
    description: "Developed a scalable e-commerce platform with personalized recommendations, inventory management, and omnichannel capabilities.",
    image: "https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Next.js", "GraphQL", "Stripe", "Vercel"],
    category: "ecommerce"
  },
  {
    id: 4,
    title: "Financial Analytics Dashboard",
    client: "Investment Firm",
    industry: "Finance",
    description: "Created a real-time financial analytics dashboard with predictive modeling, risk assessment, and portfolio management tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Vue.js", "D3.js", "Python", "TensorFlow"],
    category: "analytics"
  },
  {
    id: 5,
    title: "Supply Chain Management System",
    client: "Logistics Company",
    industry: "Logistics",
    description: "Engineered an end-to-end supply chain management system with route optimization, inventory tracking, and predictive maintenance.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Node.js", "Redis", "Google Maps API"],
    category: "logistics"
  },
  {
    id: 6,
    title: "Mobile Banking Application",
    client: "National Bank",
    industry: "Finance",
    description: "Built a secure mobile banking application with biometric authentication, transaction monitoring, and investment services.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React Native", "Spring Boot", "AWS", "OAuth"],
    category: "finance"
  }
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "enterprise", name: "Enterprise" },
  { id: "healthcare", name: "Healthcare" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "finance", name: "Finance" },
  { id: "logistics", name: "Logistics" }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mt-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Portfolio
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Explore our successful projects and see how we've helped businesses transform and grow
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-accent text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="space-card overflow-hidden rounded-xl cursor-pointer hover:scale-[1.02] transition-all duration-300"
                onClick={() => handleProjectClick(project)}
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
            ))}
          </div>

          {/* Project details modal - showing project details but removing case study navigation */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
              <div className="bg-space-deep-blue max-w-4xl w-full rounded-xl overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-sm font-medium text-accent">{selectedProject.industry}</span>
                      <h2 className="text-2xl md:text-3xl font-bold my-2 text-white">{selectedProject.title}</h2>
                      <p className="text-gray-400 text-sm">Client: {selectedProject.client}</p>
                    </div>
                    <button 
                      onClick={handleCloseDetails}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-gray-300 my-6">{selectedProject.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Technologies Used:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" onClick={handleCloseDetails}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
