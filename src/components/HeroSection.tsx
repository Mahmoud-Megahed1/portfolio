import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Greeting / Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium mb-4 animate-bounce-subtle text-gradient">
              🏆 ECPC Finalist | Software Engineer & .NET Developer
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{' '}
            <span className="text-gradient">
              Mahmoud Mohamed Megahed
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 text-foreground/90">
            Fullstack .NET Developer & Problem Solver
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Specializing in scalable enterprise systems, Clean Architecture, RESTful APIs, and efficient databases.
            Combining competitive programming problem-solving with robust software engineering.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToContact}
              className="bg-hero-gradient hover:scale-105 transition-spring shadow-primary text-lg px-8 py-6 hover-glow"
            >
              Hire Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={scrollToPortfolio}
              className="border-primary/50 hover:border-primary hover:bg-primary/10 text-lg px-8 py-6 transition-spring hover-lift"
            >
              View My Work
              <Download className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce-subtle">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce-subtle" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full animate-glow hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-secondary/10 rounded-full animate-glow hidden lg:block" />
    </section>
  );
};

export default HeroSection;