import { hashPassword } from "@/lib/auth";
import {connect} from "@/lib/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")

  connect()
  // Calls the connect function from lib.

  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }
    
    // Verify the password
    const isPasswordValid = await bcryptjs.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    
    // create token data
    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,    };

    // create JWT token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    
    const response = new Response(
      JSON.stringify({ message: "Login successful", success: true, data: "true" }),
      { status: 200 }
    );


   // set the cookie
    response.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=86400`
    );

    return response;

  } catch (err) {
    console.error(err);
    
    return new Response(
      JSON.stringify({ error: "Internal Server Error", data: "false" }),
      { status: 500 }
    );

  }
} 
