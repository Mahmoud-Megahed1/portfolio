import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import {
  SiDotnet,
  SiReact,
  SiTypescript,
} from '@icons-pack/react-simple-icons';
import { Layers, Cpu, Database } from 'lucide-react';

const skills = [
  { name: 'ASP.NET Core & C#', icon: <SiDotnet className="w-4 h-4" /> },
  { name: 'SQL Server & EF Core', icon: <Database className="w-4 h-4" /> },
  { name: 'React & TypeScript', icon: <SiReact className="w-4 h-4" /> },
  { name: 'Clean Architecture & DDD', icon: <Layers className="w-4 h-4" /> },
  { name: 'RESTful API Design', icon: <SiDotnet className="w-4 h-4" /> },
  { name: 'Problem Solving & Algorithms', icon: <Cpu className="w-4 h-4" /> },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-canvas-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="text-left">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-content-primary tracking-tight">
              The Engineer Behind the Code
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12">
          <ScrollReveal className="lg:col-span-5" delay={0.1}>
            <div className="rounded-xl overflow-hidden border border-canvas-border/30 group">
              <img
                src="/photos/612253f3-1873-447c-b42f-2552818fe736.png"
                alt="Mahmoud Mohamed Megahed"
                className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-display text-lg font-medium text-content-primary">Mahmoud Megahed</h3>
              <p className="font-body text-sm text-content-muted mt-1">Software Engineer & .NET Specialist</p>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal delay={0.2}>
              <div className="font-body text-content-secondary text-base leading-relaxed max-w-[60ch] space-y-6">
                <p>I am a Software Engineer and Fullstack .NET Developer with a solid background in Competitive Programming (ECPC Finalist). I specialize in designing and engineering scalable enterprise systems, robust RESTful APIs, and maintainable architectures using ASP.NET Core, EF Core, and modern frontend frameworks.</p>
                <p>My competitive programming journey trained me to optimize algorithm complexity, master data structures, and write clean, battle-tested code. I am passionate about Clean Architecture, performance optimization, and collaborating on high-impact projects.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 group cursor-default">
                      <span className="text-accent/70 group-hover:text-accent transition-colors duration-200">{skill.icon}</span>
                      <span className="font-body text-sm text-content-secondary group-hover:text-content-primary transition-colors duration-200">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
