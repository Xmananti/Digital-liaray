//Creating Token if login successful
//It receives User Information from Login Page
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    //Request Data
    const reqBody = await req.json();
    //Destructuring the data in reqBody
    const { userId, username, password, roleId, isLogin } = reqBody;

    const tokenData = {
      userId,
      name: username,
      password,
      roleId,
      isLogin,
    };
    //Creating Token
    const token = await jwt.sign(tokenData, process.env.TOKEN!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({ message: "Login successful" });
    //Set token in cookies
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
    // Process the request body and perform necessary actions

    // Send a JSON response back to the client
  } catch (error) {
    console.error("Error processing the POST request:", error);
    // Handle errors and send an appropriate response
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
