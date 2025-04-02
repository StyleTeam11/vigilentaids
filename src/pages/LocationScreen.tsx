import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LocationScreen.css";

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface Address {
  town?: string;
  city?: string;
  village?: string;
  suburb?: string;
  neighbourhood?: string;
  county?: string;
  state?: string;
  country?: string;
  road?: string;
  house_number?: string;
  postcode?: string;
}

const LocationScreen = () => {
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [fullAddress, setFullAddress] = useState<string>("");
  const [displayAddress, setDisplayAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const speechQueueRef = useRef<SpeechSynthesisUtterance[]>([]);
  const isSpeakingRef = useRef(false);
  const navigate = useNavigate();

  // Check Internet Connection
  useEffect(() => {
    const checkInternet = () => {
      if (!navigator.onLine) {
        navigate("/error");
        setTimeout(() => {
          window.close();
        }, 5000);
      }
    };

    checkInternet();
    window.addEventListener("offline", checkInternet);
    return () => {
      window.removeEventListener("offline", checkInternet);
    };
  }, [navigate]);

  const speak = (text: string, interrupt = false) => {
    if ("speechSynthesis" in window) {
      if (interrupt) {
        window.speechSynthesis.cancel();
        speechQueueRef.current = [];
        isSpeakingRef.current = false;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.lang = "en-US";
      utterance.volume = 1.0;

      utterance.onend = () => {
        isSpeakingRef.current = false;
        const next = speechQueueRef.current.shift();
        if (next) {
          window.speechSynthesis.speak(next);
          isSpeakingRef.current = true;
        }
      };

      if (isSpeakingRef.current) {
        speechQueueRef.current.push(utterance);
      } else {
        window.speechSynthesis.speak(utterance);
        isSpeakingRef.current = true;
      }
    }
  };

  const formatAddress = (address: Address): {full: string, display: string} => {
    const street = address.road ? 
      `${address.road}${address.house_number ? ' ' + address.house_number : ''}` : 
      null;
    const city = address.town || address.city || address.village || address.suburb;
    const region = address.state || address.county;
    
    const fullAddressParts = [
      street,
      city,
      region,
      address.postcode,
      address.country
    ].filter(Boolean).join(', ');

    const displayParts = [
      street,
      city,
      region
    ].filter(Boolean).join(', ');

    return {
      full: fullAddressParts || "Your current location",
      display: displayParts || "Your current location"
    };
  };

  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.address) {
        const formatted = formatAddress(data.address);
        speak(`Your current location is ${formatted.display}`);
        return formatted;
      }
      return {full: "Your current location", display: "Your current location"};
    } catch (error) {
      console.error("Error fetching address:", error);
      speak("Unable to determine your exact location");
      return {full: "Your current location", display: "Your current location"};
    }
  };

  const getLocation = async () => {
    setIsLoading(true);
    setError(null);
    speak("Getting your location", true);
    
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      speak("Geolocation is not supported by this browser.", true);
      setIsLoading(false);
      return;
    }

    try {
      const position = await new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      setCoordinates({lat: latitude, lng: longitude});
      
      const {full, display} = await getAddress(latitude, longitude);
      setFullAddress(full);
      setDisplayAddress(display);
      
    } catch (err) {
      const error = err as GeolocationPositionError;
      let errorMessage = "Unable to retrieve your location";
      if (error.code === error.PERMISSION_DENIED) {
        errorMessage = "Location access was denied";
      } else if (error.code === error.TIMEOUT) {
        errorMessage = "Location request timed out";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorMessage = "Location information unavailable";
      }
      
      setError(errorMessage);
      speak(errorMessage, true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const shareLocation = () => {
    speak("Share on WhatsApp", true);
    if (coordinates) {
      const coordText = `(Latitude: ${coordinates.lat.toFixed(4)}, Longitude: ${coordinates.lng.toFixed(4)})`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`I'm currently at ${fullAddress}. ${coordText}`)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      speak("Please wait while we get your location.", true);
    }
  };

  const handleBack = () => {
    speak("", true);
    navigate("/home");
  };

  const handleRefresh = () => {
    speak(error ? "Try again" : "Refresh location", true);
    getLocation();
  };

  return (
    <div className="location-screen">
      <div className="location-decoration location-decoration-top"></div>
      <div className="location-decoration location-decoration-bottom"></div>
      
      <button 
        onClick={handleBack} 
        className="location-back-button"
        onFocus={() => speak("Back button", true)}
      >
        ← Back
      </button>
      
      {isLoading ? (
        <div className="location-loading">
          <div className="location-spinner"></div>
          <p>Finding your location...</p>
        </div>
      ) : (
        <div className="location-card">
          <h1 className="location-title">
            <span>Location</span> Finder
          </h1>
          
          {error ? (
            <div className="location-error">{error}</div>
          ) : (
            <div className="location-info">
              <div className="location-address">You are at:</div>
              <div className="location-place-name">{displayAddress}</div>
            </div>
          )}
          
          <div className="location-actions">
            <button 
              onClick={handleRefresh} 
              className="location-button button-primary"
              onFocus={() => speak(error ? "Try again" : "Refresh location", true)}
            >
              {error ? "Try Again" : "Refresh Location"}
            </button>
            <button
              onClick={shareLocation}
              className={`location-button ${coordinates ? "button-secondary" : "button-disabled"}`}
              disabled={!coordinates}
              onFocus={() => speak("Share on WhatsApp", true)}
            >
              Share on WhatsApp
            </button>
          </div>
        </div>
      )}
      
      <div className="location-footer">
        <p>Your privacy is important to us</p>
      </div>
    </div>
  );
};

export default LocationScreen;