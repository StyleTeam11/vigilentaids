import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // We'll create this CSS file

const App: React.FC = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
      startPulseAnimation();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const startPulseAnimation = () => {
    setIsPulsing(true);
  };

  const handleScreenClick = (): void => {
    navigate("/login");
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleScreenClick();
    }
  };

  return (
    <div 
      className="welcome-container"
      onClick={handleScreenClick}
      role="button"
      aria-label="Welcome screen. Tap anywhere to continue."
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="logo-container">
        <h1 className="logo-text">
          <span className="logo-part1">Vigilent</span>
          <span className="logo-part2">Aids</span>
        </h1>
        <div className="logo-underline"></div>
      </div>
      
      {showMessage && (
        <div className={`continue-message ${isPulsing ? 'pulse' : ''}`}>
          <p>Tap anywhere to continue</p>
          <div className="arrow-icon">↓</div>
        </div>
      )}
      
      <div className="corner-decor corner-top-left"></div>
      <div className="corner-decor corner-top-right"></div>
      <div className="corner-decor corner-bottom-left"></div>
      <div className="corner-decor corner-bottom-right"></div>
    </div>
  );
};

export default App;