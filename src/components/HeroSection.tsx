import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { FlipWords } from '@/components/ui/flip-words';
import { GridBackground } from '@/components/animations/GridBackground';
import { Spotlight } from '@/components/ui/spotlight';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const roles = [".NET Developer", "Problem Solver", "API Architect", "ECPC Finalist"];

  // One authored entrance timeline — Impeccable: not scattered identical effects
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from('.hero-badge', {
      opacity: 0, x: -30, duration: 0.7,
    })
    .from('.hero-name-light', {
      opacity: 0, y: 60, filter: 'blur(12px)', duration: 1,
    }, '-=0.3')
    .from('.hero-name-bold', {
      opacity: 0, y: 60, filter: 'blur(12px)', duration: 1,
    }, '-=0.7')
    .from('.hero-subtitle', {
      opacity: 0, y: 20, clipPath: 'inset(0 100% 0 0)', duration: 0.8,
    }, '-=0.5')
    .to('.hero-subtitle', {
      clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'expo.out',
    }, '<')
    .from('.hero-desc', {
      opacity: 0, y: 20, duration: 0.6,
    }, '-=0.4')
    .from('.hero-cta', {
      opacity: 0, y: 20, scale: 0.95, duration: 0.6,
    }, '-=0.3');

    // Stats: count up with ScrollTrigger (separate authored moment)
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.stat-number');
      counters.forEach((el) => {
        const target = parseInt(el.getAttribute('data-value') || '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (el.getAttribute('data-suffix') || '');
          },
        });
      });

      gsap.from('.stat-item', {
        opacity: 0, y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section id="home" ref={containerRef} className="min-h-screen flex items-center relative overflow-hidden bg-canvas-base">
      <GridBackground />
      <Spotlight className="-top-40 left-0 md:left-60" fill="hsl(172 66% 50%)" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col items-start max-w-5xl pt-28 pb-20">

          {/* Badge */}
          <div className="hero-badge flex items-center gap-3 mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-body text-xs tracking-widest uppercase text-accent select-none">
              Available for Work
            </span>
          </div>

          {/* Name — massive weight inversion with GSAP blur+translate */}
          <h1 className="font-display text-content-primary tracking-tighter leading-[0.95]">
            <span className="hero-name-light block text-5xl sm:text-7xl lg:text-[6rem] font-extralight">
              Mahmoud
            </span>
            <span className="hero-name-bold block text-5xl sm:text-7xl lg:text-[6rem] font-bold mt-1">
              Megahed
            </span>
          </h1>

          {/* Subtitle with FlipWords + clipPath reveal */}
          <div className="hero-subtitle font-display text-xl sm:text-2xl lg:text-3xl text-content-secondary mt-8 flex items-center gap-2 flex-wrap">
            <span>Fullstack</span>
            <FlipWords words={roles} duration={2500} />
          </div>

          {/* Description */}
          <p className="hero-desc font-body text-content-muted text-base sm:text-lg max-w-[55ch] mt-6 leading-relaxed">
            Building scalable enterprise systems with Clean Architecture, RESTful APIs,
            and modern .NET stack. 500+ algorithmic problems solved on Codeforces.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-wrap gap-4 mt-12">
            <a
              href="#contact"
              className="group relative bg-accent text-accent-foreground font-body font-semibold text-sm px-8 py-4 rounded-xl flex items-center justify-center transition-all duration-300 hover:brightness-110 active:scale-[0.97] shadow-[0_0_30px_hsl(172_66%_50%/0.3),inset_0_1px_0_hsl(172_66%_70%/0.3)] hover:shadow-[0_0_50px_hsl(172_66%_50%/0.5)]"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            <a
              href="#portfolio"
              className="font-body font-medium text-sm px-8 py-4 rounded-xl border border-canvas-border/40 text-content-secondary hover:text-content-primary hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
            >
              View My Work
            </a>
          </div>

          {/* Stats with GSAP ScrollTrigger count-up */}
          <div ref={statsRef} className="mt-24 flex flex-wrap gap-0">
            <div className="stat-item pr-10 sm:pr-16">
              <span className="stat-number font-display text-4xl sm:text-5xl font-bold text-content-primary tabular-nums" data-value="500" data-suffix="+">0</span>
              <div className="font-body text-xs text-content-muted uppercase tracking-widest mt-2">Problems Solved</div>
            </div>
            <div className="stat-item border-l border-canvas-border/30 pl-10 sm:pl-16 pr-10 sm:pr-16">
              <span className="stat-number font-display text-4xl sm:text-5xl font-bold text-content-primary tabular-nums" data-value="4">0</span>
              <div className="font-body text-xs text-content-muted uppercase tracking-widest mt-2">Production Projects</div>
            </div>
            <div className="stat-item border-l border-canvas-border/30 pl-10 sm:pl-16">
              <div className="font-display text-4xl sm:text-5xl font-bold text-accent">ECPC</div>
              <div className="font-body text-xs text-content-muted uppercase tracking-widest mt-2">Finalist</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}