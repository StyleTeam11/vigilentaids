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

  // Check TTS support and internet connection
  useEffect(() => {
    setTtsSupported('speechSynthesis' in window);
    setHasInternet(navigator.onLine);

    const timer = setTimeout(() => setShowMessage(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Speak function with Android/Web support
  const speak = (text: string) => {
    if (!ttsSupported) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.lang = 'en-US';

    // End speech and reset the flag
    utterance.onend = () => setIsSpeaking(false);

    // Start speaking
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech immediately
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Initial welcome message
  useEffect(() => {
    if (showMessage && ttsSupported) {
      speak(
        hasInternet
          ? "Welcome to Vigilent Aids. Tap anywhere to continue."
          : "Please check your internet connection."
      );
    }
  }, [showMessage, hasInternet, ttsSupported]);

  const handleScreenClick = () => {
    stopSpeech(); // Stop speech immediately when tapped

    if (!hasInternet) {
      speak("No internet connection. Please check your network.");
      return;
    }

    // Fade out the welcome screen and navigate to the login page
    document.querySelector('.welcome-container')?.classList.add('fade-out');
    setTimeout(() => navigate("/login"), 500);
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
            <p>{hasInternet ? "Tap anywhere to continue" : "No internet connection"}</p>
            <div className="pulse-circle"></div>
            {ttsSupported && (
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the screen tap event from firing
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
