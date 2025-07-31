import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([textRef.current, percentRef.current], { opacity: 0, y: 30 });
    gsap.set(progressBarRef.current, { width: '0%' });

    // Animate text in
    tl.to([textRef.current, percentRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2
    });

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
      }
    }, '-=0.5');

    // Animate out
    tl.to([textRef.current, percentRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.in'
    }, '+=0.3');

    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        {/* Animated logo/text */}
        <div ref={textRef} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold gradient-text tracking-tighter">
            Prudhwi
          </h1>
          <p className="text-muted-foreground text-lg mt-2 tracking-wider">
            WEB DEVELOPER
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="relative h-1 bg-muted rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              style={{
                boxShadow: '0 0 20px hsl(var(--primary) / 0.5)'
              }}
            />
          </div>
          <div ref={percentRef} className="text-center mt-4 text-primary font-medium text-xl">
            0%
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full blur-sm float opacity-60" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full blur-sm float opacity-40" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-secondary rounded-full blur-sm float opacity-50" style={{ animationDelay: '4s' }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;