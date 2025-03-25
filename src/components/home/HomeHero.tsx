import { Calendar, Globe, Award, Terminal, Code } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Set up glitching interval
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of glitching
        setIsGlitching(true);

        // Reset glitch after a short duration
        setTimeout(
          () => {
            setIsGlitching(false);
          },
          700 + Math.random() * 300
        ); // Random duration between 700-1000ms
      }
    }, 1000); // Check every 3 seconds

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section className='relative min-h-screen w-full flex flex-col items-center justify-center pt-16 pb-20 px-6 overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-hackathon-bg/70 z-10'></div>

      {/* Decorative code elements */}
      <div className='absolute top-1/4 left-10 text-hackathon-accent/20 font-mono text-xs z-0 hidden md:block'>
        <div>function hack() {'{'}</div>
        <div>&nbsp;&nbsp;const world = await connect();</div>
        <div>&nbsp;&nbsp;const innovation = world.createNew();</div>
        <div>&nbsp;&nbsp;return innovation;</div>
        <div>{'}'}</div>
      </div>

      <div className='absolute bottom-1/4 right-10 text-hackathon-accent-light/20 font-mono text-xs z-0 hidden md:block'>
        <div>class Hacker {'{'}</div>
        <div>&nbsp;&nbsp;constructor() {'{'}</div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;this.skills = ['code', 'create', 'disrupt'];
        </div>
        <div>&nbsp;&nbsp;{'}'}</div>
        <div>{'}'}</div>
      </div>

      <div className='max-w-7xl w-full mx-auto flex flex-col items-center justify-center text-center z-20  pt-12 md:pt-0'>
        <AnimatedSection className='mb-4'>
          <div className='inline-block bg-hackathon-accent/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 font-mono'>
            <p className='text-hackathon-accent font-medium text-sm'>
              <span>$1M+ in Prizes!</span>
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className='mb-6' delay={100}>
          <h1 className='font-funky text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-glow font-mono'>
            The World's Largest
            <span
              className={`font-funky-glitch block bg-gradient-to-r from-hackathon-accent to-hackathon-accent-light bg-clip-text text-transparent ${isGlitching ? 'active-glitch' : ''}`}
            >
              Hackathon
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection className='mb-12 max-w-2xl' delay={200}>
          <p className='text-hackathon-text-muted text-xl leading-relaxed'>
            <span className='font-mono text-hackathon-accent'>$_</span> Join
            thousands of developers, designers, and innovators from around the
            world for an unprecedented virtual coding challenge with over $1
            million in prizes.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mt-4'>
            <div className='flex items-center gap-3 text-hackathon-text-muted'>
              <div className='bg-hackathon-accent/10 rounded-full p-2.5'>
                <Calendar className='w-5 h-5 text-hackathon-accent' />
              </div>
              <span className='text-lg font-mono'>04-01-2025</span>
            </div>

            <div className='flex items-center gap-3 text-hackathon-text-muted'>
              <div className='bg-hackathon-accent/10 rounded-full p-2.5'>
                <Globe className='w-5 h-5 text-hackathon-accent' />
              </div>
              <span className='text-lg font-mono'>Virtual</span>
            </div>

            <div className='flex items-center gap-3 text-hackathon-text-muted'>
              <div className='bg-hackathon-accent/10 rounded-full p-2.5'>
                <Award className='w-5 h-5 text-hackathon-accent' />
              </div>
              <span className='text-lg font-mono'>$1M+ in Prizes!</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400} className='mt-16'>
          <a
            href='https://form.typeform.com/to/wf94YwH4?typeform-source=t.co'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-gradient-to-r from-hackathon-accent to-hackathon-accent-light hover:from-hackathon-accent/90 hover:to-hackathon-accent-light/90 text-white font-medium text-lg rounded-md py-3 px-8 transition-all duration-300 ease-in-out shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] animated-border font-mono flex items-center gap-2'
          >
            Register
          </a>
        </AnimatedSection>
      </div>

      <AnimatedSection
        delay={500}
        className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'
      >
        <div
          className='animate-bounce cursor-pointer'
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-hackathon-text-muted'
          >
            <path
              d='M12 5V19M12 19L19 12M12 19L5 12'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default HeroSection;
