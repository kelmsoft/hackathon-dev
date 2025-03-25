import { useState, useRef, useEffect } from 'react';
import { ThumbsUp, Eye, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/hooks/use-projects-query';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {Link} from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const animationDelay = `${index * 0.001}s`;

  // Check if we should display video instead of image
  const shouldShowVideo = !project.image && project.videoUrl;

  return (
    <a
      href={project.websiteUrl || project.tweetUrl}
      target='_blank'
      className='group relative rounded-xl overflow-hidden bg-black/20 border border-white/10 transition-all duration-300 h-full animate-fade-in opacity-0 cursor-pointer'
      style={{ animationDelay, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='aspect-video w-full h-full overflow-hidden relative'>
        {!isLoaded && (
          <div className='absolute inset-0 bg-white/5 animate-pulse'></div>
        )}
        
        {shouldShowVideo ? (
          <video
            ref={videoRef}
            src={project.videoUrl.replace('blob:', '')}
            onLoadedData={handleVideoLoad}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105 brightness-75' : 'scale-100'}`}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            ref={imgRef}
            src={project.image}
            alt={project.author}
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105 brightness-75' : 'scale-100'}`}
          />
        )}

        {/* Vote count overlay - always visible */}
        <div className='absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1'>
          <ThumbsUp className='w-3 h-3' />
          <span className='text-xs font-medium'>{project.votes}</span>
        </div>

        {/* Hover overlay with metadata */}
        <div
          className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div></div> {/* Spacer for flex layout */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{project.handle}</span>
              <div className='flex items-center gap-2'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='p-0 h-auto text-white hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center'
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.websiteUrl, '_blank');
                        }}
                      >
                        <Eye className='w-4 h-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                      <p>View Project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='p-0 h-auto text-white hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center'
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.tweetUrl, '_blank');
                        }}
                      >
                        <Twitter className='w-4 h-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                      <p>View on X</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <p className='text-xs text-white/70'>by {project.author}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;