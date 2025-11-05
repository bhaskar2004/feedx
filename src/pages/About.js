import React, { useEffect, useRef } from 'react';
import { Code, Rocket, Users, Lightbulb, TrendingUp, Heart, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroRef.current.style.opacity = 1 - scrolled / 600;
      }

      sectionsRef.current.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.8;
          if (inView) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    {
      icon: Code,
      title: "Quality Code",
      description: "Writing clean, maintainable, and efficient code that stands the test of time"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing new technologies and creative solutions to solve complex problems"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working together with teams to achieve greater results and shared success"
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "Always growing, adapting, and staying current with industry best practices"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Building fast, responsive applications that deliver exceptional user experiences"
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Putting users first in every design and development decision"
    }
  ];

  const expertise = [
    {
      category: "Frontend Development",
      items: ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design", "UI/UX Implementation"]
    },
    {
      category: "Backend & Database",
      items: ["Node.js", "RESTful APIs", "MySQL", "Database Design", "Authentication"]
    },
    {
      category: "Tools & Workflow",
      items: ["Git", "VS Code", "Chrome DevTools", "NPM", "Agile Methodology"]
    }
  ];

  const achievements = [
    {
      title: "Hackathon Participation",
      description: "Active participant in multiple hackathons including NextGen 2.0, Code Sprint 2.0, and Aventus 2.0",
      icon: Rocket
    },
    {
      title: "Project Portfolio",
      description: "Developed diverse projects ranging from management systems to accessibility solutions",
      icon: Code
    },
    {
      title: "Technical Growth",
      description: "Continuously expanding skillset through hands-on projects and modern development practices",
      icon: TrendingUp
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'bhaskar7676798351@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 7676798351',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Bengaluru, Karnataka',
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          
          {/* Hero Section with Parallax */}
          <div ref={heroRef} className="text-center pt-32 pb-48 md:pt-48 md:pb-64">
            <h1 className="font-mono font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight text-white mb-8 leading-none bg-clip-text bg-gradient-to-b from-white to-gray-400 animate-fade-in">
              About TechNews
            </h1>
            <p className="font-mono font-light text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed tracking-wide">
              Your trusted source for the latest technology news, innovations, and insights.
            </p>
            <div className="mt-20 flex justify-center">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-30 animate-scroll-indicator" />
            </div>
          </div>

          {/* Mission Statement with Glass Effect */}
          <div 
            ref={el => sectionsRef.current[0] = el}
            className="mb-48 md:mb-64 text-center opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <div className="relative inline-block">
              <h2 className="font-bold text-6xl md:text-8xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white mb-12 leading-tight">
                Our Mission
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 blur-2xl" />
            </div>
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-400 max-w-5xl mx-auto font-light">
              We strive to deliver comprehensive, accurate, and engaging technology news that empowers our readers
              to stay ahead in the fast-paced digital world. Through careful curation and thoughtful presentation,
              we make complex tech topics accessible and interesting for everyone.
            </p>
          </div>

          {/* Core Values - Grid without boxes */}
          <div 
            ref={el => sectionsRef.current[1] = el}
            className="mb-48 md:mb-64 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <h2 className="font-bold text-6xl md:text-8xl tracking-tighter text-white mb-24 text-center leading-tight">
              What We Value
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-24 md:gap-y-32">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="group relative"
                  >
                    <div className="mb-6 text-white transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={56} strokeWidth={1} />
                    </div>
                    <h3 className="font-semibold text-white mb-4 text-3xl tracking-tight">
                      {value.title}
                    </h3>
                    <p className="leading-relaxed text-gray-500 text-lg font-light max-w-xs">
                      {value.description}
                    </p>
                    <div className="absolute -bottom-8 left-0 w-0 h-px bg-gradient-to-r from-white to-transparent transition-all duration-700 group-hover:w-full" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical Expertise - List Style */}
          <div 
            ref={el => sectionsRef.current[2] = el}
            className="mb-48 md:mb-64 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <h2 className="font-bold text-6xl md:text-8xl tracking-tighter text-white mb-24 text-center leading-tight">
              Technical Foundation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-20">
              {expertise.map((expertiseGroup, index) => (
                <div key={index} className="group">
                  <h3 className="font-semibold text-white mb-10 text-3xl tracking-tight border-b border-white/10 pb-4 group-hover:border-white/30 transition-colors duration-500">
                    {expertiseGroup.category}
                  </h3>
                  <div className="space-y-6">
                    {expertiseGroup.items.map((skill, i) => (
                      <div key={i} className="flex items-baseline gap-4 group/item">
                        <span className="text-gray-600 text-sm font-mono w-8">0{i + 1}</span>
                        <p className="font-light text-gray-400 text-xl group-hover/item:text-white transition-colors duration-300">
                          {skill}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements - Clean Layout */}
          <div 
            ref={el => sectionsRef.current[3] = el}
            className="mb-48 md:mb-64 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <h2 className="font-bold text-6xl md:text-8xl tracking-tighter text-white mb-24 text-center leading-tight">
              Highlights
            </h2>
            <div className="space-y-20">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="group flex flex-col md:flex-row items-start gap-8 pb-20 border-b border-white/5 last:border-b-0 hover:border-white/20 transition-colors duration-500"
                  >
                    <div className="text-white flex-shrink-0 transform transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">
                      <Icon size={64} strokeWidth={0.75} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-4 text-4xl tracking-tight">
                        {achievement.title}
                      </h3>
                      <p className="leading-relaxed text-gray-500 text-xl font-light max-w-2xl">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Information - Minimal */}
          <div 
            ref={el => sectionsRef.current[4] = el}
            className="mb-48 md:mb-48 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <h2 className="font-bold text-6xl md:text-8xl tracking-tighter text-white mb-12 text-center leading-tight">
              Contact
            </h2>
            <p className="text-gray-500 mb-24 text-center text-xl font-light">
              Have questions? We're here to help.
            </p>

            <div className="max-w-3xl mx-auto space-y-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="group flex items-center gap-8 py-8 border-b border-white/5 hover:border-white/20 transition-all duration-500"
                  >
                    <div className="text-gray-600 group-hover:text-white transition-colors duration-500">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-600 text-sm font-mono mb-1 tracking-wider uppercase">
                        {info.title}
                      </h3>
                      <p className="text-white text-xl font-light group-hover:translate-x-2 transition-transform duration-500">
                        {info.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Closing Statement */}
          <div 
            ref={el => sectionsRef.current[5] = el}
            className="pb-32 text-center opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <h3 className="font-bold mb-8 text-white text-5xl md:text-7xl tracking-tighter leading-tight">
              Join Our Community
            </h3>
            <p className="max-w-3xl mx-auto leading-relaxed text-gray-500 text-2xl md:text-3xl font-light">
              Stay connected with the latest in technology. Whether you're a tech enthusiast, developer,
              or just curious about the digital world, TechNews is here to keep you informed and inspired.
            </p>
            <div className="mt-16 inline-block">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll-indicator {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 0.6;
            transform: translateY(20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;