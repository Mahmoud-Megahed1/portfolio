import React, { useState } from 'react';
import { ExternalLink, Github, Database, Layers, Cpu, Server, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SpotlightCard } from '@/components/ui/spotlight';
import { BorderBeam } from '@/components/ui/border-beam';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
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
    <span className="inline-flex items-center gap-1.5 font-body text-xs px-2.5 py-1 rounded-md bg-canvas-elevated text-content-secondary border border-canvas-border/40 hover:border-accent/30 transition-colors duration-200">
      {icon && <span className="text-accent/80">{icon}</span>}
      {name}
    </span>
  );
}

export function PortfolioSection() {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'FULLSTACK' | 'BACKEND' | 'FRONTEND'>('ALL');
  const featuredProject = projects.find(p => p.featured);
  
  const regularProjects = projects.filter(p => !p.featured);
  const filteredProjects = selectedFilter === 'ALL' 
    ? regularProjects 
    : regularProjects.filter(p => p.category === selectedFilter);

  const categories = ['ALL', 'FULLSTACK', 'BACKEND', 'FRONTEND'] as const;

  return (
    <section id="portfolio" className="py-24 md:py-32 border-t border-canvas-border/20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-[60ch]">
              <h2 className="font-display font-medium text-3xl sm:text-4xl text-content-primary tracking-tight">
                Selected Work & Architectures
              </h2>
              <p className="font-body text-base text-content-secondary mt-3">
                Production-grade applications demonstrating Clean Architecture, distributed patterns, and high-performance frontend interfaces.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-canvas-surface border border-canvas-border/40 backdrop-blur-md self-start md:self-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`relative font-body text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors duration-200 ${
                    selectedFilter === cat
                      ? 'text-accent font-semibold'
                      : 'text-content-muted hover:text-content-primary'
                  }`}
                >
                  {cat}
                  {selectedFilter === cat && (
                    <motion.div
                      layoutId="portfolioFilter"
                      className="absolute inset-0 rounded-full bg-accent/10 border border-accent/30 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Project — Asymmetric Hero Layout */}
        {featuredProject && (selectedFilter === 'ALL' || selectedFilter === featuredProject.category) && (
          <ScrollReveal delay={0.15}>
            <div className="mt-12 pt-10 border-t border-canvas-border/20">
              <div className="relative rounded-2xl border border-canvas-border/40 bg-canvas-surface/70 backdrop-blur-md p-6 sm:p-10 overflow-hidden shadow-xl">
                <BorderBeam size={100} duration={8} colorFrom="hsl(172 66% 50%)" colorTo="hsl(217 91% 60%)" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent font-body text-xs font-semibold uppercase tracking-wider mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Featured Project • {featuredProject.category}
                    </div>
                    <a href={featuredProject.github} target="_blank" rel="noreferrer" className="group block">
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-content-primary group-hover:text-accent transition-colors duration-200">
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
                    <div className="flex flex-wrap items-center gap-4 mt-8">
                      <motion.a
                        href={featuredProject.github}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 font-body text-sm px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold hover:brightness-110 shadow-[0_0_20px_hsl(172_66%_50%/0.25)] transition-all duration-200"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Repository</span>
                      </motion.a>

                      {/* Interactive Architecture Deep Dive Drawer */}
                      <Drawer>
                        <DrawerTrigger asChild>
                          <button className="flex items-center gap-2 font-body text-sm px-4 py-2.5 rounded-xl border border-canvas-border/50 text-content-secondary hover:text-content-primary hover:border-accent/40 bg-canvas-elevated/50 transition-all duration-200">
                            <Layers className="w-4 h-4 text-accent" />
                            <span>System Specs</span>
                          </button>
                        </DrawerTrigger>
                        <DrawerContent className="bg-canvas-base border-t border-canvas-border/40 text-content-primary max-w-4xl mx-auto px-6 pb-8">
                          <DrawerHeader className="text-left px-0 pt-6">
                            <div className="flex items-center gap-2 text-accent text-xs font-mono mb-1 uppercase tracking-wider">
                              <ShieldCheck className="w-4 h-4" />
                              Architecture Blueprint
                            </div>
                            <DrawerTitle className="font-display text-2xl font-semibold text-content-primary">
                              Arcade Electronics — Clean Architecture Specs
                            </DrawerTitle>
                            <DrawerDescription className="font-body text-content-secondary text-sm mt-1">
                              Engineered with Domain-Driven Design (DDD), CQRS, Unit of Work, and ASP.NET Core 10 Web API.
                            </DrawerDescription>
                          </DrawerHeader>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-canvas-surface border border-canvas-border/40">
                              <div className="flex items-center gap-2 text-accent font-medium text-sm font-display mb-2">
                                <Cpu className="w-4 h-4" />
                                Core Domain & Application Layer
                              </div>
                              <ul className="text-xs font-body text-content-secondary space-y-1.5 list-disc list-inside">
                                <li>Decoupled Domain Entities without ORM dependencies</li>
                                <li>Strongly-typed DTOs preventing circular serialization</li>
                                <li>CQRS pattern separation of read/write flows</li>
                                <li>FluentValidation for incoming command contracts</li>
                              </ul>
                            </div>

                            <div className="p-4 rounded-xl bg-canvas-surface border border-canvas-border/40">
                              <div className="flex items-center gap-2 text-accent font-medium text-sm font-display mb-2">
                                <Server className="w-4 h-4" />
                                Infrastructure & Data Persistence
                              </div>
                              <ul className="text-xs font-body text-content-secondary space-y-1.5 list-disc list-inside">
                                <li>EF Core 10 with Code-First Migrations & SQL Server</li>
                                <li>Repository Pattern + Unit of Work for atomic transactions</li>
                                <li>Optimized queries using AsNoTracking & projection</li>
                                <li>JWT Bearer Authentication & Role-based Authorization</li>
                              </ul>
                            </div>
                          </div>

                          <div className="mt-6 flex justify-end">
                            <DrawerClose asChild>
                              <button className="px-5 py-2 rounded-lg bg-canvas-elevated border border-canvas-border text-sm font-body text-content-secondary hover:text-content-primary">
                                Close
                              </button>
                            </DrawerClose>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </div>
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="relative rounded-xl border border-canvas-border/40 overflow-hidden bg-canvas-base shadow-2xl">
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
            </div>
          </ScrollReveal>
        )}

        {/* Filtered Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <SpotlightCard className="h-full">
                  <div className="p-6 sm:p-7 flex flex-col h-full justify-between">
                    <div>
                      <span className="font-body text-xs text-accent/80 font-medium uppercase tracking-wider block mb-2.5">
                        {project.category}
                      </span>
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <h3 className="font-display text-xl sm:text-2xl font-medium text-content-primary group-hover:text-accent transition-colors duration-200">
                          {project.title}
                        </h3>
                      </a>
                      <p className="font-body text-sm text-content-secondary mt-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <TechTag key={tech} name={tech} />
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t border-canvas-border/30">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-body text-xs font-medium text-accent hover:underline transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Codebase</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}