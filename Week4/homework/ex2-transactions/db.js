// Importing mongoose to connect to MongoDB
// Importing dotenv to manage environment variables and load them from a .env file
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;  

// Define a function to connect MongoDB
async function connectDB() {
    try {
        // Try to connect to the database using mongoose
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        // Show error message if connection fails
        console.error("Connection Error", err);
      
    }
}

export { mongoose, connectDB };   