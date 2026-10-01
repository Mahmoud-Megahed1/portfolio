import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const services = [
  { title: 'Landing Page Development', description: 'Create responsive landing pages with modern design and optimized performance.', tags: ['Responsive', 'SEO', 'Performance'] },
  { title: 'SQL Queries & Database Design', description: 'Design efficient database schemas and write optimized SQL queries.', tags: ['SQL Server', 'Optimization', 'Data Modeling'] },
  { title: 'Clean Architecture & System Design', description: 'Architect decoupled, maintainable backend systems using Clean Architecture and DDD.', tags: ['Clean Architecture', 'CQRS', 'DDD'] },
  { title: 'RESTful API Development', description: 'Build scalable and secure APIs with proper documentation and testing.', tags: ['REST', 'Auth', 'Swagger'] },
  { title: 'Fullstack .NET Projects', description: 'Complete web applications from database design to user interface.', tags: ['.NET Core', 'EF Core', 'React'] },
  { title: 'Performance Optimization', description: 'Optimize existing applications for better performance and scalability.', tags: ['Profiling', 'Caching', 'Scalability'] },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 border-t border-canvas-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-left">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-content-primary tracking-tight">What I Can Build for You</h2>
          </div>
        </ScrollReveal>

        <div className="mt-12 flex flex-col">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="group border-b border-canvas-border/20 py-6 hover:bg-canvas-surface/30 transition-all duration-300 rounded-lg px-4 -mx-4 cursor-default">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <h3 className="font-display text-xl sm:text-2xl font-normal text-content-primary group-hover:text-accent transition-colors duration-200">{service.title}</h3>
                    <p className="font-body text-sm text-content-secondary mt-1 max-w-[50ch]">{service.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs font-body px-2.5 py-1 rounded bg-canvas-elevated text-content-secondary border border-canvas-border/40">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}