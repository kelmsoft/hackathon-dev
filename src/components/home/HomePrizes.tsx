import { PRIZE_METADATA } from '@/lib/prize-metadata';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

const MainPrizeSection = () => {
  const { mainPrize } = PRIZE_METADATA;

  return (
    <div className='glass-card rounded-lg overflow-hidden'>
      <div className='p-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
          <h2 className='text-2xl lg:text-4xl font-mono tracking-tight mb-2 md:mb-0'>
            MAIN JAM
          </h2>
          <div className='text-3xl lg:text-6xl font-mono font-bold bg-gradient-to-r from-hackathon-accent to-hackathon-accent-light bg-clip-text text-transparent'>
            {mainPrize.amount}
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <div>
              <div className='text-sm uppercase text-hackathon-text-muted mb-2'>
                MAIN JAM BY
              </div>
              <div className='flex items-center gap-4'>
                {mainPrize.mainSponsors.map((sponsor) => (
                  <img
                    key={sponsor}
                    src={`/sponsors/${sponsor}.svg`}
                    alt={sponsor}
                    className='h-6 w-auto invert opacity-90 hover:opacity-100 transition-opacity'
                  />
                ))}
              </div>
            </div>

            <div>
              <div className='text-sm uppercase text-hackathon-text-muted mb-2'>
                SUPPORTED BY
              </div>
              <div className='flex gap-4'>
                {mainPrize.supportingSponsors.map((sponsor) => (
                  <img
                    key={sponsor}
                    src={`/sponsors/${sponsor}.svg`}
                    alt={sponsor}
                    className='h-6 w-auto invert opacity-90 hover:opacity-100 transition-opacity'
                  />
                ))}
              </div>
            </div>
          </div>

          <div className='space-y-3'>
            {mainPrize.prizes.map((prize, index) => (
              <div
                key={index}
                className={`flex justify-between items-center transition-colors`}
              >
                <span className='font-medium'>{prize.position}</span>
                <span className='font-mono text-2xl font-bold text-hackathon-accent'>
                  {prize.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JamsSection = () => {
  const [activeTab, setActiveTab] = useState(PRIZE_METADATA.jams[0].id);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      const currentIndex = PRIZE_METADATA.jams.findIndex(
        (jam) => jam.id === activeTab
      );
      const nextIndex = (currentIndex + 1) % PRIZE_METADATA.jams.length;
      setActiveTab(PRIZE_METADATA.jams[nextIndex].id);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab, isAutoScrolling]);

  return (
    <div className='glass-card rounded-lg overflow-hidden'>
      <div className='p-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
          <h2 className='text-4xl font-mono tracking-tight mb-2 md:mb-0'>
            JAMS
          </h2>
          <div className='flex items-center gap-4'>
            <p className='text-hackathon-text-muted'>Build across 5 Themes</p>
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full transition-colors ${
                isAutoScrolling
                  ? 'bg-hackathon-accent/20 text-hackathon-accent'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {isAutoScrolling ? 'Auto-Scroll On' : 'Auto-Scroll Off'}
            </button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            setIsAutoScrolling(false);
          }}
          className='w-full'
        >
          <TabsList className='rounded-lg px-1 border-b border-white/10 overflow-x-auto flex w-full mb-6'>
            {PRIZE_METADATA.jams.map((jam) => {
              const Icon = jam.icon;
              return (
                <TabsTrigger
                  key={jam.id}
                  value={jam.id}
                  className={`relative flex items-center justify-center gap-2 px-4 transition-all duration-300
                    data-[state=active]:bg-hackathon-accent/20 data-[state=active]:text-hackathon-accent
                    hover:bg-white/5 group rounded-none h-full`}
                  onClick={() => setIsAutoScrolling(false)}
                >
                  <span
                    className={`md:text-xl transition-colors duration-300
                    ${jam.id === activeTab ? 'text-hackathon-accent' : 'text-white/60 group-hover:text-white/80'}`}
                  >
                    <Icon size={24} />
                  </span>
                  <span className='hidden sm:inline font-medium'>
                    {jam.title}
                  </span>
                  {jam.id === activeTab && (
                    <div className='absolute bottom-0 w-full h-0.5 bg-hackathon-accent' />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {PRIZE_METADATA.jams.map((jam) => {
            const Icon = jam.icon;
            return (
              <TabsContent
                key={jam.id}
                value={jam.id}
                className='mt-0 transition-all duration-500 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100'
              >
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='text-hackathon-accent text-3xl'>
                        <Icon size={32} />
                      </div>
                      <h3 className='font-mono tracking-tight uppercase text-2xl'>
                        {jam.title}
                      </h3>
                    </div>
                    <p className='text-hackathon-text-muted mb-6 text-lg'>
                      {jam.description}
                    </p>
                    <div className='mb-4'>
                      <div className='text-xs uppercase text-hackathon-text-muted mb-2'>
                        JAM BY
                      </div>
                      <div className='flex items-center gap-4'>
                        {jam.sponsors.map((sponsor, index) => (
                          <img
                            key={index}
                            src={`/sponsors/${sponsor}.svg`}
                            alt={sponsor}
                            className='h-6 w-auto invert opacity-90 hover:opacity-100 transition-opacity'
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    {jam.prizes.map((prize, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center p-4 glass-card rounded-lg
                          border border-hackathon-accent/10 hover:border-hackathon-accent/20 
                          transition-all duration-300 ${index === 0 ? 'bg-hackathon-accent/5' : ''}`}
                      >
                        <span className='font-medium'>{prize.position}</span>
                        <span className='font-mono text-2xl font-bold text-hackathon-accent'>
                          {prize.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

const PrizeSection = () => {
  return (
    <section id='prizes' className='relative py-16 w-full'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <AnimatedSection className='text-center mb-10'>
          <h2 className='text-4xl font-bold mb-3 tracking-tight'>
            Over{' '}
            <span className='bg-gradient-to-r from-hackathon-accent to-hackathon-accent-light bg-clip-text text-transparent'>
              {PRIZE_METADATA.totalPrizePool}
            </span>{' '}
            in Prizes
          </h2>
          <div className='w-16 h-0.5 bg-hackathon-accent mx-auto rounded-full mb-4'></div>
          <p className='text-hackathon-text-muted max-w-2xl mx-auto text-lg'>
            Compete for life-changing rewards across multiple categories
          </p>
        </AnimatedSection>

        <AnimatedSection className='mb-8'>
          <MainPrizeSection />
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <JamsSection />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PrizeSection;
