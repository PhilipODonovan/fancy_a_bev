import { connect } from "@/lib/dbConfig";
import { NextResponse, Response } from 'next/server'  
import Bev from '@/models/bevModel';

export async function GET(req, res) {

  try {

    // Make a note we are on
    // the api. This goes to the console.
  console.log("in the getProducts api page")


  await connect();

    console.log('Connected successfully to server');
    const bevList = await Bev.find({});
  
    console.log('Found documents =>', bevList);

  
    // at the end of the process we need to send something back.
    return NextResponse.json(bevList, { status: 200 })
  }
  catch (err) {
    console.error("Error in getProducts API:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  } 
}
  
  