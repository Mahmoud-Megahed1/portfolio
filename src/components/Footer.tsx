import React from 'react';
import { ArrowUp, Github, Linkedin, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-canvas-border/20 py-10 bg-canvas-base/80 backdrop-blur-sm">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-display font-medium text-sm text-content-primary">
              Mahmoud Mohamed Megahed
            </span>
            <span className="hidden sm:inline text-content-muted">•</span>
            <span className="font-body text-xs text-content-muted">
              Fullstack .NET Developer & Backend Engineer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Mahmoud-Megahed1"
              target="_blank"
              rel="noreferrer"
              className="text-content-muted hover:text-accent transition-colors p-2"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/mahmoud---megahed"
              target="_blank"
              rel="noreferrer"
              className="text-content-muted hover:text-accent transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://khamsat.com/user/mahmoudmegahedd"
              target="_blank"
              rel="noreferrer"
              className="text-content-muted hover:text-accent transition-colors p-2"
              aria-label="Khamsat"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="h-4 w-px bg-canvas-border/50 mx-1" />

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 font-body text-xs text-content-muted hover:text-content-primary px-3 py-1.5 rounded-full border border-canvas-border/40 hover:border-accent/40 bg-canvas-surface/60 transition-all duration-200 group"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}