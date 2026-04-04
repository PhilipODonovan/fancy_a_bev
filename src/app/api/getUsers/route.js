import { connect } from "@/lib/dbConfig";
import { NextResponse, Response } from 'next/server'  
import User from '@/models/userModel';

export async function GET(req, res) {

  try {

    // Make a note we are on
    // the api. This goes to the console.
  console.log("in the getUsers api page")


  await connect();

    console.log('Connected successfully to server');
    const userList = await User.find({});
  
    // console.log('Found documents =>', userList);

  
    // at the end of the process we need to send something back.
    return NextResponse.json(userList, { status: 200 })
  }
  catch (err) {
    console.error("Error in getUsers API:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  } 
}
  
  