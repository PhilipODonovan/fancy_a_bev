import { connect } from "@/lib/dbConfig";
import { NextResponse, Response } from 'next/server'  
import Order from "@/models/orderModel";
import User from '@/models/userModel';
import Bev from '@/models/bevModel';
import { verifyTokenFromRequest } from "@/lib/verifyTokenFromRequest";

export async function GET(req, res) {

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
        
      let OrderList;
      // check if user is admin, only show all users orders if admin, otherwise show only the logged in users orders
      // const dbUser = await User.findById(currentuser.id).select("isAdmin");

      if (!currentuser.isAdmin) {
          OrderList = await Order.find({ user: currentuser.id ,status: { $in: ["Pending", "Processing", "Shipped"] }}) //id not _id because its coming from the jwt decoding 
          .populate({path: 'user', select: 'email'}) // Populate user details, excluding password
          .populate({path: 'bev', select: 'make model variant price image'}); // Populate bev details 
      }
      else {
          OrderList = await Order.find({status: { $in: ["Pending", "Processing", "Shipped"] }})  
          .populate({path: 'user', select: 'email'}) // Populate user details, excluding password
          .populate({path: 'bev', select: 'make model variant price image'}); // Populate bev details 
      }

    console.log('Connected successfully to server, current user:', currentuser.email);

    // const OrderList = await Order.find({ user: currentuser.id }) //id not _id because its coming from the jwt decoding 
    // .populate({path: 'user', select: 'email'}) // Populate user details, excluding password
    // .populate({path: 'bev', select: 'make model variant price image'}); // Populate bev details   

  
    console.log('Found documents =>', OrderList);

  
    // at the end of the process we need to send something back.

return NextResponse.json(
  {
    orders: OrderList,
    currentUser: {
      id: currentuser.id,
      email: currentuser.email,
      isAdmin: currentuser.isAdmin  
    }
  },
  { status: 200 }
);

  }
  catch (err) {
    console.error("Error in getOrders API:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  } 
}
  
  