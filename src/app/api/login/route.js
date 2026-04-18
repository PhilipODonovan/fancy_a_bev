import { connect } from "@/lib/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect();

export async function POST(req) {
  console.log("In the login API");


  try {
    const { email, password } = await req.json();
    console.log("Request body:", { email, password });

    // Lookup user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }
    else {
      console.log("User found with email:", existingUser.email);
    } 

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, existingUser.password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", existingUser.email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }
    else {
      console.log("Password is valid for user:", existingUser.email);
    } 

    // Create token
    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Build response
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}