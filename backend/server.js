// Load environment variables from .env file
require('dotenv').config();

// Import all required packages
const express = require('express');          // For creating server and routes
const mongoose = require('mongoose');        // For MongoDB connection
const cors = require('cors');                // To allow frontend to talk to backend

const app = express();                       // Create an Express app

// Middlewares
app.use(cors());                             // Allow cross-origin requests
app.use(express.json());                     // Parse JSON data from frontend

// 1️⃣ CONNECT TO MONGODB (URI comes from .env)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.log('❌ MongoDB connection error:', err));

// 2️⃣ DEFINE SCHEMA for hotel bookings
const bookingSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  checkin: String,
  checkout: String,
  guests: Number,
  hotel: String
});

// 3️⃣ CREATE MODEL (represents "bookings" collection in MongoDB)
const Booking = mongoose.model('Booking', bookingSchema);

// 4️⃣ TEST ROUTE
app.get('/', (req, res) => {
  res.send('🌍 Backend server is running successfully!');
});

// 5️⃣ POST ROUTE to save booking data
app.post('/book', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(200).json({ message: '✅ Booking saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to save booking', error });
  }
});

// 6️⃣ SERVER LISTEN (Port from .env or fallback to 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
