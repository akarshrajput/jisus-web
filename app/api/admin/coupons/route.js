/**
 * Coupon Management API
 * Handles CRUD operations for coupons (admin only)
 */

import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../lib/database.js";
import Coupon from "../../../../lib/models/Coupon.js";
import User from "../../../../lib/models/User.js";
import config from "../../../../lib/config.js";

// Middleware to verify admin token
function verifyAdminToken(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Authorization token required");
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    if (decoded.role !== "admin" || decoded.email !== config.admin.email) {
      throw new Error("Admin access required");
    }

    return decoded;
  } catch (error) {
    throw new Error("Invalid admin token");
  }
}

// GET - List all coupons with pagination
export async function GET(request) {
  try {
    verifyAdminToken(request);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const status = searchParams.get("status"); // 'active', 'expired', 'inactive'
    const search = searchParams.get("search");

    let filter = {};

    // Apply status filter
    if (status === "active") {
      filter = {
        isActive: true,
        $expr: { $lt: ["$usedCount", "$usageLimit"] },
      };
    } else if (status === "expired") {
      filter = {
        $expr: { $gte: ["$usedCount", "$usageLimit"] },
      };
    } else if (status === "inactive") {
      filter.isActive = false;
    }

    // Apply search filter
    if (search) {
      filter.code = { $regex: search.toUpperCase(), $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [coupons, total] = await Promise.all([
      Coupon.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("usedBy.userId", "name username email"),
      Coupon.countDocuments(filter),
    ]);

    // Get statistics
    const statsResult = await Coupon.getStats();
    const stats = statsResult[0] || {
      totalCoupons: 0,
      activeCoupons: 0,
      totalUsage: 0,
      expiredCoupons: 0,
    };

    return Response.json({
      success: true,
      coupons,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats,
    });
  } catch (error) {
    console.error("❌ Get coupons error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: error.message.includes("Admin") ? 401 : 500 },
    );
  }
}

// POST - Create new coupon
export async function POST(request) {
  try {
    const admin = verifyAdminToken(request);
    await connectToDatabase();

    const body = await request.json();
    const {
      code,
      planType = "daily_plan",
      usageLimit = 1,
      description,
      isActive = true,
    } = body;

    // Validate required fields
    if (!code) {
      return Response.json(
        { success: false, message: "Coupon code is required" },
        { status: 400 },
      );
    }

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return Response.json(
        { success: false, message: "Coupon code already exists" },
        { status: 400 },
      );
    }
    // Create new coupon
    const coupon = new Coupon({
      code: code.toUpperCase(),
      planType,
      usageLimit,
      description,
      isActive,
      createdBy: admin.email,
    });

    await coupon.save();

    console.log(`✅ Coupon created: ${coupon.code} by ${admin.email}`);

    return Response.json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.error("❌ Create coupon error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: error.message.includes("Admin") ? 401 : 500 },
    );
  }
}

// PUT - Update existing coupon
export async function PUT(request) {
  try {
    const admin = verifyAdminToken(request);
    await connectToDatabase();

    const body = await request.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return Response.json(
        { success: false, message: "Coupon ID is required" },
        { status: 400 },
      );
    }

    // Find and update coupon
    const coupon = await Coupon.findById(_id);
    if (!coupon) {
      return Response.json(
        { success: false, message: "Coupon not found" },
        { status: 404 },
      );
    }

    // Apply updates (protect usage data from being modified)
    Object.keys(updates).forEach((key) => {
      if (key !== "usedBy" && key !== "usedCount" && key !== "_id") {
        coupon[key] = updates[key];
      }
    });

    await coupon.save();

    console.log(`✅ Coupon updated: ${coupon.code} by ${admin.email}`);

    return Response.json({
      success: true,
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    console.error("❌ Update coupon error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: error.message.includes("Admin") ? 401 : 500 },
    );
  }
}

// DELETE - Delete coupon
export async function DELETE(request) {
  try {
    const admin = verifyAdminToken(request);
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const couponId = searchParams.get("id");

    if (!couponId) {
      return Response.json(
        { success: false, message: "Coupon ID is required" },
        { status: 400 },
      );
    }

    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return Response.json(
        { success: false, message: "Coupon not found" },
        { status: 404 },
      );
    }

    // Check if coupon has been used
    if (coupon.usedCount > 0) {
      return Response.json(
        {
          success: false,
          message:
            "Cannot delete coupon that has been used. Disable it instead.",
        },
        { status: 400 },
      );
    }

    await Coupon.findByIdAndDelete(couponId);

    console.log(`✅ Coupon deleted: ${coupon.code} by ${admin.email}`);

    return Response.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete coupon error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: error.message.includes("Admin") ? 401 : 500 },
    );
  }
}
