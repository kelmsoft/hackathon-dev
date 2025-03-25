
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-hackathon-bg flex items-center justify-center p-6">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="font-funky text-6xl font-bold mb-2 text-hackathon-accent">404</h1>
        <p className="font-funky text-xl text-hackathon-text mb-8">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-flex items-center bg-gradient-to-r from-hackathon-accent to-hackathon-accent-light hover:from-hackathon-accent/90 hover:to-hackathon-accent-light/90 text-white font-medium rounded-md py-2 px-4 transition-all duration-300 ease-in-out"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
