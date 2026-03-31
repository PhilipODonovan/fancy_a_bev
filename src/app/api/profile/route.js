import { NextResponse } from 'next/server';
import {connect} from "@/lib/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from '@/lib/getDataFromToken';

connect();

export async function GET(request) {
    console.log("in the profile api page")
    
  try {
    // Extract the user ID from the token
    const userId = await getDataFromToken(request);

    // Look up the user and exclude the password
    const user = await User.findOne({ _id: userId }).select('-password');

    return NextResponse.json({
      message: 'User found',
      data: user
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}