import { ExternalLink, Github, Globe, Database, Code, ShoppingBag, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PortfolioSection = () => {
  const projects = [
    {
      title: 'Arcade Electronics (E-Commerce)',
      description: 'Enterprise e-commerce platform for gaming & electronics with real-time cart, order lifecycle management, admin dashboard, and cyberpunk theme.',
      image: ShoppingBag,
      tech: ['.NET 10', 'ASP.NET Core', 'EF Core', 'SQL Server'],
      category: 'Fullstack',
      github: 'https://github.com/Mahmoud-Megahed1/Arcade-Electronics',
      link: 'https://github.com/Mahmoud-Megahed1/Arcade-Electronics'
    },
    {
      title: 'On-Demand Delivery & Logistics Platform',
      description: 'Enterprise multi-vendor logistics and dispatching system with real-time tracking, Stripe and PayPal integration, and hybrid data persistence.',
      image: Database,
      tech: ['Laravel', 'Firebase', 'MongoDB', 'MySQL', 'Stripe'],
      category: 'Backend',
      github: 'https://github.com/Mahmoud-Megahed1/on-demand-delivery-platform',
      link: 'https://github.com/Mahmoud-Megahed1/on-demand-delivery-platform'
    },
    {
      title: 'Care Clinic Headless Storefront',
      description: 'Modern headless e-commerce storefront for medical wellness with Shopify Storefront API integration, slide-out cart drawer, and native RTL support.',
      image: Globe,
      tech: ['React 19', 'Vite', 'Tailwind CSS', 'Shopify API'],
      category: 'Frontend',
      github: 'https://github.com/Mahmoud-Megahed1/care-clinic-headless-storefront',
      link: 'https://github.com/Mahmoud-Megahed1/care-clinic-headless-storefront'
    },
    {
      title: 'Arcade DEPI Architecture Deck',
      description: 'Interactive presentation deck and architectural schema diagrams created for the Digital Egypt Pioneers Initiative (DEPI / MCIT) capstone evaluation.',
      image: Layers,
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Database Architecture'],
      category: 'Fullstack',
      github: 'https://github.com/Mahmoud-Megahed1/arcade-depi-presentation',
      link: 'https://github.com/Mahmoud-Megahed1/arcade-depi-presentation'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Backend':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Fullstack':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Showcase of recent projects demonstrating my skills in fullstack development
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="glass hover-lift group animate-fade-in-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="p-0">
                  {/* Project Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                    <project.image className="w-16 h-16 text-primary/60" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-lg group-hover:text-gradient transition-smooth">
                      {project.title}
                    </CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted/50 rounded-md text-xs text-foreground/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 hover-glow"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12 animate-fade-in">
            <Button variant="outline" className="hover-lift">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;