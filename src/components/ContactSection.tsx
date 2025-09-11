import { useState } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Send, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mahmoudmaghed30@gmail.com',
      link: 'mailto:mahmoudmaghed30@gmail.com'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'mahmoudmegahedd',
      link: 'https://www.linkedin.com/in/mahmoudmegahedd/'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Mahmoud-Megahed1',
      link: 'https://github.com/Mahmoud-Megahed1'
    },
    {
      icon: ExternalLink,
      label: 'Khamsat',
      value: 'mahmoudmegahedd',
      link: 'https://khamsat.com/user/mahmoudmegahedd'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's Work <span className="text-gradient">Together</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Ready to start your next project? Get in touch and let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass hover-lift animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-2xl text-gradient">Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-muted/50 border-border focus:border-primary transition-smooth"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-muted/50 border-border focus:border-primary transition-smooth"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-muted/50 border-border focus:border-primary transition-smooth resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-hero-gradient hover:scale-105 transition-spring shadow-primary hover-glow" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="animate-fade-in-up">
              <Card className="glass mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Get in touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    I'm always open to discussing new opportunities, creative projects, 
                    or just having a chat about technology. Feel free to reach out!
                  </p>
                  
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth group"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-gradient transition-smooth">{info.label}</p>
                          <p className="text-sm text-foreground/70">{info.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability Status */}
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium text-green-400">Available for Work</span>
                  </div>
                  <p className="text-sm text-foreground/70">
                    I'm currently accepting new freelance projects and collaborations. 
                    Let's discuss how I can help bring your ideas to life!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;