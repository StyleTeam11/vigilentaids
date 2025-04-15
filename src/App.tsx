import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasInternet, setHasInternet] = useState(true);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);

  // Enhanced internet connection check
  const checkInternetConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const response = await fetch("https://www.google.com/logo.ico", {
        mode: 'no-cors',
        cache: 'no-store'
      });
      setHasInternet(true);
    } catch (error) {
      setHasInternet(false);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  useEffect(() => {
    setTtsSupported('speechSynthesis' in window);
    checkInternetConnection();

    const timer = setTimeout(() => setShowMessage(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const speak = (text: string) => {
    if (!ttsSupported) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.lang = 'en-US';
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (showMessage && ttsSupported) {
      speak(
        hasInternet
          ? "Tap anywhere to continue."
          : "No internet connection detected. Please check your network."
      );
    }
  }, [showMessage, hasInternet, ttsSupported]);

  const handleScreenClick = () => {
    stopSpeech();

    if (!hasInternet) {
      checkInternetConnection();
      return;
    }

    document.querySelector('.welcome-container')?.classList.add('fade-out');
    setTimeout(() =>   navigate("/login"), 300);
  };

  return (
    <div 
      className="welcome-container"
      onClick={handleScreenClick}
      role="button"
      aria-label={hasInternet ? "Welcome screen" : "No internet connection"}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleScreenClick()}
    >
      <div className="particle-background"></div>
      
      <div className="content-wrapper">
        <h1 className="main-title">
          <span className="title-part">Vigilent</span>
          <span className="title-part accent">Aids</span>
        </h1>
        
        {showMessage && (
          <div className="instruction-message">
            {isCheckingConnection ? (
              <div className="connection-status">
                <div className="spinner"></div>
                <p>Checking connection...</p>
              </div>
            ) : hasInternet ? (
              <>
                <p>Tap anywhere to continue</p>
                <div className="pulse-circle"></div>
              </>
            ) : (
              <div className="connection-status error">
                <div className="spinner error"></div>
                <p>No internet connection</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    checkInternetConnection();
                  }}
                  className="btn btn-outline-light mt-3"
                >
                  Retry Connection
                </button>
              </div>
            )}
            
            {ttsSupported && hasInternet && !isCheckingConnection && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  speak("Tap anywhere to continue");
                }}
                className="btn btn-outline-light mt-3"
              >
                Tap to Hear Message
              </button>
            )}
          </div>
        )}
        
        {isSpeaking && (
          <div className="speech-indicator">
            <div className="sound-wave">
              {[...Array(4)].map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;