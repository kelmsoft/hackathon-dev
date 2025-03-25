import { useEffect } from 'react';
import ThreeScene from '@/components/shared/ThreeScene';
import HomeNavbar from './HomeNavbar';
import HomeHero from './HomeHero';
import HomeEventDetails from './HomeEventDetails';
import HomePrizes from './HomePrizes';
import HomeSponsors from './HomeSponsors';
import HomeJudges from './HomeJudges';
import HomeHost from './HomeHost';
import HomeFooter from './HomeFooter';

const HomeContainer = () => {
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    document.querySelectorAll('.section-reveal').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('.section-reveal').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <ThreeScene />
      <HomeNavbar />
      <main>
        <HomeHero />
        <HomeEventDetails />
        <HomePrizes />
        <HomeSponsors />
        <HomeJudges />
        <HomeHost />
      </main>
      <HomeFooter />
    </div>
  );
};

export default HomeContainer;
