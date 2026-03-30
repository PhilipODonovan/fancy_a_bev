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




//   // get the values
//   // that were sent across to us.
//   const { searchParams } = new URL(req.url)
//   const username = searchParams.get('username')
//   const email = searchParams.get('email')
//   const pass = searchParams.get('pass')
//   const hashedPassword = await hashPassword(pass);
//   // const dob = searchParams.get('dob')
//   // const address = searchParams.get('address')



//   console.log(email);
//   console.log(hashedPassword);
//   // console.log(dob);
//   // console.log(address);


//  // =================================================
//   const { MongoClient } = require('mongodb');


//   // const url = 'mongodb://root:example@localhost:27017/admin';
//   const client = new MongoClient(process.env.MONGO_URI);
  
 
//   const dbName = 'app'; // database name

//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('login'); // collection name


//   // const findResult = await collection.insertOne({"email": email, "pass": hashedPassword, "dob": dob, "address": address});
//   const findResult = await collection.insertOne({"username": username, "email": email, "pass": hashedPassword});
//   console.log('Found documents =>', findResult);

//  let valid=true;


//  //==========================================================





//   // at the end of the process we need to send something back.
//   return Response.json({ "data":"" + valid + ""})
}

