import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "AI Data Dashboard",
      description: "Futuristic dashboard with real-time analytics, featuring advanced data visualizations and interactive charts.",
      image: project1,
      technologies: ["React", "TypeScript", "D3.js", "GSAP"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with smooth animations, advanced filtering, and seamless checkout process.",
      image: project2,
      technologies: ["Next.js", "Tailwind", "Stripe", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Crypto Trading App",
      description: "Real-time cryptocurrency trading platform with live charts, portfolio tracking, and market analysis.",
      image: project3,
      technologies: ["React", "WebSocket", "Chart.js", "Node.js"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "This very website showcasing modern web development techniques with GSAP animations and 3D elements.",
      image: project1,
      technologies: ["React", "GSAP", "Spline", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Task Management",
      description: "Collaborative workspace with drag-and-drop functionality, real-time updates, and team collaboration features.",
      image: project2,
      technologies: ["Vue.js", "Vuex", "Socket.io", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Weather Forecast",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and weather animations.",
      image: project3,
      technologies: ["React", "OpenWeather API", "Mapbox", "GSAP"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.fromTo(titleRef.current, {
      y: 50,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Projects stagger animation
    gsap.fromTo(projectsRef.current?.children || [], {
      y: 100,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)'
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 90%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my latest work, featuring cutting-edge technologies and innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Scroll Hint for Mobile */}
        <div className="text-center mt-12 md:hidden">
          <p className="text-sm text-muted-foreground">
            Swipe to explore more projects
          </p>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      // Enhance glow effect
      gsap.to(card.querySelector('.project-glow'), {
        opacity: 0.3,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.project-glow'), {
        opacity: 0.1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="relative group cursor-pointer">
      {/* Glow Effect */}
      <div className="project-glow absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl blur-xl opacity-10 transition-all duration-500" />
      
      {/* Card Content */}
      <div className="glass-card rounded-2xl overflow-hidden h-full">
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a 
              href={project.liveUrl}
              className="p-2 bg-background/20 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ArrowUpRight size={16} />
            </a>
            <a 
              href={project.githubUrl}
              className="p-2 bg-background/20 backdrop-blur-sm rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <GithubLogo size={16} />
            </a>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-full border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;