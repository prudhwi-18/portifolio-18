import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Form animation
    gsap.fromTo(formRef.current, {
      x: -100,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Social links animation
    gsap.fromTo(socialRef.current?.children || [], {
      y: 50,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: socialRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (you can implement a toast here)
    console.log('Message sent successfully!');
  };

  const socialLinks = [
    {
      icon: GithubLogo,
      name: 'GitHub',
      url: 'https://github.com',
      color: 'hover:text-foreground'
    },
    {
      icon: LinkedinLogo,
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      color: 'hover:text-primary'
    },
    {
      icon: EnvelopeSimple,
      name: 'Email',
      url: 'mailto:hello@prudhwi.dev',
      color: 'hover:text-accent'
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 lg:py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to bring your next project to life? Let's discuss how we can work together 
              to create something amazing.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-105 transition-all duration-300 glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <PaperPlaneTilt 
                        size={20} 
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                      />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Social Links & Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Get In Touch
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Feel free to reach out through any of these platforms. 
                  I'm always excited to discuss new opportunities and innovative projects.
                </p>
              </div>

              <div ref={socialRef} className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 glass-card rounded-xl hover-lift transition-all duration-300 group ${social.color}`}
                  >
                    <social.icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>

              {/* Quick Info */}
              <div className="glass-card p-6 rounded-xl">
                <h4 className="font-semibold mb-3 text-foreground">Quick Info</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>📍 Available for remote work</p>
                  <p>⚡ Quick response time</p>
                  <p>🚀 Ready to start immediately</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;