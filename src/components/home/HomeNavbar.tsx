import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false); // Close mobile menu when clicking a link
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitProject = () => {
    window.open(
      'https://x.com/boltdotnew/status/1902102762151875053',
      '_blank',
    );
  };
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6',
        scrolled ? 'bg-hackathon-bg/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium text-hackathon-text group flex items-center"
        >
          <span className="relative overflow-hidden group-hover:text-hackathon-accent transition-colors duration-300">
            <span className="block font-glitch">HACKATHON.DEV</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-hackathon-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-hackathon-text hover:text-hackathon-accent transition-colors duration-300 underline-animation"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('prizes')}
            className="text-hackathon-text hover:text-hackathon-accent transition-colors duration-300 underline-animation"
          >
            Prizes
          </button>
          <button 
            onClick={() => scrollToSection('sponsors')}
            className="text-hackathon-text hover:text-hackathon-accent transition-colors duration-300 underline-animation"
          >
            Sponsors
          </button>
          <button 
            onClick={() => scrollToSection('judges')}
            className="text-hackathon-text hover:text-hackathon-accent transition-colors duration-300 underline-animation"
          >
            Judges
          </button>
          <a 
            href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-hackathon-accent hover:bg-hackathon-accent/90 text-white font-medium rounded-md py-2 px-4 transition-all duration-300 ease-in-out flex items-center gap-2 animated-border shadow-[0_0_15px_rgba(30,136,229,0.3)]"
          >
            Register <ExternalLink size={16} />
          </a>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-hackathon-bg border-hackathon-accent/20">
            <SheetHeader>
              <SheetTitle className="text-hackathon-text font-glitch">HACKATHON.DEV</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-hackathon-text hover:text-hackathon-accent transition-colors duration-300 py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('prizes')}
                className="text-left text-hackathon-text hover:text-hackathon-accent transition-colors duration-300 py-2"
              >
                Prizes
              </button>
              <button 
                onClick={() => scrollToSection('sponsors')}
                className="text-left text-hackathon-text hover:text-hackathon-accent transition-colors duration-300 py-2"
              >
                Sponsors
              </button>
              <button 
                onClick={() => scrollToSection('judges')}
                className="text-left text-hackathon-text hover:text-hackathon-accent transition-colors duration-300 py-2"
              >
                Judges
              </button>
              <div className="pt-4 mt-4 border-t border-hackathon-accent/20">
                <a 
                  href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-hackathon-accent hover:bg-hackathon-accent/90 text-white font-medium rounded-md py-3 px-4 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 w-full"
                >
                  Register <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;