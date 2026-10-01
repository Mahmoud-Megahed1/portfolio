import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-canvas-border/20 py-8">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-body text-sm text-content-muted">
            &copy; {new Date().getFullYear()} Mahmoud Mohamed Megahed
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-body text-sm text-content-muted hover:text-content-primary transition-colors duration-200 group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200 ease-out" />
          </button>
        </div>
      </ScrollReveal>
    </footer>
  );
}