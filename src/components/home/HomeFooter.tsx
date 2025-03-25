
import { Zap } from 'lucide-react';

const HomeFooter = () => {
  return (
    <footer className="relative py-12 w-full bg-hackathon-bg/80 backdrop-blur-lg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <a href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co" target="_blank" rel="noopener noreferrer" className="font-glitch text-xl font-semibold mb-6 inline-block text-hackathon-accent">
          hackathon.dev
        </a>
        <p className="text-hackathon-text-muted mb-8">The World's Largest Hackathon | April 1st, 2025</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-hackathon-text-muted">
          <a href="#" className="hover:text-hackathon-accent transition-colors duration-200">Rules</a>
          <a href="#" className="hover:text-hackathon-accent transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-hackathon-accent transition-colors duration-200">Terms of Service</a>
          <a href="#" className="hover:text-hackathon-accent transition-colors duration-200">Code of Conduct</a>
          <a href="#" className="hover:text-hackathon-accent transition-colors duration-200">Contact</a>
        </div>
      </div>
      
      {/* Built by bolt.new badge */}
      <div className="absolute bottom-4 right-4 animate-pulse-slow">
        <a 
          href="https://bolt.new" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1.5 text-xs font-medium text-hackathon-text-muted hover:text-hackathon-accent transition-colors duration-300 group"
        >
          <span>Built by</span>
          <span className="font-bold flex items-center">
            bolt.new <Zap className="h-3 w-3 ml-0.5 text-hackathon-accent group-hover:text-yellow-300 transition-colors" />
          </span>
        </a>
      </div>
    </footer>
  );
};

export default HomeFooter;
