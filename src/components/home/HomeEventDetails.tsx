import React from 'react';
import { Clock, Code, Users, LayoutDashboard } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const EventDetails = () => {
  return (
    <section id='about' className='relative py-20 w-full'>
      <div className='max-w-6xl mx-auto px-6'>
        <AnimatedSection className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-hackathon-text mb-4 font-mono'>
            Event Details
          </h2>
          <p className='text-hackathon-text-muted text-lg text-content'>
            Get ready for 48 hours of coding, collaboration, and creation.
            Here's what you need to know.
          </p>
        </AnimatedSection>

        <AnimatedSection className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Left Column - Event Overview */}
          <div className='glass-card p-6 rounded-2xl'>
            <h3 className='text-2xl font-semibold text-hackathon-accent mb-4 font-mono'>
              Overview
            </h3>
            <p className='text-hackathon-text-muted leading-relaxed'>
              The World's Largest Hackathon is a 48-hour virtual event where
              participants from around the globe come together to build
              innovative projects, learn new skills, and compete for over $1
              million in prizes. Whether you're a seasoned developer or just
              starting out, there's a place for you here.
            </p>
            <ul className='list-disc pl-5 mt-4 text-hackathon-text-muted'>
              <li>Teams of up to 4 members</li>
              <li>48 hours of hacking</li>
              <li>Virtual event, accessible worldwide</li>
              <li>Over $1 million in prizes</li>
            </ul>
          </div>

          {/* Right Column - Timeline */}
          <div className='glass-card p-6 rounded-2xl'>
            <h3 className='text-2xl font-semibold text-hackathon-accent mb-4 font-mono'>
              Timeline
            </h3>
            <div className='relative'>
              {/* Vertical Line */}
              <div className='absolute left-2 top-0 h-full border-l-2 border-hackathon-accent/30'></div>

              {/* Timeline Items */}
              <div className='mb-4 ml-8'>
                <div className='absolute -left-3 top-3 w-6 h-6 bg-hackathon-accent rounded-full flex items-center justify-center'>
                  <span className='text-xs font-mono text-hackathon-bg'>
                    {'>'}
                  </span>
                </div>
                <h4 className='text-lg font-semibold text-hackathon-text font-mono'>
                  Registration Opens
                </h4>
                <p className='text-hackathon-text-muted'>
                  Secure your spot for the hackathon.
                </p>
              </div>

              <div className='mb-4 ml-8'>
                <div className='absolute -left-3 top-3 w-6 h-6 bg-hackathon-accent rounded-full flex items-center justify-center'>
                  <span className='text-xs font-mono text-hackathon-bg'>
                    {'>'}
                  </span>
                </div>
                <h4 className='text-lg font-semibold text-hackathon-text font-mono'>
                  Team Formation
                </h4>
                <p className='text-hackathon-text-muted'>
                  Find your dream team and brainstorm ideas.
                </p>
              </div>

              <div className='mb-4 ml-8'>
                <div className='absolute -left-3 top-3 w-6 h-6 bg-hackathon-accent rounded-full flex items-center justify-center'>
                  <span className='text-xs font-mono text-hackathon-bg'>
                    {'>'}
                  </span>
                </div>
                <h4 className='text-lg font-semibold text-hackathon-text font-mono'>
                  Hacking Begins
                </h4>
                <p className='text-hackathon-text-muted'>
                  The clock starts. Let the coding commence!
                </p>
              </div>

              <div className='mb-4 ml-8'>
                <div className='absolute -left-3 top-3 w-6 h-6 bg-hackathon-accent rounded-full flex items-center justify-center'>
                  <span className='text-xs font-mono text-hackathon-bg'>
                    {'>'}
                  </span>
                </div>
                <h4 className='text-lg font-semibold text-hackathon-text font-mono'>
                  Project Submission
                </h4>
                <p className='text-hackathon-text-muted'>
                  Submit your project for judging.
                </p>
              </div>

              <div className='ml-8'>
                <div className='absolute -left-3 top-3 w-6 h-6 bg-hackathon-accent rounded-full flex items-center justify-center'>
                  <span className='text-xs font-mono text-hackathon-bg'>
                    {'>'}
                  </span>
                </div>
                <h4 className='text-lg font-semibold text-hackathon-text font-mono'>
                  Winners Announced
                </h4>
                <p className='text-hackathon-text-muted'>
                  Celebrate the winners and their amazing creations.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
          {/* Column 1 - Participants */}
          <div className='glass-card p-6 rounded-2xl text-center'>
            <div className='bg-hackathon-accent/10 rounded-full p-3 mx-auto mb-3'>
              <Users className='w-6 h-6 text-hackathon-accent mx-auto' />
            </div>
            <h4 className='text-xl font-semibold text-hackathon-text mb-2 font-mono'>
              10,000+
            </h4>
            <p className='text-hackathon-text-muted'>Participants</p>
          </div>

          {/* Column 2 - Projects */}
          <div className='glass-card p-6 rounded-2xl text-center'>
            <div className='bg-hackathon-accent/10 rounded-full p-3 mx-auto mb-3'>
              <Code className='w-6 h-6 text-hackathon-accent mx-auto' />
            </div>
            <h4 className='text-xl font-semibold text-hackathon-text mb-2 font-mono'>
              2,000+
            </h4>
            <p className='text-hackathon-text-muted'>Projects Submitted</p>
          </div>

          {/* Column 3 - Prizes */}
          <div className='glass-card p-6 rounded-2xl text-center'>
            <div className='bg-hackathon-accent/10 rounded-full p-3 mx-auto mb-3'>
              <LayoutDashboard className='w-6 h-6 text-hackathon-accent mx-auto' />
            </div>
            <h4 className='text-xl font-semibold text-hackathon-text mb-2 font-mono'>
              100+
            </h4>
            <p className='text-hackathon-text-muted'>Tracks & Challenges</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default EventDetails;
