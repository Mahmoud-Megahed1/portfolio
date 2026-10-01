import React from 'react';
import { ExternalLink, Github, Monitor, Database } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SpotlightCard } from '@/components/ui/spotlight';
import { motion } from 'framer-motion';
import {
  SiDotnet,
  SiLaravel,
  SiFirebase,
  SiMongodb,
  SiStripe,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiShopify,
  SiJavascript,
  SiHtml5,
  SiCss,
} from '@icons-pack/react-simple-icons';

const techIcons: Record<string, React.ReactNode> = {
  '.NET 10': <SiDotnet className="w-3.5 h-3.5" />,
  'ASP.NET Core': <SiDotnet className="w-3.5 h-3.5" />,
  'EF Core': <SiDotnet className="w-3.5 h-3.5" />,
  'SQL Server': <Database className="w-3.5 h-3.5" />,
  'Laravel': <SiLaravel className="w-3.5 h-3.5" />,
  'Firebase': <SiFirebase className="w-3.5 h-3.5" />,
  'MongoDB': <SiMongodb className="w-3.5 h-3.5" />,
  'Stripe': <SiStripe className="w-3.5 h-3.5" />,
  'React 19': <SiReact className="w-3.5 h-3.5" />,
  'Vite': <SiVite className="w-3.5 h-3.5" />,
  'Tailwind': <SiTailwindcss className="w-3.5 h-3.5" />,
  'Shopify API': <SiShopify className="w-3.5 h-3.5" />,
  'JavaScript': <SiJavascript className="w-3.5 h-3.5" />,
  'HTML5': <SiHtml5 className="w-3.5 h-3.5" />,
  'CSS3': <SiCss className="w-3.5 h-3.5" />,
};

const projects = [
  {
    title: 'Arcade Electronics',
    description: 'Enterprise e-commerce platform for gaming & electronics with real-time cart, order lifecycle management, admin dashboard, and cyberpunk theme.',
    tech: ['.NET 10', 'ASP.NET Core', 'EF Core', 'SQL Server'],
    category: 'FULLSTACK',
    github: 'https://github.com/Mahmoud-Megahed1/Arcade-Electronics',
    featured: true
  },
  {
    title: 'On-Demand Delivery Platform',
    description: 'Enterprise multi-vendor logistics system with real-time tracking, Stripe/PayPal integration, and hybrid data persistence.',
    tech: ['Laravel', 'Firebase', 'MongoDB', 'Stripe'],
    category: 'BACKEND',
    github: 'https://github.com/Mahmoud-Megahed1/on-demand-delivery-platform',
    featured: false
  },
  {
    title: 'Care Clinic Storefront',
    description: 'Modern headless e-commerce storefront for medical wellness with Shopify API integration and RTL support.',
    tech: ['React 19', 'Vite', 'Tailwind', 'Shopify API'],
    category: 'FRONTEND',
    github: 'https://github.com/Mahmoud-Megahed1/care-clinic-headless-storefront',
    featured: false
  },
  {
    title: 'Arcade DEPI Architecture Deck',
    description: 'Interactive presentation deck and architectural schema diagrams for DEPI capstone evaluation.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    category: 'PRESENTATION',
    github: 'https://github.com/Mahmoud-Megahed1/arcade-depi-presentation',
    featured: false
  }
];

function TechTag({ name }: { name: string }) {
  const icon = techIcons[name];
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-xs px-2.5 py-1 rounded bg-canvas-elevated text-content-secondary border border-canvas-border/40 hover:border-accent/30 transition-colors duration-200">
      {icon && <span className="text-accent/70">{icon}</span>}
      {name}
    </span>
  );
}

export function PortfolioSection() {
  const featuredProject = projects.find(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);

  return (
    <section id="portfolio" className="py-24 md:py-32 border-t border-canvas-border/20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-[60ch]">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-content-primary tracking-tight">
              Selected Work
            </h2>
            <p className="font-body text-base text-content-secondary mt-4 max-w-[50ch]">
              Showcase of recent projects demonstrating skills in fullstack development and system design.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Project — Asymmetric Hero Layout */}
        {featuredProject && (
          <ScrollReveal delay={0.15}>
            <div className="mt-10 pt-10 border-t border-canvas-border/20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <span className="font-body text-xs text-accent/70 uppercase tracking-wider block mb-3">
                    {featuredProject.category}
                  </span>
                  <a href={featuredProject.github} target="_blank" rel="noreferrer" className="group block">
                    <h3 className="font-display text-2xl sm:text-3xl font-normal text-content-primary group-hover:text-accent transition-colors duration-200">
                      {featuredProject.title}
                    </h3>
                  </a>
                  <p className="font-body text-base text-content-secondary mt-4 leading-relaxed max-w-[60ch]">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {featuredProject.tech.map((tech) => (
                      <TechTag key={tech} name={tech} />
                    ))}
                  </div>
                  <div className="flex gap-4 mt-8">
                    <a
                      href={featuredProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-body text-sm text-content-primary hover:text-accent transition-colors duration-200"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Repository</span>
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="rounded-xl border border-canvas-border/30 overflow-hidden bg-canvas-surface">
                    <video
                      src="/videos/arcade-demo.mp4"
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-auto rounded-xl"
                      poster=""
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Regular Projects — 2-Column Grid with stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {regularProjects.map((project, idx) => (
            <ScrollReveal key={project.title} delay={0.1 + idx * 0.1}>
              <SpotlightCard className="h-full">
                <div className="p-6 flex flex-col h-full">
                  <span className="font-body text-xs text-accent/70 uppercase tracking-wider block mb-3">
                    {project.category}
                  </span>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <h3 className="font-display text-xl sm:text-2xl font-normal text-content-primary group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h3>
                  </a>
                  <p className="font-body text-sm text-content-secondary mt-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <TechTag key={tech} name={tech} />
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.github} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 font-body text-sm text-content-muted hover:text-accent transition-colors duration-200">
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a href={project.github} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 font-body text-sm text-content-muted hover:text-accent transition-colors duration-200">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}