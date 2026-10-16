import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Layout, Database, Layers, Globe, Server, Zap, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Layout,
    title: 'Landing Page & Modern UI Development',
    description: 'High-performance, accessible, and responsive web interfaces with smooth animations and zero AI-slop design.',
    tags: ['React 19', 'Tailwind', 'GSAP', 'TypeScript'],
  },
  {
    icon: Database,
    title: 'SQL Queries & Database Architecture',
    description: 'Relational schema modeling, index tuning, normalization, and complex query optimization on SQL Server.',
    tags: ['SQL Server', 'EF Core', 'Indexing', 'Profiling'],
  },
  {
    icon: Layers,
    title: 'Clean Architecture & Enterprise System Design',
    description: 'Decoupled, maintainable enterprise backends structured with Domain-Driven Design, CQRS, and Result patterns.',
    tags: ['Clean Architecture', 'CQRS', 'DDD', 'SOLID'],
  },
  {
    icon: Globe,
    title: 'RESTful API Engineering & Integration',
    description: 'Production-ready ASP.NET Core APIs with JWT security, standardized error handling, and Swagger documentation.',
    tags: ['ASP.NET Core', 'REST', 'JWT Auth', 'Validation'],
  },
  {
    icon: Server,
    title: 'Fullstack .NET Production Solutions',
    description: 'End-to-end applications bridging robust C# backends with modern React frontend clients.',
    tags: ['.NET 10', 'C#', 'React', 'RESTful APIs'],
  },
  {
    icon: Zap,
    title: 'Algorithmic Optimization & Performance Tuning',
    description: 'Refactoring bottlenecks and optimizing memory/CPU consumption applying competitive programming algorithmic rigor.',
    tags: ['Algorithms', 'Complexity Analysis', 'Caching', 'High Throughput'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 border-t border-canvas-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-left max-w-[60ch]">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-content-primary tracking-tight">
              What I Build for Clients & Teams
            </h2>
            <p className="font-body text-base text-content-secondary mt-3">
              Full-lifecycle software engineering from database schemas to high-performance user interfaces.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.06}>
                <div className="group h-full p-6 sm:p-7 rounded-2xl bg-canvas-surface/60 border border-canvas-border/40 hover:border-accent/40 hover:bg-canvas-elevated/70 transition-all duration-300 flex flex-col justify-between shadow-sm cursor-default">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-canvas-elevated flex items-center justify-center border border-canvas-border/50 text-accent/80 group-hover:text-accent group-hover:border-accent/30 transition-all duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-medium text-content-primary group-hover:text-accent transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm text-content-secondary mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-canvas-border/30">
                    {service.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs font-body px-2.5 py-0.5 rounded-md bg-canvas-base text-content-muted border border-canvas-border/40 group-hover:border-accent/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}