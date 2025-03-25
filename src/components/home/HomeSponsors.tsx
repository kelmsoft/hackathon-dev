import { motion } from 'framer-motion';
import AnimatedSection from '@/components/shared/AnimatedSection';

const SPONSORS = [
  {
    name: 'boltdotnew',
    handle: '@boltdotnew',
    displayName: 'BOLT.NEW',
    isFeatured: true,
  },
  {
    name: 'Supabase',
    handle: '@Supabase',
    displayName: 'SUPABASE',
  },
  {
    name: 'Netlify',
    handle: '@Netlify',
    displayName: 'NETLIFY',
  },
  {
    name: 'Cloudflare',
    handle: '@Cloudflare',
    displayName: 'CLOUDFLARE',
  },
  {
    name: 'Sentry',
    handle: '@GetSentry',
    displayName: 'SENTRY',
  },
  {
    name: 'Loops',
    handle: '@Loops',
    displayName: 'LOOPS',
  },
  {
    name: 'Algorand',
    handle: '@Algorand',
    displayName: 'ALGORAND',
  },
];

const SponsorSection = () => {
  const featuredSponsor = SPONSORS.find((sponsor) => sponsor.isFeatured);
  const regularSponsors = SPONSORS.filter((sponsor) => !sponsor.isFeatured);

  return (
    <section id='sponsors' className='relative py-16 w-full'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <AnimatedSection className='text-center mb-10'>
          <h2 className='text-3xl md:text-4xl font-bold mb-3 tracking-tight'>
            Our <span className='text-hackathon-accent'>Sponsors</span>
          </h2>
          <div className='w-16 h-0.5 bg-hackathon-accent mx-auto rounded-full mb-4'></div>
          <p className='text-hackathon-text-muted max-w-2xl mx-auto text-base'>
            Backed by industry leaders fostering innovation
          </p>
        </AnimatedSection>

        <div className='glass-card rounded-xl py-12'>
          {featuredSponsor && (
            <AnimatedSection className='mb-8'>
              <>
                <div className='text-center mb-4'>
                  <span className='text-xs uppercase tracking-wider text-hackathon-accent font-semibold bg-hackathon-accent/10 px-3 py-1 rounded-full'>
                    Main Sponsor
                  </span>
                </div>
                <FeaturedSponsor
                  name={featuredSponsor.name}
                  handle={featuredSponsor.handle}
                  displayName={featuredSponsor.displayName}
                />
              </>
            </AnimatedSection>
          )}

          <AnimatedSection>
            <>
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6'>
                {regularSponsors.map((sponsor, index) => (
                  <Sponsor
                    key={index}
                    name={sponsor.name}
                    handle={sponsor.handle}
                    displayName={sponsor.displayName}
                    delay={index * 100}
                  />
                ))}
              </div>
            </>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;

interface SponsorProps {
  name: string;
  handle: string;
  displayName: string;
  delay?: number;
}

const Sponsor = ({ name, handle, displayName, delay = 0 }: SponsorProps) => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center'
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className='mb-2 w-10 h-10'>
        <img
          src={`/sponsors/${handle.replace('@', '')}.svg`}
          alt={name}
          className='w-full h-full object-contain filter invert'
        />
      </div>
      <div className='text-center'>
        <h3 className='text-white font-bold text-sm tracking-wide'>
          {displayName}
        </h3>
        <p className='text-hackathon-accent text-xs font-mono'>{handle}</p>
      </div>
    </motion.div>
  );
};

const FeaturedSponsor = ({ name, handle, displayName }: SponsorProps) => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className='mb-4 w-20 h-20'>
        <img
          src={`/sponsors/${handle.replace('@', '')}.svg`}
          alt={name}
          className='w-full h-full object-contain filter invert'
        />
      </div>
      <div className='text-center'>
        <h3 className='text-white font-bold text-2xl tracking-wide mb-1'>
          {displayName}
        </h3>
        <p className='text-hackathon-accent text-base font-mono mb-3'>
          {handle}
        </p>
        <p className='text-hackathon-text-muted text-sm max-w-xl mx-auto'>
          The leading platform for building and deploying web applications with
          AI assistance.
        </p>
      </div>
    </motion.div>
  );
};
