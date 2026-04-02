import { NextResponse } from 'next/server'
import { connect } from "@/lib/dbConfig";
import Order from "@/models/orderModel";  
import { Quando } from 'next/font/google';
import { split } from 'postcss/lib/list';
import User from '@/models/userModel';
import Bev from '@/models/bevModel';
import { getDataFromToken } from '@/lib/getDataFromToken';

export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the putInCart api page")


  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const pname = searchParams.get('pname')

  console.log(pname);
  
  console.log("in the putinCart api page")


  connect();

     // Extract the user ID from the token
    const userId = await getDataFromToken(req);

    // Look up the user and exclude the password
    const loggedinUser = await User.findOne({ _id: userId });
    const bevOrder = await Bev.findOne({ _id: pname.split(',')[0] });

    const newOrder = new Order({
      user: loggedinUser, // Use the user from the database
      bev: bevOrder, // Use the bev from the database
      qty: pname.split(',')[1] || 1, // split the string to get the quantity, which is the second part of the string after the comma
      invoice: 'INV' + Date.now(),
    });
    
    // Save the order to the database
    await newOrder.save(); 

    return NextResponse.json({ data: "true" }, { status: 201 });


  // var myobj = { pname: pname, username: "sample@test.com"};
  // const insertResult = await collection.insertOne(myobj);


 //==========================================================





  // at the end of the process we need to send something back.
  return Response.json({ "data":"" + "inserted" + ""})
}

