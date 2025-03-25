import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmitProject = () => {
    window.open(
      'https://x.com/boltdotnew/status/1902102762151875053',
      '_blank',
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-black/70 backdrop-blur-lg border-b border-white/10 shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <Link to='/' className='flex items-center'>
            <h1 className='text-xl font-medium tracking-tight'>
              <span className='font-glitch font-normal'>#hackathon.dev</span>
              <span> concepts</span>
            </h1>
          </Link>
          <div className='hidden md:flex items-center space-x-6'>
            <Button
              variant='ghost'
              className='border border-white/20 hover:bg-white/10 transition-all'
              onClick={handleSubmitProject}
            >
              Submit Project
            </Button>
          </div>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Menu'
          >
            <svg
              width='18'
              height='12'
              viewBox='0 0 18 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1H17M1 6H17M1 11H17'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </Button>
        </div>
      </nav>

      {showScrollTop && (
        <Button
          variant='outline'
          size='icon'
          className='fixed bottom-6 right-6 z-50 rounded-full p-2 bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in'
          onClick={scrollToTop}
          aria-label='Scroll to top'
        >
          <ChevronUp className='h-5 w-5' />
        </Button>
      )}
    </>
  );
};

export default Navbar;
