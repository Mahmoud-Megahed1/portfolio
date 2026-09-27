import { User, Code, Database, Globe, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const skills = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'React, TypeScript, Tailwind CSS'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: '.NET Core, C#, SQL Server'
    },
    {
      icon: Globe,
      title: 'API & Architecture',
      description: 'RESTful APIs, Clean Architecture'
    },
    {
      icon: Trophy,
      title: 'Problem Solving',
      description: 'ECPC Finalist, Advanced Algorithms'
    }
  ];

  return (
    <section id="about" className="py-20 bg-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Passionate about creating efficient solutions and helping businesses grow
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Professional Photo */}
            <div className="animate-fade-in-up">
              <Card className="glass hover-lift">
                <CardContent className="p-8">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6">
                    <img 
                      src="/photos/612253f3-1873-447c-b42f-2552818fe736.png"
                      alt="Mahmoud Mohamed Megahed - Professional Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Mahmoud Mohamed Megahed</h3>
                    <p className="text-foreground/60">Software Engineer & .NET Specialist</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About Content */}
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6">My Story</h3>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  I am a Software Engineer and Fullstack .NET Developer with a solid background in Competitive Programming (ECPC Finalist). 
                  I specialize in designing and engineering scalable enterprise systems, robust RESTful APIs, and maintainable architectures 
                  using ASP.NET Core, EF Core, and modern frontend frameworks.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  My competitive programming journey trained me to optimize algorithm complexity, master data structures, 
                  and write clean, battle-tested code. I am passionate about Clean Architecture, performance optimization, and collaborating on high-impact projects.
                </p>
              </div>

              {/* Skills */}
              <div className="grid gap-4">
                {skills.map((skill, index) => (
                  <Card key={index} className="glass hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <skill.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{skill.title}</h4>
                          <p className="text-sm text-foreground/70">{skill.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
