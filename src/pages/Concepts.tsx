import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/concepts/Navbar';
import FilterBar from '@/components/concepts/FilterBar';
import ProjectGrid from '@/components/concepts/ProjectGrid';
import { useProjectsQuery } from '@/hooks/use-projects-query';

const Concepts = () => {
  const { data: projects } = useProjectsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const handleSearchChange = (query: string) => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  const filteredProjects = projects?.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.author.toLowerCase().includes(searchLower) ||
      project.handle.toLowerCase().includes(searchLower) ||
      project.websiteUrl.toLowerCase().includes(searchLower)
    );
  });

  if (!filteredProjects) {
    return (
      <div className='fixed inset-0 bg-black flex items-center justify-center z-50'>
        <div className='flex flex-col items-center'>
          <div className='relative w-12 h-12'>
            <div className='absolute top-0 left-0 w-full h-full border-2 border-white/20 rounded-full'></div>
            <div className='absolute top-0 left-0 w-full h-full border-t-2 border-white rounded-full animate-spin'></div>
          </div>
          <p className='mt-4 text-white/60 text-sm font-medium'>
            Loading amazing concepts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white flex flex-col pt-24'>
      <Navbar />

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
      />

      <section id='projects' className='pb-12 flex-1 h-full'>
        <ProjectGrid
          projects={filteredProjects}
          selectedCategory=''
          searchQuery={searchQuery}
        />
      </section>

      <footer className='py-6 border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <p className='text-sm text-white/60'>
            made by{' '}
            <a
              href='https://twitter.com/kelmsoft'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white hover:text-blue-400 transition-colors font-glitch'
            >
              @kelmsoft
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Concepts;
