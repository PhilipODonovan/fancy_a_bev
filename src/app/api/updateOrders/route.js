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
  console.log("in the getOrders api page")


  await connect();

  const currentuser = await verifyTokenFromRequest(req);
  console.log("Decoded user from token:", currentuser);

    if (!currentuser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log("RAW REQUEST BODY:", await req.text()); only uncomment dfor debugging, it will consume the body and make it unavailable for later parsing

// get the orderId, status and qty from the request body, check that its not null and update
    const { orderId, status, qty } = await req.json();
    console.log("parsed JSON:", { orderId, status, qty });
      
    const updateData = {};
    if (typeof status !== "undefined") updateData.status = status;
    if (typeof qty !== "undefined") updateData.qty = qty;

    console.log("Final updateData:", updateData);

    const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
  
    console.log("Updated Order:", order)


return NextResponse.json(
  {
    message: "Order updated successfully",
  },
  { status: 200 }
);

  }
  catch (err) {
    console.error("Error in updateOrders API:", err);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  } 
}
  
  