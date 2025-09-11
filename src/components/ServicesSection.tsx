import { Globe, Database, FileText, Code, Layers, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: 'Landing Page Development',
      description: 'Create stunning, responsive landing pages that convert visitors into customers with modern design and optimized performance.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading']
    },
    {
      icon: Database,
      title: 'SQL Queries & Database Design',
      description: 'Design efficient database schemas and write optimized SQL queries for better performance and data integrity.',
      features: ['Database Optimization', 'Query Performance', 'Data Modeling']
    },
    {
      icon: FileText,
      title: 'Data Entry & Automation',
      description: 'Automate repetitive data entry tasks and create systems that streamline your business processes.',
      features: ['Process Automation', 'Data Validation', 'Bulk Operations']
    },
    {
      icon: Code,
      title: 'RESTful API Development',
      description: 'Build scalable and secure APIs that power your applications with proper documentation and testing.',
      features: ['REST Standards', 'Authentication', 'Documentation']
    },
    {
      icon: Layers,
      title: 'Fullstack .NET Projects',
      description: 'Complete web applications using .NET Core, from database design to user interface implementation.',
      features: ['End-to-End Development', 'Modern Architecture', 'Clean Code']
    },
    {
      icon: BarChart,
      title: 'Performance Optimization',
      description: 'Optimize existing applications for better performance, scalability, and user experience.',
      features: ['Code Review', 'Performance Tuning', 'Scalability']
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Comprehensive development services to help your business succeed in the digital world
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass hover-lift group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-smooth">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-gradient transition-smooth">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-foreground/60">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;