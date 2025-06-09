
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ProjectDialog from './ProjectDialog';
import { Project } from './types';

const ProjectManagementContent = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'active',
      priority: 'high',
      dueDate: '2024-03-15',
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      progress: 65,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Develop a cross-platform mobile application for iOS and Android',
      status: 'planning',
      priority: 'medium',
      dueDate: '2024-05-30',
      team: ['Sarah Wilson', 'Tom Brown'],
      progress: 25,
      createdAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'Database Migration',
      description: 'Migrate legacy database to new cloud infrastructure',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-02-28',
      team: ['Alex Chen', 'Maria Garcia'],
      progress: 100,
      createdAt: '2024-01-10'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects([newProject, ...projects]);
    setIsDialogOpen(false);
  };

  const handleEditProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...projectData, id: editingProject.id, createdAt: editingProject.createdAt }
          : p
      ));
      setEditingProject(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'on-hold': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Project Management</h1>
          <p className="text-gray-300 mt-2">
            Manage your projects, track progress, and collaborate with your team
          </p>
        </div>
        <Button 
          onClick={() => {
            setEditingProject(null);
            setIsDialogOpen(true);
          }}
          className="bg-accent hover:bg-accent/80 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-space-deep-blue border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status}
                    </Badge>
                    <Badge className={`${getPriorityColor(project.priority)} text-white`}>
                      {project.priority}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-space-deep-blue border-gray-700">
                    <DropdownMenuItem 
                      onClick={() => {
                        setEditingProject(project);
                        setIsDialogOpen(true);
                      }}
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-gray-300">
                {project.description}
              </CardDescription>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  {project.team.length} team member(s)
                </div>
              </div>

              {/* Team Members */}
              <div className="flex flex-wrap gap-1">
                {project.team.slice(0, 3).map((member, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                    {member}
                  </Badge>
                ))}
                {project.team.length > 3 && (
                  <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                    +{project.team.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="text-gray-400 text-lg">No projects found</div>
            <p className="text-gray-500">Create your first project to get started</p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-accent hover:bg-accent/80 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        </div>
      )}

      {/* Project Dialog */}
      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={editingProject ? handleEditProject : handleAddProject}
        project={editingProject}
      />
    </div>
  );
};

export default ProjectManagementContent;
