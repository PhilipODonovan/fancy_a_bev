import { NextResponse } from "next/server";
import { connect } from "@/lib/dbConfig";
import User from "@/models/userModel";
import { verifyToken } from "@/lib/verifyToken";
import { verifyTokenFromRequest } from "@/lib/verifyTokenFromRequest";

export async function GET(request) {
  try {
    await connect();

    const user = await verifyTokenFromRequest(request);   
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("Decoded user:", user);

    // check if user is admin
    const dbUser = await User.findById(user.id).select("isAdmin");
    if (!dbUser?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // fetch all users
    const users = await User.find({}).select("-password");
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error("Error in admin users API:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
} 
  