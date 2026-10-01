import React, { useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Mail, Linkedin, Github, ExternalLink, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'mahmoudmaghed30@gmail.com', href: 'mailto:mahmoudmaghed30@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'mahmoud---megahed', href: 'https://linkedin.com/in/mahmoud---megahed' },
  { icon: Github, label: 'GitHub', value: 'Mahmoud-Megahed1', href: 'https://github.com/Mahmoud-Megahed1' },
  { icon: ExternalLink, label: 'Khamsat', value: 'mahmoudmegahedd', href: 'https://khamsat.com/user/mahmoudmegahedd' },
];

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
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
            <p className="font-body text-base text-content-secondary mt-3 max-w-[50ch]">I'm currently available for freelance work and full-time opportunities.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name"
                className="w-full bg-canvas-surface border border-canvas-border/40 rounded-lg px-4 py-3 font-body text-sm text-content-primary placeholder:text-content-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email"
                className="w-full bg-canvas-surface border border-canvas-border/40 rounded-lg px-4 py-3 font-body text-sm text-content-primary placeholder:text-content-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200" />
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Message"
                className="w-full bg-canvas-surface border border-canvas-border/40 rounded-lg px-4 py-3 font-body text-sm text-content-primary placeholder:text-content-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-200 resize-none" />
              <motion.button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-body font-medium text-sm py-3.5 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 shadow-[0_0_15px_hsl(172_66%_50%/0.2)] hover:shadow-[0_0_25px_hsl(172_66%_50%/0.3)] mt-2"
                whileTap={{ scale: 0.98 }}
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : <><span>Send Message</span><Send className="w-4 h-4" /></>}
              </motion.button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-2">
              {contactLinks.map((link, i) => (
                <a key={i} href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer"
                  className="flex items-center gap-4 py-3 px-4 -ml-4 rounded-lg hover:bg-canvas-surface/50 transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-canvas-surface flex items-center justify-center border border-canvas-border/30 group-hover:border-accent/30 transition-colors">
                    <link.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-body text-sm font-medium text-content-primary">{link.label}</div>
                    <div className="font-body text-sm text-content-muted group-hover:text-content-secondary transition-colors">{link.value}</div>
                  </div>
                </a>
              ))}

              <div className="mt-6 pt-8 border-t border-canvas-border/20">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
                  <span className="font-body text-sm font-medium text-emerald-400">Available for Work</span>
                </div>
                <p className="font-body text-sm text-content-muted mt-2 max-w-[40ch]">Currently accepting new projects and full-time positions.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}