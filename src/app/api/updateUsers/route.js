// https://medium.com/@turingvang/next-js-beginner-mongodb-crud-example-tutorial-db2afdb68e25
import { connect } from "@/lib/dbConfig";
import { NextResponse, Response } from 'next/server'  
import Order from "@/models/orderModel";
import User from '@/models/userModel';
import Bev from '@/models/bevModel';
import { verifyTokenFromRequest } from "@/lib/verifyTokenFromRequest";

export async function POST(req, res) {

  try {

    // Make a note we are on
    // the api. This goes to the console.
  console.log("in the updateUsers api page")


  await connect();

  const currentuser = await verifyTokenFromRequest(req);
  console.log("Decoded user from token:", currentuser);

    if (!currentuser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log("RAW REQUEST BODY:", await req.text()); only uncomment dfor debugging, it will consume the body and make it unavailable for later parsing

// get the userId, isAdmin from the request body, check that its not null and update
    const {userId, isAdmin } = await req.json();
    console.log("parsed JSON:", { userId, isAdmin });
      
    const updateData = {};
    
    if (typeof isAdmin !== "undefined") updateData.isAdmin = isAdmin;

    console.log("Final updateData:", updateData);

    const user= await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    console.log("Updated User:", user)


return NextResponse.json(
  {
    message: "User updated successfully",
  },
  { status: 200 }
);

  }
  catch (err) {
    console.error("Error in updateUsers API:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  } 
}
  
  