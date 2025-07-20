  import React, { useState, useEffect, useRef } from 'react';
  import { ChevronDown, Play, Globe, Thermometer, Mountain, Droplets, Eye } from 'lucide-react';

  const MarsInfoCard = ({ title, subtitle, description, icon: Icon, delay = 0, accent = 'orange', stats = null, details = null }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    const accentColors = {
      orange: 'from-orange-400 to-red-500',
      blue: 'from-blue-400 to-cyan-500',
      purple: 'from-purple-400 to-pink-500',
      green: 'from-emerald-400 to-teal-500'
    };

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
        className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative overflow-hidden bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-500 hover:border-white/20 group ${isHovered ? 'scale-[1.02]' : 'scale-100'} p-3`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[accent]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          <div className="relative p-8">
            <div className="flex items-start justify-between mb-1">
              <div className={`w-14 h-14 bg-gradient-to-br ${accentColors[accent]} rounded-2xl flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}`}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              {stats && (
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{stats.value}</div>
                  <div className="text-white/40 text-sm">{stats.unit}</div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-2xl font-bold text-white ">{title}</h3>
            <p className="text-orange-400/80 text-sm font-medium uppercase tracking-wider">{subtitle}</p>
          </div>
          <p className="text-white/60 leading-relaxed text-base">{description}</p>
          {details && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {Object.entries(details).map(([label, value]) => (
                <div key={label} className="text-white/70 text-sm">
                  <div className="font-medium text-white">{label}</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
          )}

          <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${accentColors[accent]} transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`} />
        </div>
      </div>
    );
  };

  const StatCard = ({ label, value, unit, icon: Icon, trend }) => (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-5 h-5 text-orange-400" />
        {trend && (
          <div className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-white/40 text-sm">{unit}</div>
      <div className="text-white/60 text-xs mt-2">{label}</div>
    </div>
  );

  const MarsWebsite = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [showSecondVideo, setShowSecondVideo] = useState(false);
    const infoSectionRef = useRef(null);
    const [weather, setWeather] = useState(null);
    const NASA_API_KEY = 'sWoWmdJXhAFSCNcN0q6qNg0ln6YwkCkbFxons4bP';
    const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`;

    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const res = await fetch(API_URL);
          const data = await res.json();

          if (data && data.sol_keys && data.sol_keys.length > 0) {
            const lastSol = data.sol_keys[data.sol_keys.length - 1];
            const solData = data[lastSol];
            setWeather({
              sol: lastSol,
              avgTemp: solData?.AT?.av,
              maxTemp: solData?.AT?.mx,
              minTemp: solData?.AT?.mn,
              windSpeed: solData?.HWS?.av,
              pressure: solData?.PRE?.av,
              season: solData?.Season,
            });
          }
        } catch (error) {
          console.error('Error fetching Mars weather:', error);
        }
      };

      fetchWeather();
    }, []);

    const infoCards = [
      {
        icon: Thermometer,
        title: 'Climate System',
        subtitle: 'Atmospheric Conditions',
        accent: 'orange',
        stats: weather ? { value: `${weather.avgTemp}°`, unit: 'Celsius' } : null,
        details: weather ? {
          "Season": weather.season?.charAt(0).toUpperCase() + weather.season?.slice(1),
          "Avg Temp (°C)": weather.avgTemp?.toFixed(1),
          "Max Temp (°C)": weather.maxTemp?.toFixed(1),
          "Min Temp (°C)": weather.minTemp?.toFixed(1),
          "Wind Speed (m/s)": weather.windSpeed?.toFixed(1),
          "Pressure (Pa)": weather.pressure?.toFixed(1),
        } : null,
        delay: 200
      },
      {
        icon: Globe,
        title: 'Planet Overview',
        subtitle: 'Fourth from the Sun',
        description: 'Mars is the 4th planet from the Sun and often called the "Red Planet" due to its distinct rusty color, caused by iron oxide on its surface. It is the 2nd smallest planet in the Solar System after Mercury, yet it features some of the most spectacular landscapes known, including the tallest volcano, Olympus Mons, and the largest canyon, Valles Marineris. A day on Mars, known as a sol, lasts approximately 24.6 hours.',
        accent: 'blue',
        delay: 400
      },
      {
        icon: Mountain,
        title: 'Surface Features',
        subtitle: 'Geological Wonders',
        description: 'Mars hosts remarkable geological features, including Olympus Mons, the tallest volcano in the solar system standing nearly three times higher than Mount Everest, and Valles Marineris, a vast canyon system stretching over 4,000 kilometers, showcasing Mars\'s dynamic geological history.',
        accent: 'purple',
        delay: 600
      },
      {
        icon: Droplets,
        title: 'Water Discovery',
        subtitle: 'Signs of Life',
        description: 'Scientists have uncovered evidence of subsurface ice, ancient river valleys, and seasonal dark streaks called recurring slope lineae, all suggesting that liquid water once flowed on Mars and that hidden reserves may still exist beneath its dusty, frozen surface.',
        accent: 'green',
        delay: 800
      },
    ];

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

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setShowSecondVideo(entry.isIntersecting),
        { threshold: 0.3 }
      );

      if (infoSectionRef.current) observer.observe(infoSectionRef.current);

      return () => observer.disconnect();
    }, []);

    const quickStats = weather ? [
  { label: 'Surface Temperature', value: `${weather.avgTemp}°`, unit: '°C', icon: Thermometer, trend: -2.1 },
  { label: 'Atmospheric Pressure', value: `${weather.pressure}`, unit: 'Pa', icon: Eye, trend: 1.3 },
  { label: 'Wind Speed', value: `${weather.windSpeed}`, unit: 'm/s', icon: Globe, trend: 0.8 },  // You can pick a better icon if you want
] : [];


    const marsClimateDetails = weather
      ? {
        Season:
          weather.season?.charAt(0).toUpperCase() + weather.season?.slice(1),

        "Avg Temp (°C)": weather.avgTemp?.toFixed(1),
        "Max Temp (°C)": weather.maxTemp?.toFixed(1),
        "Min Temp (°C)": weather.minTemp?.toFixed(1),
        "Wind Speed (m/s)": weather.windSpeed?.toFixed(1),
        "Pressure (Pa)": weather.pressure?.toFixed(1),
      }
      : null;

    return (
      <div className="min-h-screen bg-black overflow-hidden relative">
        {/* Starfield */}
        <div className="fixed inset-0 w-full h-full z-0 max-w-none">
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
            <div
              className="w-full mx-auto px-8 transition-all duration-300 ease-out"
              style={{
                transform: `translateY(${scrollY * -0.5}px)`,
                opacity: Math.max(0, 1 - scrollY / 400)
              }}
            >
              <div className="max-w-2xl space-y-6">
                <h1 className="text-8xl md:text-9xl font-bold font-orbitron">
                  <span className="text-white">THE</span> <br />
                  <span className="text-transparent bg-clip-text bg-cover bg-center"
                    style={{
                      backgroundImage: "url('https://www.solarsystemscope.com/textures/download/2k_mars.jpg')"
                    }}
                  >
                    PLANET
                  </span>
                  <br />
                  <span className="text-white">MARS</span>
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
          </div>

          {/* Mars Planet */}
          <div className="absolute w-screen h-[1000px] overflow-hidden z-0">
            <video
              src="/marsVid.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 object-contain"
              style={{
                transform: `
          translateY(${scrollY * 0.1}px)
          rotateY(${mousePosition.x * 5}deg)
          rotateX(${mousePosition.y * 5}deg)
          translateX(40%)
        `,
                transition: 'transform 0.1s ease-out'
              }}
            />

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

        {/* info cards */}
        <div ref={infoSectionRef} className="relative z-10 min-h-screen py-20">
          {showSecondVideo && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <video
                src="/marsVid2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-[2500px] h-[3500px] object-contain opacity-15"
              />
            </div>
          )}
          <div className="text-center mb-16">
            <h2 style={{ backgroundImage: "url('https://www.solarsystemscope.com/textures/download/2k_mars.jpg')" }} className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-cover mb-7">Discover Mars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mb-12">
              {infoCards.map((card, idx) => (
                <MarsInfoCard key={idx} {...card} />
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-white mb-6">Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickStats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>
          </div>
          
  <footer className="bg-black/30 backdrop-blur-xl border-t border-white/10 py-6 text-white flex justify-between items-center px-8 text-sm">
    <div className="text-left">
      <div className="font-bold">Daksh Arora</div>
      <div>dakshkpa@gmail.com</div>
    </div>
    <div className="text-center">
      <div className="font-bold">Janvi Thawani</div>
      <div>thawanijanvi24@gmail.com</div>
    </div>
    <div className="text-right">
      <div className="font-bold">Varun Tahiliani</div>
      <div>varrun004@gmail.com</div>
    </div>
  </footer>

        </div>
      </div>
    );
  };

  export default MarsWebsite;