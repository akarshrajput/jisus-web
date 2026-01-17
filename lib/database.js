/**
 * Database Connection for Next.js
 * Connects to the same MongoDB instance as jisus-mac
 */

import mongoose from "mongoose";
import config from "./config.js";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    console.log("🔗 Connecting to MongoDB...");

    await mongoose.connect(config.mongodb.uri, config.mongodb.options);

    isConnected = true;
    console.log("✅ Connected to MongoDB successfully");

    // Handle connection events
    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB connection error:", error);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
      isConnected = false;
    });

    return mongoose.connection;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    isConnected = false;
    throw error;
  }
}

export async function disconnectFromDatabase() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log("🔌 Disconnected from MongoDB");
  }
}
