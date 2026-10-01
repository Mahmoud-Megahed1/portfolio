import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { ScrambleText } from '@/components/ui/scramble-text';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for nav background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ href }) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // GSAP entrance animation
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: 'expo.out',
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-canvas-base/90 backdrop-blur-xl border-b border-canvas-border/10 shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#home"
          className="font-display text-lg font-semibold text-content-primary tracking-tight hover:text-accent transition-colors duration-200 select-none"
        >
          <ScrambleText text="M.Megahed" delay={300} speed={40} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={href}
                className={`relative font-body text-sm px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'text-accent'
                    : 'text-content-muted hover:text-content-primary'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-accent" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-content-secondary hover:text-content-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-canvas-surface/95 backdrop-blur-xl border-b border-canvas-border/20">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="font-body text-sm text-content-secondary hover:text-accent py-2 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}