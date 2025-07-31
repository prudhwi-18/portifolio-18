import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(contentRef.current, {
      y: 60,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: GithubLogo, href: 'https://github.com', label: 'GitHub' },
    { icon: LinkedinLogo, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: EnvelopeSimple, href: 'mailto:hello@prudhwi.dev', label: 'Email' }
  ];

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full blur-sm float opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['hsl(var(--neon-blue))', 'hsl(var(--neon-purple))', 'hsl(var(--neon-cyan))'][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold gradient-text">Prudhwi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Crafting exceptional digital experiences with cutting-edge technologies and creative innovation.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart size={16} className="text-red-500 animate-pulse" />
                <span>and lots of coffee</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-card rounded-xl hover:scale-110 hover:text-primary transition-all duration-300 group"
                    title={social.label}
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>📧 hello@prudhwi.dev</p>
                <p>📱 Available for freelance work</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 Prudhwi. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <button className="hover:text-foreground transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="hover:text-foreground transition-colors duration-300">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>

          {/* Back to Top */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full hover:scale-105 transition-all duration-300 group text-sm font-medium"
            >
              <span>Back to Top</span>
              <div className="w-4 h-4 border border-current rounded-full flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                <div className="w-1 h-2 bg-current rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;