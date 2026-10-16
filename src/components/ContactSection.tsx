import React, { useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Mail, Linkedin, Github, ExternalLink, Send, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArchitectureCore3D } from '@/components/ui/architecture-3d-core';
import { Globe } from '@/components/ui/globe';
import { cn } from '@/lib/utils';

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'mahmoudmaghed30@gmail.com', href: 'mailto:mahmoudmaghed30@gmail.com', copyable: true },
  { icon: Linkedin, label: 'LinkedIn', value: 'mahmoud---megahed', href: 'https://linkedin.com/in/mahmoud---megahed', copyable: false },
  { icon: Github, label: 'GitHub', value: 'Mahmoud-Megahed1', href: 'https://github.com/Mahmoud-Megahed1', copyable: false },
  { icon: ExternalLink, label: 'Khamsat', value: 'mahmoudmegahedd', href: 'https://khamsat.com/user/mahmoudmegahedd', copyable: false },
];

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showView, setShowView] = useState<'globe' | 'core'>('globe');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      toast.success('Message Sent Successfully!', {
        description: 'Thank you for reaching out. I will get back to you shortly.',
      });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleCopy = (e: React.MouseEvent, text: string, index: number, label: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success(`${label} copied to clipboard!`, {
      description: text,
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-canvas-border/20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-[60ch]">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-content-primary tracking-tight">Let's Work Together</h2>
            <p className="font-body text-base text-content-secondary mt-3 max-w-[50ch]">I'm currently available for freelance work, enterprise contracts, and full-time opportunities.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name"
                className="w-full bg-canvas-surface border border-canvas-border/40 rounded-xl px-4 py-3 font-body text-sm text-content-primary placeholder:text-content-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email Address"
                className="w-full bg-canvas-surface border border-canvas-border/40 rounded-xl px-4 py-3 font-body text-sm text-content-primary placeholder:text-content-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200" />
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Your Message or Project Details..."
                className="w-full bg-canvas-surface border border-canvas-border/40 rounded-xl px-4 py-3 font-body text-sm text-content-primary placeholder:text-content-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 resize-none" />
              <motion.button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-body font-semibold text-sm py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 shadow-[0_0_20px_hsl(172_66%_50%/0.25)] hover:shadow-[0_0_30px_hsl(172_66%_50%/0.4)] mt-2"
                whileTap={{ scale: 0.98 }}
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : <><span>Send Message</span><Send className="w-4 h-4" /></>}
              </motion.button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-3">
              {contactLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-canvas-surface/60 border border-canvas-border/40 hover:border-accent/40 hover:bg-canvas-elevated/70 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-canvas-elevated flex items-center justify-center border border-canvas-border/40 text-accent group-hover:border-accent/30 transition-colors">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-content-muted uppercase tracking-wider">{link.label}</div>
                      <div className="font-body text-sm font-medium text-content-primary group-hover:text-accent transition-colors">{link.value}</div>
                    </div>
                  </div>

                  {link.copyable && (
                    <button
                      type="button"
                      onClick={(e) => handleCopy(e, link.value, i, link.label)}
                      className="p-2 rounded-lg bg-canvas-base border border-canvas-border/50 text-content-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === i ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </a>
              ))}

              <div className="mt-4 p-6 rounded-2xl bg-canvas-surface/80 border border-canvas-border/50 overflow-hidden relative shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="font-body text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Available for Immediate Onboarding
                    </span>
                  </div>

                  {/* Dual Mode Switcher: Globe vs Three.js Architecture Core */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-canvas-base border border-canvas-border/50 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setShowView('globe')}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200",
                        showView === 'globe'
                          ? "bg-accent text-accent-foreground shadow-sm font-semibold"
                          : "text-content-muted hover:text-content-primary"
                      )}
                    >
                      🌐 Global Reach
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowView('core')}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200",
                        showView === 'core'
                          ? "bg-accent text-accent-foreground shadow-sm font-semibold"
                          : "text-content-muted hover:text-content-primary"
                      )}
                    >
                      ⚡ 3D Architecture Core
                    </button>
                  </div>
                </div>

                <p className="font-body text-xs text-content-secondary leading-relaxed">
                  Base: <strong className="text-content-primary">Egypt (UTC+2)</strong> • Open for Remote Worldwide, Enterprise Contracts & Hybrid Engagements.
                </p>

                <div className="w-full max-w-[340px] mx-auto mt-2 aspect-square flex items-center justify-center">
                  {showView === 'globe' ? (
                    <Globe className="w-full h-full" />
                  ) : (
                    <ArchitectureCore3D className="w-full h-full" />
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-canvas-border/40 flex items-center justify-between text-[11px] text-content-muted font-body">
                  {showView === 'globe' ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                        <span className="text-content-secondary font-medium">Egypt (HQ)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                        <span>Regional & Global Hubs</span>
                      </div>
                      <span className="text-content-muted/70 font-mono">WebGL 60FPS</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                        <span className="text-content-secondary font-medium">Clean Architecture</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                        <span>CQRS & Event Streams</span>
                      </div>
                      <span className="text-content-muted/70 font-mono">Three.js 60FPS</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}