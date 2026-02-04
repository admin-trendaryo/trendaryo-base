import { useEffect, useState } from 'react';

export default function CarTrolleyAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-1/2 h-20 bg-gradient-to-r from-orange-400 to-red-500 border border-orange-300 rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-full">
        {/* Car with Trolley */}
        <div 
          className={`absolute top-1/2 transform -translate-y-1/2 w-16 h-8 transition-all duration-6000 ease-in-out ${isAnimating ? 'animate-pulse' : ''}`}
          style={{
            left: isAnimating ? 'calc(100% + 64px)' : '-64px',
            backgroundImage: 'url("/images/car-trolley.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transition: 'left 6s ease-in-out'
          }}
        >
          {/* Your car-trolley image will show here */}
        </div>
        
        {/* Track line */}
        <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-gray-200"></div>
      </div>
    </div>
  );
}