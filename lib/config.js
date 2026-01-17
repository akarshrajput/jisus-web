/**
 * Database Configuration for jisus-web
 * Same configuration as jisus-mac to use the same database
 */

const config = {
  // MongoDB Atlas Configuration
  mongodb: {
    uri:
      process.env.MONGODB_URI ||
      "mongodb+srv://akarshrajput01_db_user:Bn7zpVRXleW2G3pL@jisuscluster1.67mncid.mongodb.net/jisus?retryWrites=true&w=majority",
    options: {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      minPoolSize: 2,
    },
  },

  // JWT Configuration
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      "jisus-ai-super-secret-jwt-key-development-2026",
    expiresIn: "7d", // Shorter for web admin sessions
  },

  // Admin Authentication
  admin: {
    email: "akarshrajput.01@gmail.com",
    passwords: ["teremamaki", "@akarsh2003R"],
  },

  // Subscription Plans (same as jisus-mac)
  subscriptionPlans: {
    daily: {
      id: "daily_plan",
      name: "24 Hours Access",
      price: 69,
      currency: "INR",
      duration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      description: "Access to Jisus AI for 24 hours",
    },
    monthly: {
      id: "monthly_plan",
      name: "1 Month Access",
      price: 799,
      currency: "INR",
      duration: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      description: "Access to Jisus AI for 1 month",
    },
  },
};

export default config;
