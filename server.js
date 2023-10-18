const express = require("express");
const cors = require("cors");

require("dotenv").config();

// Database Connection
const { connectToDatabase } = require("./back-end/config/database");

const app = express();
app.use(express.json());

app.use(cors());

async function startServer() {
  try {
    const dbConnected = await connectToDatabase();

    if (dbConnected) {
      // Define Routes Here

      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log("Server Up and Running on Port:", PORT);
      });
    } else {
      console.error("Database connection failed.");
    }
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
