import { Mic } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const HOST = {
  name: 'Greg Isenberg',
  handle: '@gregisenberg',
};

const HostSection = () => {
  return (
    <section id='host' className='relative py-20 w-full'>
      <div className='max-w-7xl mx-auto px-6'>
        <AnimatedSection className='text-center mb-16'>
          <h2 className='text-4xl font-bold mb-4 tracking-tight'>
            Your <span className='text-hackathon-accent'>Host</span>
          </h2>
          <div className='w-16 h-0.5 bg-hackathon-accent mx-auto rounded-full mb-6'></div>
          <p className='text-hackathon-text-muted max-w-2xl mx-auto text-lg'>
            Meet the personality who will guide you through this incredible
            journey
          </p>
        </AnimatedSection>

        <AnimatedSection className='flex flex-col items-center'>
          <div className='glass-card rounded-2xl p-8 max-w-3xl mx-auto relative overflow-hidden'>
            {/* Decorative gradient background */}
            <div className='absolute inset-0 bg-gradient-to-br from-hackathon-accent/5 to-transparent'></div>

            <div className='relative flex flex-col md:flex-row items-center gap-8'>
              <a
                href={`https://x.com/${HOST.handle.replace('@', '')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='relative group'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-hackathon-accent/20 to-transparent rounded-xl transition-opacity opacity-0 group-hover:opacity-100'></div>
                <img
                  src={`/judges/${HOST.handle.replace('@', '')}.jpg`}
                  alt={HOST.name}
                  className='size-48 object-cover rounded-xl relative z-10 transition-transform duration-300 group-hover:scale-105'
                />
                {/* Decorative elements */}
                <div className='absolute -bottom-2 -right-2 size-24 bg-gradient-to-br from-hackathon-accent/20 to-transparent rounded-full blur-xl'></div>
              </a>

              <div className='flex-1 relative'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='bg-hackathon-accent/10 rounded-full p-2'>
                    <Mic className='w-5 h-5 text-hackathon-accent' />
                  </div>
                  <h3 className='text-2xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text'>
                    {HOST.name}
                  </h3>
                </div>

                <a
                  href={`https://x.com/${HOST.handle.replace('@', '')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-hackathon-accent font-mono mb-4 hover:text-hackathon-accent-light transition-colors inline-block'
                >
                  {HOST.handle}
                </a>

                <p className='text-hackathon-text-muted leading-relaxed'>
                  Greg Isenberg is a renowned entrepreneur, investor, and
                  community builder in the tech space. With his vast experience
                  in product design and community-led startups, Greg brings
                  energy and insights that will enhance your hackathon
                  experience.
                </p>

                {/* Social proof badges */}
                <div className='flex flex-wrap gap-3 mt-6'>
                  <div className='bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/10'>
                    Entrepreneur
                  </div>
                  <div className='bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/10'>
                    Community Builder
                  </div>
                  <div className='bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/10'>
                    Product Designer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HostSection;
