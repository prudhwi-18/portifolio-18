import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Rocket, 
  Lightning,
  Globe,
  DeviceMobile
} from 'phosphor-react';
import profileImage from '@/assets/profile-image.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate image
    tl.fromTo(imageRef.current, {
      x: -100,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    });

    // Animate content
    tl.fromTo(contentRef.current, {
      x: 100,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.8');

    // Animate skills with stagger
    tl.fromTo(skillsRef.current?.children || [], {
      y: 50,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.6');

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const skills = [
    { icon: Code, name: 'Frontend Development', color: 'text-primary' },
    { icon: Palette, name: 'UI/UX Design', color: 'text-secondary' },
    { icon: Rocket, name: 'Performance Optimization', color: 'text-accent' },
    { icon: Lightning, name: 'GSAP Animations', color: 'text-neon-pink' },
    { icon: Globe, name: 'Web Technologies', color: 'text-primary' },
    { icon: DeviceMobile, name: 'Responsive Design', color: 'text-secondary' }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              {/* Glowing Frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full p-1 group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full bg-background rounded-full" />
              </div>
              
              {/* Profile Image */}
              <div className="relative aspect-square w-80 max-w-full mx-auto overflow-hidden rounded-full">
                <img 
                  src={profileImage}
                  alt="Prudhwi - Web Developer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Decorations */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/20 rounded-full blur-lg animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I'm a passionate web developer with expertise in creating immersive, 
                  high-performance web applications. I specialize in modern JavaScript 
                  frameworks and cutting-edge animation libraries.
                </p>
                <p>
                  With a keen eye for design and a deep understanding of user experience, 
                  I bridge the gap between beautiful design and functional code. 
                  Every project I work on combines technical excellence with creative innovation.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                What I Do
              </h3>
              <div ref={skillsRef} className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="glass-card p-4 rounded-xl hover-lift cursor-pointer group"
                  >
                    <skill.icon 
                      size={32} 
                      className={`${skill.color} mb-3 group-hover:scale-110 transition-transform duration-300`} 
                    />
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button 
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors duration-300 group"
              >
                View My Work
                <Code size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;