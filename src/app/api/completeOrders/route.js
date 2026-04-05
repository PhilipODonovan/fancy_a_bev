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
  console.log("in the completeOrders api page")


  await connect();

  const currentuser = await verifyTokenFromRequest(req);
  console.log("Decoded user from token:", currentuser);

    if (!currentuser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log("RAW REQUEST BODY:", await req.text()); only uncomment dfor debugging, it will consume the body and make it unavailable for later parsing

// get the orderId, status and qty from the request body, check that its not null and update
    const { orderList } = await req.json();
    console.log("parsed JSON:", { orderList});
      
   
 if (!Array.isArray(orderList) || orderList.length === 0) {
      return NextResponse.json({ error: "No orders supplied" }, { status: 400 });
    }


    const firstOrder = await Order.findById(orderList[0]);
    if (!firstOrder) {
      return NextResponse.json({ error: "First order not found" }, { status: 404 });
    }

    // use invoice number of first order for all orders
    const invoiceNumber = firstOrder.invoice;
    console.log("Using invoice:", invoiceNumber);

for (const orderId of orderList) {
      await Order.findByIdAndUpdate(
        orderId,
        {
          status: "Processing",
          invoice: invoiceNumber
        },
        { new: true }
      );
    }

    return NextResponse.json(
      {
        message: "Orders completed successfully",
        invoice: invoiceNumber
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("Error in completeOrders API:", err);
    return NextResponse.json(
      { error: "Failed to complete orders" },
      { status: 500 }
    );
  }
}
