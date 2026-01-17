/**
 * User Model for Next.js (jisus-web)
 * Adapted from jisus-mac for ES modules
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [100, "Name cannot exceed 100 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [3, "Username must be at least 3 characters"],
      maxLength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deviceInfo: {
      platform: String,
      version: String,
      lastLogin: Date,
    },
  },
  {
    timestamps: true,
  },
);

// No separate index needed - unique: true creates index automatically

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to check username availability
userSchema.statics.isUsernameAvailable = async function (username) {
  const user = await this.findOne({ username: username.toLowerCase() });
  return !user;
};

// Update last login time
userSchema.methods.updateLastLogin = function () {
  this.deviceInfo = this.deviceInfo || {};
  this.deviceInfo.lastLogin = new Date();
  return this.save();
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
