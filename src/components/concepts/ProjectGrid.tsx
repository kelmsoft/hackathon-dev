
import { Project } from '@/hooks/use-projects-query';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  selectedCategory: string; // Keeping for TypeScript compatibility
  searchQuery: string; // Keeping for TypeScript compatibility
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl mx-auto px-4 sm:px-6'>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default ProjectGrid;
