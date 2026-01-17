/**
 * Admin Authentication API
 * Handles admin login with specified email and passwords
 */

import jwt from "jsonwebtoken";
import config from "../../../../lib/config.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password1, password2 } = body;

    if (!email || !password1 || !password2) {
      return Response.json(
        { success: false, message: "Email and both passwords are required" },
        { status: 400 },
      );
    }

    // Validate admin credentials
    if (email.toLowerCase() !== config.admin.email.toLowerCase()) {
      return Response.json(
        { success: false, message: "Invalid admin credentials" },
        { status: 401 },
      );
    }

    // Both passwords must match the required passwords
    const requiredPasswords = ["@akarsh2003R", "teremamaki"];
    if (
      !requiredPasswords.includes(password1) ||
      !requiredPasswords.includes(password2) ||
      password1 === password2
    ) {
      return Response.json(
        { success: false, message: "Invalid admin credentials" },
        { status: 401 },
      );
    }

    // Ensure both required passwords are provided
    if (
      !requiredPasswords.every((pwd) => [password1, password2].includes(pwd))
    ) {
      return Response.json(
        { success: false, message: "Invalid admin credentials" },
        { status: 401 },
      );
    }

    // Generate JWT token for admin session
    const token = jwt.sign(
      {
        email: email.toLowerCase(),
        role: "admin",
        loginTime: new Date().toISOString(),
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    );

    console.log(`✅ Admin login successful: ${email}`);

    return Response.json({
      success: true,
      message: "Admin authentication successful",
      token,
      user: {
        email: email.toLowerCase(),
        role: "admin",
      },
    });
  } catch (error) {
    console.error("❌ Admin login error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
