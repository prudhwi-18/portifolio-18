import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'phosphor-react';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial setup - elements are hidden and blurred
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });
    
    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
    });

    // Create timeline for hero animations
    const tl = gsap.timeline({ delay: 4 });

    // Animate title
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    });

    // Animate subtitle
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6');

    // Animate CTA
    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');

    // Animate Spline
    tl.to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');

    // CTA hover animation
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleHireMe = () => {
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} id="home" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/10 rounded-full blur-3xl float" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-secondary/10 rounded-full blur-3xl float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-accent/10 rounded-full blur-2xl float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Prudhwi</span>
              <br />
              <span className="text-muted-foreground">Web Developer</span>
            </h1>

            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            >
              I craft exceptional digital experiences with cutting-edge technologies. 
              Specializing in React, GSAP animations, and modern web development.
            </p>

            <button
              ref={ctaRef}
              onClick={handleHireMe}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 glow-primary"
            >
              Hire Me
              <ArrowRight 
                size={20} 
                className="group-hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
          </div>

          {/* Right Content - Spline */}
          <div ref={splineRef} className="relative">
            <div className="aspect-square max-w-lg mx-auto">
              <iframe 
                src="https://my.spline.design/aidatamodelinteraction-oaehNqbcFqLJhZQIrIe9bKC0/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="rounded-2xl"
                style={{ minHeight: '500px' }}
                title="3D Interactive Model"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-transparent rounded-full blur-xl opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary to-transparent rounded-full blur-xl opacity-60" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;