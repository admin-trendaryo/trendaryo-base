import { useEffect, useState } from 'react';
import './CarTrolleyAnimation.css';

export default function CarTrolleyAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-3/4 max-w-4xl h-40 bg-black border border-gray-800 rounded-xl shadow-2xl overflow-hidden premium-bar">
      <div className="relative w-full h-full flex items-center">
        {/* Welcome Message */}
        <div className={`welcome-message ${isAnimating ? 'welcome-animate' : ''}`}>
          <span className="welcome-text">WELCOME TO </span>
          <span className="trendaryo-text">
            <span style={{color: '#ff0000', textShadow: '0 0 15px #ff0000'}}>T</span>
            <span style={{color: '#ff7f00', textShadow: '0 0 15px #ff7f00'}}>R</span>
            <span style={{color: '#ffff00', textShadow: '0 0 15px #ffff00'}}>E</span>
            <span style={{color: '#00ff00', textShadow: '0 0 15px #00ff00'}}>N</span>
            <span style={{color: '#0000ff', textShadow: '0 0 15px #0000ff'}}>D</span>
            <span style={{color: '#4b0082', textShadow: '0 0 15px #4b0082'}}>A</span>
            <span style={{color: '#9400d3', textShadow: '0 0 15px #9400d3'}}>R</span>
            <span style={{color: '#ff1493', textShadow: '0 0 15px #ff1493'}}>Y</span>
            <span style={{color: '#00ffff', textShadow: '0 0 15px #00ffff'}}>O</span>
          </span>
        </div>
      </div>
    </div>
  );
}