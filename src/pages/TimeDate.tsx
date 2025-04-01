import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/TimeDate.css";

const TimeDate: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);

  // Check Internet Connection
  useEffect(() => {
    const checkInternet = () => {
      if (!navigator.onLine) {
        navigate("/error");
      }
    };

    checkInternet();
    window.addEventListener("offline", checkInternet);
    return () => window.removeEventListener("offline", checkInternet);
  }, [navigate]);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.lang = "en-US";
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleTimeFormat = () => {
    setIs24HourFormat(!is24HourFormat);
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
      setCurrentTime(now.toLocaleTimeString("en-US", {
        hour12: !is24HourFormat,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, [is24HourFormat]);

  const handleSpeakDateTime = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString("en-US", {
      hour12: !is24HourFormat,
      hour: '2-digit',
      minute: '2-digit'
    });
    speak(`Today is ${dateStr}. The current time is ${timeStr}`);
  };

  return (
    <div className="time-date-container">
      <div className="time-date-background">
        <div className="digital-grid"></div>
        <div className="glowing-circle"></div>
      </div>
      
      <h1 className="time-date-title">
        <span className="neon-text">Time</span>
        <span className="neon-text-accent"> & </span>
        <span className="neon-text">Date</span>
      </h1>
      
      <div className="time-date-display">
        <div className="date-box">
          <h2 className="section-label">Current Date</h2>
          <p className="date-text">{currentDate}</p>
        </div>
        
        <div className="time-box">
          <div className="time-header">
            <h2 className="section-label">Current Time</h2>
            <button 
              onClick={toggleTimeFormat}
              className="format-toggle"
              aria-label={`Switch to ${is24HourFormat ? '12-hour' : '24-hour'} format`}
            >
              {is24HourFormat ? '24H' : '12H'}
            </button>
          </div>
          <p className="time-text">{currentTime}</p>
        </div>
      </div>

      <div className="control-buttons">
        <button 
          onClick={handleSpeakDateTime}
          className="voice-button"
          disabled={isSpeaking}
          aria-label="Speak current date and time"
        >
          {isSpeaking ? 'Speaking...' : 'Speak Time'}
        </button>
        
        <Link
          to="/home"
          className="back-button"
          onClick={() => window.speechSynthesis.cancel()}
          aria-label="Return to home screen"
        >
          Back to Home
        </Link>
      </div>

      {isSpeaking && (
        <div className="voice-indicator">
          <div className="voice-wave">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className="voice-bar"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeDate;