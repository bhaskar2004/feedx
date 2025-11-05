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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      position: 'relative',
      overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }}>
      {/* Global Styles */}
      <style>{`
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

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        *:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.5);
          outline-offset: 4px;
        }
      `}</style>

      {/* Animated background gradients */}
      <div style={{ position: 'fixed', inset: 0, opacity: 0.3 }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: '384px',
          height: '384px',
          backgroundColor: '#fff',
          borderRadius: '9999px',
          mixBlendMode: 'overlay',
          filter: 'blur(96px)',
          animation: 'pulse-glow 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: '25%',
          width: '384px',
          height: '384px',
          backgroundColor: '#fff',
          borderRadius: '9999px',
          mixBlendMode: 'overlay',
          filter: 'blur(96px)',
          animation: 'pulse-glow 10s ease-in-out infinite',
          animationDelay: '2s'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Hero Section with Parallax */}
          <div ref={heroRef} style={{
            textAlign: 'center',
            paddingTop: '128px',
            paddingBottom: '192px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <h1 style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 8vw, 4.5rem)',
              letterSpacing: '-0.05em',
              color: '#fff',
              marginBottom: '32px',
              lineHeight: 1,
              background: 'linear-gradient(to bottom, #ffffff, #9ca3af)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1), gradient-shift 8s ease infinite'
            }}>
              About TechNews
            </h1>
            <p style={{
              fontFamily: 'monospace',
              fontWeight: 300,
              fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
              color: '#9ca3af',
              maxWidth: '896px',
              margin: '0 auto',
              lineHeight: 1.7,
              letterSpacing: '0.02em'
            }}>
              Your trusted source for the latest technology news, innovations, and insights.
            </p>
            <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '1px',
                height: '96px',
                background: 'linear-gradient(to bottom, transparent, #fff, transparent)',
                opacity: 0.3,
                animation: 'scroll-indicator 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
            </div>
          </div>

          {/* Mission Statement */}
          <div 
            ref={el => sectionsRef.current[0] = el}
            style={{
              marginBottom: '256px',
              textAlign: 'center',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <h2 style={{
                fontWeight: 700,
                fontSize: 'clamp(3.75rem, 10vw, 6rem)',
                letterSpacing: '-0.05em',
                background: 'linear-gradient(to right, #fff, #e5e7eb, #fff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '48px',
                lineHeight: 1.1,
                backgroundSize: '200% auto',
                animation: 'gradient-shift 8s ease infinite'
              }}>
                Our Mission
              </h2>
              <div style={{
                position: 'absolute',
                inset: '-16px',
                background: 'linear-gradient(to right, transparent, #fff, transparent)',
                opacity: 0.1,
                filter: 'blur(48px)',
                pointerEvents: 'none'
              }} />
            </div>
            <p style={{
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              lineHeight: 1.6,
              color: '#9ca3af',
              maxWidth: '1120px',
              margin: '0 auto',
              fontWeight: 300
            }}>
              We strive to deliver comprehensive, accurate, and engaging technology news that empowers our readers
              to stay ahead in the fast-paced digital world. Through careful curation and thoughtful presentation,
              we make complex tech topics accessible and interesting for everyone.
            </p>
          </div>

          {/* Core Values */}
          <div 
            ref={el => sectionsRef.current[1] = el}
            style={{
              marginBottom: '256px',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(3.75rem, 10vw, 6rem)',
              letterSpacing: '-0.05em',
              color: '#fff',
              marginBottom: '96px',
              textAlign: 'center',
              lineHeight: 1.1
            }}>
              What We Value
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '96px 64px'
            }}>
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} style={{ position: 'relative' }}>
                    <div style={{
                      marginBottom: '24px',
                      color: '#fff',
                      transform: 'scale(1)',
                      transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(3deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}>
                      <Icon size={56} strokeWidth={1} />
                    </div>
                    <h3 style={{
                      fontWeight: 600,
                      color: '#fff',
                      marginBottom: '16px',
                      fontSize: '1.875rem',
                      letterSpacing: '-0.025em'
                    }}>
                      {value.title}
                    </h3>
                    <p style={{
                      lineHeight: 1.6,
                      color: '#6b7280',
                      fontSize: '1.125rem',
                      fontWeight: 300,
                      maxWidth: '320px'
                    }}>
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical Expertise */}
          <div 
            ref={el => sectionsRef.current[2] = el}
            style={{
              marginBottom: '256px',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(3.75rem, 10vw, 6rem)',
              letterSpacing: '-0.05em',
              color: '#fff',
              marginBottom: '96px',
              textAlign: 'center',
              lineHeight: 1.1
            }}>
              Technical Foundation
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '80px'
            }}>
              {expertise.map((expertiseGroup, index) => (
                <div key={index}>
                  <h3 style={{
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '40px',
                    fontSize: '1.875rem',
                    letterSpacing: '-0.025em',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '16px',
                    transition: 'border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)';
                  }}>
                    {expertiseGroup.category}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {expertiseGroup.items.map((skill, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '16px'
                      }}>
                        <span style={{
                          color: '#4b5563',
                          fontSize: '0.875rem',
                          fontFamily: 'monospace',
                          width: '32px',
                          flexShrink: 0
                        }}>
                          0{i + 1}
                        </span>
                        <p style={{
                          fontWeight: 300,
                          color: '#9ca3af',
                          fontSize: '1.25rem',
                          transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'default'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#9ca3af';
                        }}>
                          {skill}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div 
            ref={el => sectionsRef.current[3] = el}
            style={{
              marginBottom: '256px',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(3.75rem, 10vw, 6rem)',
              letterSpacing: '-0.05em',
              color: '#fff',
              marginBottom: '96px',
              textAlign: 'center',
              lineHeight: 1.1
            }}>
              Highlights
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: '32px',
                      paddingBottom: '80px',
                      borderBottom: index < achievements.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      transition: 'border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      flexWrap: 'wrap'
                    }}
                    onMouseEnter={(e) => {
                      if (index < achievements.length - 1) {
                        e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)';
                      }
                      const icon = e.currentTarget.querySelector('.achievement-icon');
                      if (icon) {
                        icon.style.transform = 'scale(1.25) rotate(12deg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index < achievements.length - 1) {
                        e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.05)';
                      }
                      const icon = e.currentTarget.querySelector('.achievement-icon');
                      if (icon) {
                        icon.style.transform = 'scale(1) rotate(0deg)';
                      }
                    }}
                  >
                    <div className="achievement-icon" style={{
                      color: '#fff',
                      flexShrink: 0,
                      transform: 'scale(1)',
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                      <Icon size={64} strokeWidth={0.75} />
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h3 style={{
                        fontWeight: 600,
                        color: '#fff',
                        marginBottom: '16px',
                        fontSize: '2.25rem',
                        letterSpacing: '-0.025em'
                      }}>
                        {achievement.title}
                      </h3>
                      <p style={{
                        lineHeight: 1.6,
                        color: '#6b7280',
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        maxWidth: '640px'
                      }}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Information */}
          <div 
            ref={el => sectionsRef.current[4] = el}
            style={{
              marginBottom: '192px',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(3.75rem, 10vw, 6rem)',
              letterSpacing: '-0.05em',
              color: '#fff',
              marginBottom: '48px',
              textAlign: 'center',
              lineHeight: 1.1
            }}>
              Contact
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '96px',
              textAlign: 'center',
              fontSize: '1.25rem',
              fontWeight: 300
            }}>
              Have questions? We're here to help.
            </p>

            <div style={{
              maxWidth: '768px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '48px'
            }}>
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '32px',
                      padding: '32px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)';
                      const icon = e.currentTarget.querySelector('.contact-icon');
                      const content = e.currentTarget.querySelector('.contact-content');
                      if (icon) icon.style.color = '#fff';
                      if (content) content.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.05)';
                      const icon = e.currentTarget.querySelector('.contact-icon');
                      const content = e.currentTarget.querySelector('.contact-content');
                      if (icon) icon.style.color = '#4b5563';
                      if (content) content.style.transform = 'translateX(0)';
                    }}
                  >
                    <div className="contact-icon" style={{
                      color: '#4b5563',
                      transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        color: '#4b5563',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                        marginBottom: '4px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                      }}>
                        {info.title}
                      </h3>
                      <p className="contact-content" style={{
                        color: '#fff',
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}>
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
            style={{
              paddingBottom: '128px',
              textAlign: 'center',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <h3 style={{
              fontWeight: 700,
              marginBottom: '32px',
              color: '#fff',
              fontSize: 'clamp(3rem, 8vw, 4.5rem)',
              letterSpacing: '-0.05em',
              lineHeight: 1.1
            }}>
              Join Our Community
            </h3>
            <p style={{
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: 1.6,
              color: '#6b7280',
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              fontWeight: 300
            }}>
              Stay connected with the latest in technology. Whether you're a tech enthusiast, developer,
              or just curious about the digital world, TechNews is here to keep you informed and inspired.
            </p>
            <div style={{ marginTop: '64px', display: 'inline-block' }}>
              <div style={{
                width: '128px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, #fff, transparent)',
                opacity: 0.3
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;