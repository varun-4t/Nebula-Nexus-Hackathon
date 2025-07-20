import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Globe, Thermometer, Mountain, Droplets } from 'lucide-react';

const MarsInfoCard = ({ title, subtitle, description, icon: Icon, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={cardRef}
            className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
        >
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-orange-500/50 hover:from-orange-500/5 hover:to-red-500/10 transition-all duration-500 hover:scale-105 group">
                <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                            {title}
                        </h3>
                        <h4 className="text-orange-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                            {subtitle}
                        </h4>
                        <p className="text-white/70 text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MarsWebsite = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Starfield */}
      <div className="fixed inset-0 w-full h-full z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center">
        {/* Text Content */}
        <div className="w-full mx-auto px-8">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-8xl md:text-9xl font-bold text-white">
              THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600">
                PLANET
              </span><br />
              MARS
            </h1>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl text-white/80 font-light">The Martian Red Planet</h2>
              <p className="text-white/60 text-lg max-w-lg">
                Explore the mysteries of our celestial neighbor...
              </p>
            </div>

            <div className="flex space-x-6 pt-8">
              <button 
                onClick={() => {
                  if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                  }
                }}
                className="group flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-full hover:scale-105 transition"
              >
                <Play className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Explore Mars</span>
              </button>
              <button className="text-white/70 hover:text-white border-b border-white/30 hover:border-white">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Mars Planet */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
          <div className="relative">
            <div
              className="w-80 h-80 md:w-96 md:h-96 rounded-full relative overflow-hidden"
              style={{
                background: `radial-gradient(circle at ${35 + mousePosition.x * 10}% ${35 + mousePosition.y * 10}%, 
                  #ff8c42 0%, #ff6b35 25%, #d63031 50%, #a0392a 75%, #6d2c2c 100%)`,
                boxShadow: `inset -60px -60px 120px rgba(0,0,0,0.6), 0 0 100px rgba(255,107,53,0.3), 0 0 200px rgba(214,48,49,0.15)`,
                transform: `
                  translateY(${scrollY * 0.1}px)
                  rotateY(${mousePosition.x * 5}deg)
                  rotateX(${mousePosition.y * 5}deg)
                  scale(${1 + Math.sin(Date.now() * 0.001) * 0.02})
                `,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Surface Features */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-black/20"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      width: `${5 + Math.random() * 15}px`,
                      height: `${5 + Math.random() * 15}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="relative z-10 min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Discover Mars
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mt-6">
              Uncover the secrets of the Red Planet through cutting-edge exploration and scientific discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MarsInfoCard 
              icon={Globe} 
              title="Planet Overview" 
              subtitle="Fourth from the Sun" 
              description="Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, with a day comparable to Earth's and seasons spanning twice as long." 
              delay={0} 
            />
            <MarsInfoCard 
              icon={Thermometer} 
              title="Climate & Weather" 
              subtitle="Extreme Conditions" 
              description="Experience temperatures ranging from -195°F to 70°F, with massive dust storms that can engulf the entire planet for months." 
              delay={200} 
            />
            <MarsInfoCard 
              icon={Mountain} 
              title="Surface Features" 
              subtitle="Geological Wonders" 
              description="Home to Olympus Mons, the largest volcano in the solar system, and Valles Marineris, a canyon system stretching over 4,000 km." 
              delay={400} 
            />
            <MarsInfoCard 
              icon={Droplets} 
              title="Water Discovery" 
              subtitle="Signs of Life" 
              description="Recent discoveries of subsurface water ice and seasonal water flows suggest Mars may have once harbored life and could again." 
              delay={600} 
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-3">
          <div className="text-white/50 text-sm">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
          <ChevronDown className="w-5 h-5 text-white/30 animate-bounce" />
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
              i === 0 ? 'bg-orange-500 scale-150' : 'bg-white/30 hover:bg-white/60'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export default MarsWebsite;
