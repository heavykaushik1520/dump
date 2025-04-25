const express = require("express");
const cors = require("cors");
const path = require('path');

require("dotenv").config();


const userRoutes = require("./routes/userRoutes");

const app = express();
const allowedOrigins = [
    "https://dump-frontend.onrender.com",  // Replace with your actual frontend URL
    "http://localhost:3000" // optional, for local development
  ];
  

  
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true); // allow requests with no origin like Postman
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
