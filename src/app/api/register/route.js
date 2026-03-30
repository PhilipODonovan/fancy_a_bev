import { hashPassword } from "@/lib/auth";
import {connect} from "@/lib/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

  // Make a note we are on
  // the api. This goes to the console.
console.log("in the api page")

connect()
// Calls the connect function from lib.

export async function POST(req, res) {

  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password);  
    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    
    // Save the user to the database
    await newUser.save(); 

    return NextResponse.json({ data: "true" }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }




}

