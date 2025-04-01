import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/LoginScreen.css";

const countryPhoneFormats: { [key: string]: { code: string; length: number } } = {
  AF: { code: "+93", length: 9 }, // Afghanistan
  AL: { code: "+355", length: 9 }, // Albania
  DZ: { code: "+213", length: 9 }, // Algeria
  AD: { code: "+376", length: 6 }, // Andorra
  AO: { code: "+244", length: 9 }, // Angola
  AR: { code: "+54", length: 10 }, // Argentina
  AM: { code: "+374", length: 8 }, // Armenia
  AU: { code: "+61", length: 9 }, // Australia
  AT: { code: "+43", length: 10 }, // Austria
  AZ: { code: "+994", length: 9 }, // Azerbaijan
  BH: { code: "+973", length: 8 }, // Bahrain
  BD: { code: "+880", length: 10 }, // Bangladesh
  BY: { code: "+375", length: 9 }, // Belarus
  BE: { code: "+32", length: 9 }, // Belgium
  BJ: { code: "+229", length: 8 }, // Benin
  BO: { code: "+591", length: 8 }, // Bolivia
  BR: { code: "+55", length: 11 }, // Brazil
  BG: { code: "+359", length: 9 }, // Bulgaria
  KH: { code: "+855", length: 9 }, // Cambodia
  CM: { code: "+237", length: 9 }, // Cameroon
  CA: { code: "+1", length: 10 }, // Canada
  CL: { code: "+56", length: 9 }, // Chile
  CN: { code: "+86", length: 11 }, // China
  CO: { code: "+57", length: 10 }, // Colombia
  CR: { code: "+506", length: 8 }, // Costa Rica
  HR: { code: "+385", length: 9 }, // Croatia
  CY: { code: "+357", length: 8 }, // Cyprus
  CZ: { code: "+420", length: 9 }, // Czech Republic
  DK: { code: "+45", length: 8 }, // Denmark
  EG: { code: "+20", length: 10 }, // Egypt
  EE: { code: "+372", length: 7 }, // Estonia
  FI: { code: "+358", length: 10 }, // Finland
  FR: { code: "+33", length: 9 }, // France
  GE: { code: "+995", length: 9 }, // Georgia
  DE: { code: "+49", length: 10 }, // Germany
  GH: { code: "+233", length: 9 }, // Ghana
  GR: { code: "+30", length: 10 }, // Greece
  HK: { code: "+852", length: 8 }, // Hong Kong
  HU: { code: "+36", length: 9 }, // Hungary
  IS: { code: "+354", length: 7 }, // Iceland
  IN: { code: "+91", length: 10 }, // India
  ID: { code: "+62", length: 10 }, // Indonesia
  IR: { code: "+98", length: 10 }, // Iran
  IQ: { code: "+964", length: 10 }, // Iraq
  IE: { code: "+353", length: 9 }, // Ireland
  IL: { code: "+972", length: 9 }, // Israel
  IT: { code: "+39", length: 10 }, // Italy
  JM: { code: "+1", length: 10 }, // Jamaica
  JP: { code: "+81", length: 10 }, // Japan
  JO: { code: "+962", length: 9 }, // Jordan
  KZ: { code: "+7", length: 10 }, // Kazakhstan
  KE: { code: "+254", length: 9 }, // Kenya
  KW: { code: "+965", length: 8 }, // Kuwait
  MY: { code: "+60", length: 9 }, // Malaysia
  MX: { code: "+52", length: 10 }, // Mexico
  MA: { code: "+212", length: 9 }, // Morocco
  NA: { code: "+264", length: 9 }, // Namibia
  NG: { code: "+234", length: 10 }, // Nigeria
  PK: { code: "+92", length: 10 }, // Pakistan
  PH: { code: "+63", length: 10 }, // Philippines
  PT: { code: "+351", length: 9 }, // Portugal
  RU: { code: "+7", length: 10 }, // Russia
  SA: { code: "+966", length: 9 }, // Saudi Arabia
  ZA: { code: "+27", length: 9 }, // South Africa
  ES: { code: "+34", length: 9 }, // Spain
  SE: { code: "+46", length: 9 }, // Sweden
  CH: { code: "+41", length: 9 }, // Switzerland
  TH: { code: "+66", length: 9 }, // Thailand
  TN: { code: "+216", length: 8 }, // Tunisia
  TR: { code: "+90", length: 10 }, // Turkey
  UG: { code: "+256", length: 9 }, // Uganda
  UA: { code: "+380", length: 9 }, // Ukraine
  AE: { code: "+971", length: 9 }, // United Arab Emirates
  GB: { code: "+44", length: 10 }, // United Kingdom
  US: { code: "+1", length: 10 }, // United States
  VN: { code: "+84", length: 10 }, // Vietnam
  ZW: { code: "+263", length: 9 }, // Zimbabwe
};

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("ZA");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
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

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 6;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    fetch("https://ip-api.com/json")
      .then((res) => res.json())
      .then((data) => {
        const userCountry = data.countryCode || "ZA";
        setCountry(userCountry);
        const countryCode = countryPhoneFormats[userCountry]?.code || "+27";
        setPhoneNumber(countryCode);
      })
      .catch((err) => console.error("Error fetching country:", err));
    
    speakMessage(
      "Now you are on the login page. Please enter your phone number correctly, starting with your country code."
    );
  }, []);

  const generateCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedCode(code);
    setIsCodeSent(true);
    speakCode(code);
  };

  const speakMessage = async (message: string) => {
    try {
      if (Capacitor.isNativePlatform()) {
        await TextToSpeech.speak({
          text: message,
          lang: "en-US",
          rate: 0.9,
          pitch: 1.0,
        });
      } else if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      } else {
        console.warn("Speech synthesis not supported.");
      }
    } catch (error) {
      console.error("Error with text-to-speech:", error);
    }
  };

  const speakCode = (code: string) => {
    const codeWithSpaces = code.split("").join(" ");
    speakMessage(`Your verification code is ${codeWithSpaces}`);
  };

  const handleLogin = () => {
    if (code !== generatedCode) {
      setErrorMessage("Invalid code. Please try again.");
      speakMessage("Invalid code. Please try again.");
    } else {
      setErrorMessage("");
      navigate("/home");
    }
  };

  const validatePhoneNumber = (number: string) => {
    const format = countryPhoneFormats[country] || countryPhoneFormats["ZA"];
    return (
      number.startsWith(format.code) &&
      number.replace(format.code, "").length === format.length
    );
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {!isCodeSent ? (
        <div className="login-box">
          <input
            type="tel"
            className="form-control login-input mb-3"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {!validatePhoneNumber(phoneNumber) && phoneNumber.length > 0 && (
            <p className="text-danger">
              Invalid phone number for {country}. Please follow the correct format.
            </p>
          )}
          <button
            className="login-button"
            onClick={generateCode}
            disabled={!validatePhoneNumber(phoneNumber)}
          >
            Send Code
          </button>
        </div>
      ) : (
        <div className="login-box">
          <input
            type="text"
            className="form-control login-input mb-3"
            placeholder="Enter your 5-digit code"
            value={code}
            maxLength={5}
            onChange={(e) => setCode(e.target.value)}
          />
          {errorMessage && <p className="text-danger text-center fw-bold">{errorMessage}</p>}
          <button className="login-button" onClick={handleLogin}>
            Submit
          </button>
          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => generatedCode && speakCode(generatedCode)}
          >
            Repeat Code
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;