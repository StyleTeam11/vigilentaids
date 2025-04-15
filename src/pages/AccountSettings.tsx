import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CheckInternetPage.css";

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [countdown, setCountdown] = useState(2);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      utterance.lang = "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const checkInternet = () => {
      const offlineStatus = !navigator.onLine;
      setIsOffline(offlineStatus);

      if (offlineStatus) {
        speak("No internet connection detected. Please check your network.");
        navigate("/error");
      } else {
        // Redirect when online (after countdown)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              window.location.href = "https://account-ashen.vercel.app/";
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    };

    checkInternet();
    window.addEventListener("offline", checkInternet);
    window.addEventListener("online", checkInternet);

    return () => {
      window.removeEventListener("offline", checkInternet);
      window.removeEventListener("online", checkInternet);
    };
  }, [navigate]);

  return (
    <div className="internet-check-container">
      <div className="internet-check-card">
        {isOffline ? (
          <>
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff3e3e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12" y2="20" />
              </svg>
            </div>
            <h1 className="offline-title">CONNECTION LOST</h1>
            <p className="offline-text">
              Network unavailable. Please connect to the internet.
            </p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              TRY AGAIN
            </button>
          </>
        ) : (
          <>
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12" y2="20" />
              </svg>
            </div>
            <h1 className="online-title">CONNECTION ACTIVE</h1>
            <p className="online-text">Redirecting to secure network...</p>
            <div className="countdown">
              REDIRECTING IN <span className="countdown-number">{countdown}</span> SECONDS
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;