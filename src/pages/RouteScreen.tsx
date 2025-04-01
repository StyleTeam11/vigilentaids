import React, { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { Input } from "@nextui-org/react";
import Button from "../pages/button"; // Adjust the path if necessary


const RouteScreen: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    getCurrentLocation();
  }, []);

  const calculateRoute = () => {
    if (!currentLocation || !destination) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentLocation,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (result && status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const time = result.routes?.[0]?.legs?.[0]?.duration?.text || "Unknown duration";
          setDuration(time);
          speakRoute(time);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  const speakRoute = async (time: string) => {
    try {
      await TextToSpeech.speak({
        text: `Your estimated travel time is ${time}.`,
        lang: "en-US",
        rate: 1.0,
      });
    } catch (error) {
      console.error("Error with Text-to-Speech:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">Route Planner</h1>
      <Input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Enter your destination"
        className="w-full"
      />
      <Button onClick={calculateRoute} className="w-full">
        Calculate Route
      </Button>
      {duration && <p>Estimated Time: {duration}</p>}
      {currentLocation && (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap center={currentLocation} zoom={12} mapContainerStyle={{ width: "100%", height: "400px" }}>
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default RouteScreen;