
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  team: string[];
  progress: number;
  createdAt: string;
}
