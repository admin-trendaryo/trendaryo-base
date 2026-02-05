import { useEffect, useState } from 'react';
import './CarTrolleyAnimation.css';

export default function CarTrolleyAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-3/4 max-w-4xl h-24 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 border border-orange-300 rounded-xl shadow-2xl overflow-hidden premium-bar">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 via-transparent to-orange-300/20 animate-pulse"></div>
      
      {/* Particle effects */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
      
      <div className="relative w-full h-full flex items-center">
        {/* Premium Car with Trolley */}
        <div 
          className={`car-trolley-container ${isAnimating ? 'car-trolley-animate' : ''} ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Car and Trolley Image */}
          <div className="car-trolley-image">
            <img 
              src="/images/car-trolley.png" 
              alt="Delivery car with shopping trolley"
              className="w-24 h-16 object-contain filter drop-shadow-lg"
              loading="lazy"
              decoding="async"
              width="96"
              height="64"
            />
          </div>
          
          {/* Delivery sparkles */}
          <div className="sparkles">
            <div className="sparkle sparkle-1">✨</div>
            <div className="sparkle sparkle-2">⭐</div>
            <div className="sparkle sparkle-3">💫</div>
          </div>
        </div>
        
        {/* Premium track with glow */}
        <div className="absolute bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full track-glow"></div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
}