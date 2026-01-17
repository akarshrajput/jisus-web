/**
 * Coupon Model for Next.js (jisus-web)
 * Simplified coupon system - just code, planType, usage limit, and active status
 */

import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      minLength: [3, "Coupon code must be at least 3 characters"],
      maxLength: [20, "Coupon code cannot exceed 20 characters"],
      match: [
        /^[A-Z0-9_-]+$/,
        "Coupon code can only contain letters, numbers, underscore, and dash",
      ],
    },
    planType: {
      type: String,
      required: true,
      enum: ["daily_plan", "monthly_plan"],
      default: "daily_plan",
    },
    usageLimit: {
      type: Number,
      required: true,
      min: [1, "Usage limit must be at least 1"],
      default: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: [0, "Used count cannot be negative"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [200, "Description cannot exceed 200 characters"],
    },
    usedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        usedAt: {
          type: Date,
          default: Date.now,
        },
        planId: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: String,
      required: true,
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for better query performance
couponSchema.index({ isActive: 1 });
couponSchema.index({ createdAt: -1 });

// Virtual for checking if coupon is available for use
couponSchema.virtual("isAvailable").get(function () {
  return this.isActive && this.usedCount < this.usageLimit;
});

// Virtual for remaining uses
couponSchema.virtual("remainingUses").get(function () {
  return Math.max(0, this.usageLimit - this.usedCount);
});

// Instance method to validate coupon for a specific user and plan
couponSchema.methods.isValidForUser = function (userId, planId) {
  // Check if coupon is available
  if (!this.isAvailable) {
    return { valid: false, reason: "Coupon is not available" };
  }

  // Check if user has already used this coupon
  const hasUsed = this.usedBy.some(
    (usage) => usage.userId.toString() === userId.toString(),
  );
  if (hasUsed) {
    return { valid: false, reason: "You have already used this coupon" };
  }

  return { valid: true, reason: "Coupon is valid" };
};

// Instance method to apply coupon for a user
couponSchema.methods.applyCoupon = function (userId, planId) {
  const validation = this.isValidForUser(userId, planId);
  if (!validation.valid) {
    throw new Error(validation.reason);
  }

  // Add user to usedBy array
  this.usedBy.push({
    userId: userId,
    planId: planId,
    usedAt: new Date(),
  });

  // Increment used count
  this.usedCount += 1;

  return this.save();
};

// Static method to find valid coupon by code
couponSchema.statics.findValidCoupon = function (code) {
  return this.findOne({
    code: code.toUpperCase(),
    isActive: true,
    $expr: { $lt: ["$usedCount", "$usageLimit"] },
  });
};

// Static method to get coupon statistics
couponSchema.statics.getStats = function () {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalCoupons: { $sum: 1 },
        activeCoupons: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$isActive", true] },
                  { $lte: ["$validFrom", new Date()] },
                  { $gte: ["$validUntil", new Date()] },
                  { $lt: ["$usedCount", "$usageLimit"] },
                ],
              },
              1,
              0,
            ],
          },
        },
        totalUsage: { $sum: "$usedCount" },
        expiredCoupons: {
          $sum: {
            $cond: [{ $gt: [new Date(), "$validUntil"] }, 1, 0],
          },
        },
      },
    },
  ]);
};

// Pre-save middleware to ensure code is uppercase
couponSchema.pre("save", function () {
  if (this.isModified("code")) {
    this.code = this.code.toUpperCase();
  }
});

// Pre-save middleware to validate dates
couponSchema.pre("validate", function () {
  if (this.validFrom && this.validUntil && this.validFrom >= this.validUntil) {
    this.invalidate(
      "validUntil",
      "Valid until date must be after valid from date",
    );
  }
});

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;
