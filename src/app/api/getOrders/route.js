import { connect } from "@/lib/dbConfig";
import { NextResponse, Response } from 'next/server'  
import Order from "@/models/orderModel";
import User from '@/models/userModel';
import Bev from '@/models/bevModel';

export async function GET(req, res) {

  try {

    // Make a note we are on
    // the api. This goes to the console.
  console.log("in the getOrders api page")


  connect();

    console.log('Connected successfully to server');
    const OrderList = await Order.find({})
    .populate({path: 'user', select: 'email'}) // Populate user details, excluding password
    .populate({path: 'bev', select: 'make model variant price image'}); // Populate bev details   

  
    console.log('Found documents =>', OrderList);

  
    // at the end of the process we need to send something back.
    return NextResponse.json(OrderList, { status: 200 })
  }
  catch (err) {
    console.error("Error in getOrders API:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  } 
}
  
  