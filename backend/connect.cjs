const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb+srv://thando:123@vigilantaidsDB.3o2pzls.mongodb.net/VigilentAidsDB?retryWrites=true&w=majority&appName=VigilantAids";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  plainPassword: { type: String, select: false }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema, "vigilantaids_users");

// Location Schema
const locationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  locationId: { type: String, required: true, unique: true },
  isDetected: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Location = mongoose.model("Location", locationSchema, "Location");

// Route Schema (for storing route information)
const routeSchema = new mongoose.Schema({
  country: { type: String, required: true },
  routeId: { type: String, required: true, unique: true },
  isDetected: { type: Boolean, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Route = mongoose.model("Route", routeSchema, "Route");

// Registration Endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { username, country, phone, password } = req.body;
    
    if (!username || !country || !phone || !password) {
      return res.status(400).json({ error: "Fill in the missing details" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({ 
      username, 
      country, 
      phone, 
      password,
      plainPassword: password
    });
    
    await newUser.save();

    res.status(201).json({ 
      success: true, 
      message: "Your account is successfully created",
      user: {
        username,
        country,
        phone
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ 
      error: "Your account failed to be created!", 
      details: err.message 
    });
  }
});

// Location Endpoint
app.post("/api/locations", async (req, res) => {
  try {
    const { country, locationId, isDetected } = req.body;
    
    const newLocation = new Location({ 
      country, 
      locationId, 
      isDetected
    });
    
    await newLocation.save();

    res.status(201).json({
      success: true,
      message: "Location saved successfully",
      location: newLocation
    });
  } catch (err) {
    console.error("Location save error:", err);
    res.status(500).json({ 
      error: "Failed to save location", 
      details: err.message 
    });
  }
});

// Route Endpoint (for frontend to save route information)
app.post("/api/routes", async (req, res) => {
  try {
    const { country, routeId, isDetected, destination, distance } = req.body;
    
    const newRoute = new Route({
      country,
      routeId,
      isDetected,
      destination,
      distance
    });
    
    await newRoute.save();

    res.status(201).json({
      success: true,
      message: "Route saved successfully",
      route: newRoute
    });
  } catch (err) {
    console.error("Route save error:", err);
    res.status(500).json({ 
      error: "Failed to save route", 
      details: err.message 
    });
  }
});

// Get all routes
app.get("/api/routes", async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });
    res.status(200).json(routes);
  } catch (err) {
    console.error("Error fetching routes:", err);
    res.status(500).json({ 
      error: "Failed to fetch routes", 
      details: err.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});