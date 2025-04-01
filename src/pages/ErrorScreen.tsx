import React, { useEffect } from "react";
import "../style/Error.css";

const ErrorScreen: React.FC = () => {
  useEffect(() => {
    const speakError = () => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(
          "I am sorry, I cannot help you. Check your internet connection. The system terminates. Goodbye."
        );
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
      }
    };

    speakError();

    const timer = setTimeout(() => {
      window.close();
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="error-container">
      <div className="robot-container">
        {/* Robot Head */}
        <div className="robot-head">
          <div className="robot-eye left-eye"></div>
          <div className="robot-eye right-eye"></div>
          <div className="robot-mouth"></div>
        </div>
        
        {/* Robot Body */}
        <div className="robot-body">
          <div className="robot-panel">
            <div className="panel-light red"></div>
            <div className="panel-light yellow"></div>
            <div className="panel-light green"></div>
          </div>
        </div>
        
        {/* Robot Arms */}
        <div className="robot-arm left-arm"></div>
        <div className="robot-arm right-arm"></div>
        
        {/* Robot Base */}
        <div className="robot-base"></div>
      </div>

      <div className="error-message">
        <h1 className="error-title">⚠️ Connection Terminated ⚠️</h1>
        <div className="error-text">
          <p>I am sorry, I cannot help you.</p>
          <p>Check your internet connection.</p>
          <p>The system terminates.</p>
        </div>
        <h2 className="goodbye">Goodbye.</h2>
      </div>

      <div className="error-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default ErrorScreen;