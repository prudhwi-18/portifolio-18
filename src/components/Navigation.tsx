import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate nav in on mount
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 3.5 }
    );
  }, []);

  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current, 
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power2.out' }
      );
    } else if (!isMenuOpen && mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in'
      });
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold gradient-text">
            Prudhwi
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-300 relative group"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
          >
            <List size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-80 bg-card/95 backdrop-blur-lg border-l border-border z-50 transform translate-x-full md:hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="text-xl font-bold gradient-text">Menu</div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block text-lg text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;