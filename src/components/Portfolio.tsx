import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'unset';
    
    // Smooth scroll setup
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger after content loads
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  useEffect(() => {
    if (!isLoading) {
      // Initialize smooth scrolling behavior
      const smoothScroll = (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const href = target.getAttribute('href');
        
        if (href?.startsWith('#')) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      };

      // Add smooth scroll to anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
      });

      return () => {
        anchorLinks.forEach(link => {
          link.removeEventListener('click', smoothScroll);
        });
      };
    }
  }, [isLoading]);

  return (
    <div className="relative">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        {/* Navigation */}
        <Navigation />
        
        {/* Sections */}
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/50" />
          
          {/* Animated Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;