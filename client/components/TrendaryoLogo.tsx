export default function TrendaryoLogo() {
  return (
    <div className="logo-container">
      <style>{`
        .logo-container {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
          border-radius: 20px;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          animation: logoGlow 3s ease-in-out infinite;
          position: relative;
          z-index: 2;
        }

        .tagline {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.1rem;
          color: #6b7280;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          animation: fadeInUp 2s ease-out 0.5s both;
        }

        .floating-icons {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .floating-icon {
          position: absolute;
          font-size: 2rem;
          opacity: 0.3;
          animation: float 4s ease-in-out infinite;
        }

        .floating-icon:nth-child(1) {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
          color: #3b82f6;
        }

        .floating-icon:nth-child(2) {
          top: 30%;
          right: 20%;
          animation-delay: 1s;
          color: #8b5cf6;
        }

        .floating-icon:nth-child(3) {
          bottom: 30%;
          left: 20%;
          animation-delay: 2s;
          color: #10b981;
        }

        .floating-icon:nth-child(4) {
          bottom: 20%;
          right: 15%;
          animation-delay: 3s;
          color: #f59e0b;
        }

        @keyframes logoGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.4));
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @media (max-width: 768px) {
          .logo-text {
            font-size: 2.5rem;
          }
          .tagline {
            font-size: 0.9rem;
            bottom: 30px;
          }
          .floating-icon {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="floating-icons">
        <div className="floating-icon">📱</div>
        <div className="floating-icon">💪</div>
        <div className="floating-icon">🎧</div>
        <div className="floating-icon">🌿</div>
      </div>
      
      <h1 className="logo-text">Trendaryo</h1>
      <p className="tagline">Effortless Excellence</p>
    </div>
  );
}
