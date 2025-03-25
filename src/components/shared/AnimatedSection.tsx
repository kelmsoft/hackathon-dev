
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  fromLeft?: boolean;
  fromRight?: boolean;
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  fromLeft = false,
  fromRight = false,
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    if (fromLeft) return 'translate-x-[-30px]';
    if (fromRight) return 'translate-x-[30px]';
    return 'translate-y-[30px]';
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        'section-reveal opacity-0',
        getAnimationClass(),
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
