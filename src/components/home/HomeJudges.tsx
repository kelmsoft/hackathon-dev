import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import AnimatedSection from '@/components/shared/AnimatedSection';

const JUDGES = [
  {
    name: 'Pieter Levels',
    handle: '@levelsio',
    role: 'Indie Maker',
    description: 'Founder of Nomad List, Remote OK',
  },
  {
    name: 'Logan Kilpatrick',
    handle: '@OfficialLoganK',
    role: 'AI Researcher',
    description: 'Developer Advocate at OpenAI',
  },
  {
    name: 'Sara Chip',
    handle: '@saranormous',
    role: 'Startup Advisor',
    description: 'Investor and Product Strategist',
  },
  {
    name: 'Theo',
    handle: '@theo',
    role: 'Tech Educator',
    description: 'Founder of PingLabs, Creator',
  },
  {
    name: 'Evan You',
    handle: '@youyuxi',
    role: 'Creator of Vue.js',
    description: 'Open Source Developer',
  },
  {
    name: 'KP',
    handle: '@thisiskp_',
    role: 'Product Leader',
    description: 'Builder and Tech Entrepreneur',
  },
  {
    name: 'Alex Albert',
    handle: '@alexalbert__',
    role: 'Tech Entrepreneur',
    description: 'Builder and Community Leader',
  },
  {
    name: 'Ben Tossell',
    handle: '@bentossell',
    role: 'No-Code Pioneer',
    description: 'Founder of Makerpad',
  },
  {
    name: 'Exa AI Labs',
    handle: '@ExaAILabs',
    role: 'AI Research Team',
    description: 'Pushing AI Innovation Boundaries',
  },
  {
    name: 'HSR Hackerhouse',
    handle: '@hsrhackerhouse',
    role: 'Hacker Collective',
    description: 'Community of Builders & Makers',
  },
];

const JudgeSection = () => {
  return (
    <section id='judges' className='relative py-20 w-full overflow-hidden'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-hackathon-accent/30 to-transparent'></div>
      <div className='max-w-7xl mx-auto px-6'>
        <AnimatedSection className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight'>
            Meet Our <span className='text-hackathon-accent'>Judges</span>
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-hackathon-accent to-hackathon-accent-light mx-auto rounded-full mb-6'></div>
          <p className='text-hackathon-text-muted max-w-2xl mx-auto text-lg'>
            Industry leaders and technology experts who will evaluate your
            innovations.
          </p>
        </AnimatedSection>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8'>
          {JUDGES.map((judge, index) => (
            <Judge
              key={index}
              name={judge.name}
              handle={judge.handle}
              role={judge.role}
              description={judge.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-hackathon-accent/30 to-transparent'></div>
    </section>
  );
};

export default JudgeSection;

interface JudgeProps {
  name: string;
  handle: string;
  role: string;
  description: string;
  delay?: number;
}

const Judge = ({ name, handle, role, description, delay = 0 }: JudgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedSection delay={delay} className='group'>
      <motion.a
        href={`https://x.com/${handle.replace('@', '')}`}
        target='_blank'
        rel='noopener noreferrer'
        className='relative h-full rounded-2xl overflow-hidden bg-transparent transition-all duration-300 block'
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className='p-5 flex flex-col items-center'>
          <div className='relative mb-4 w-full aspect-square rounded-xl overflow-hidden group-hover:ring-2 ring-hackathon-accent/50 transition-all duration-300'>
            <Avatar className='w-full h-full'>
              <AvatarImage
                src={`/judges/${handle.replace('@', '')}.jpg`}
                alt={name}
                className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-110'
              />
              <AvatarFallback className='bg-hackathon-card/50 text-hackathon-accent text-xl'>
                {name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>

          <h3 className='text-lg md:text-xl font-semibold mb-1 transition-colors group-hover:text-hackathon-accent text-center'>
            {name}
          </h3>
          <p className='text-hackathon-accent mb-2 text-sm font-mono'>
            {handle}
          </p>

          <div
            className={`overflow-hidden transition-all duration-300 text-center ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className='text-sm font-medium text-white/80 mb-1'>{role}</p>
            <p className='text-xs text-hackathon-text-muted'>{description}</p>
          </div>
        </div>
      </motion.a>
    </AnimatedSection>
  );
};
