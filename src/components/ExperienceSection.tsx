import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SpotlightCard } from '@/components/ui/spotlight';
import { SiDotnet } from '@icons-pack/react-simple-icons';
import { Database, Layers } from 'lucide-react';

interface ExperienceItem {
  role: string;
  institution: string;
  period: string;
  highlights: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Full Stack .NET Workshop Participant',
    institution: 'Information Technology Institute (ITI), Egypt',
    period: '2025 – 2026',
    highlights: [
      'Completed intensive training program covering advanced ASP.NET Core patterns, C# best practices, and Entity Framework optimization techniques.',
      'Designed and implemented database schemas in SQL Server with focus on normalization and query optimization.',
      'Built multiple small-scale projects demonstrating proficiency in full-stack development using the .NET ecosystem.',
    ],
    skills: [
      'ASP.NET Core',
      'C#',
      'Entity Framework Core',
      'SQL Server',
      'Database Normalization',
      'Architecture Patterns',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-canvas-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="max-w-[60ch]">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-content-primary tracking-tight">
              Experience & Training
            </h2>
            <p className="font-body text-base text-content-secondary mt-4 max-w-[50ch]">
              Intensive professional programs and industry-led mentorship bridging theoretical foundation with production-grade engineering.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 space-y-6">
          {experiences.map((exp, idx) => (
            <ScrollReveal key={idx} delay={0.1}>
              <SpotlightCard className="p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-accent/90">
                        <SiDotnet className="w-5 h-5" />
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-normal text-content-primary group-hover:text-accent transition-colors duration-200">
                        {exp.role}
                      </h3>
                    </div>
                    <p className="font-body text-sm font-medium text-content-secondary">
                      {exp.institution}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body bg-canvas-elevated text-accent border border-accent/20 shrink-0 self-start">
                    {exp.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-3 font-body text-sm text-content-secondary leading-relaxed">
                  {exp.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-canvas-border/30 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-body px-2.5 py-1 rounded bg-canvas-elevated text-content-secondary border border-canvas-border/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
