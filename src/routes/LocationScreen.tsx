import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; 
import { Link, useNavigate } from "react-router-dom";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -25.7479,
  lng: 28.2293,
};

const LocationScreen = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<string>("");

  const navigate = useNavigate();

  const isSpeechAPIAvailable = typeof window !== "undefined" && window.speechSynthesis;

  const speakMessageWeb = () => {
    const message = "You are in VigilentAids GPS. Make sure you provide your destination, and we will navigate you to your destination.";
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const speakMessageMobile = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      alert("Speech synthesis not available on this platform. Please provide your destination.");
    }
  };

  const stopSpeech = () => {
    if (isSpeechAPIAvailable) {
      window.speechSynthesis.cancel();
    }
  };

  const speakMessage = () => {
    if (isSpeechAPIAvailable) {
      speakMessageWeb();
    } else {
      speakMessageMobile();
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log("Error getting location");
        }
      );
    }
    speakMessage();
  }, []);

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleShareLocation = () => {
    if (currentLocation) {
      const message = `Check my location: https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      alert("Location not available!");
    }
  };

  const handleSubmit = () => {
    console.log("Submitting location and destination:", currentLocation, destination);
  };

  const handleBackToHome = () => {
    stopSpeech();
    navigate("/home");
  };

  if (!isLoaded) return <p className="text-center text-white bg-dark p-4">Loading map...</p>;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-black text-white p-4">
      <h1 className="title">VigilentAids GPS</h1>
      <p className="text-center mb-4">
        You are in VigilentAids GPS. Make sure you provide your destination, and we will navigate you to your destination.
      </p>

      <div className="mb-4 w-100 d-flex justify-content-center">
        <input
          type="text"
          value={destination}
          onChange={handleDestinationChange}
          placeholder="Enter your destination"
          className="input-destination"
        />
      </div>

      <div className="mb-4 d-flex gap-3">
        <button
          onClick={handleSubmit}
          className="btn-submit"
        >
          Submit
        </button>
        <button
          onClick={handleShareLocation}
          className="btn-share"
        >
          Share Location
        </button>
      </div>
      
      <button
        onClick={handleBackToHome}
        className="btn btn-outline-light btn-lg custom-button"
      >
        Back to Home
      </button>

      <div className="map-container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation || center}
          zoom={14}
        >
          {currentLocation && <Marker position={currentLocation} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default LocationScreen;
