import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Meeting, { IMeeting } from "@/app/models/Meeting";



export async function GET(req: NextRequest){
  const getTheState = req.url.split("?q=")[1];
    await connectMongoDB();
    try {
      const meetings = await Meeting.find({state: getTheState});

      return NextResponse.json({meetings})
    } catch (err: any) {
        NextResponse.json({error: err.message});
    }
  
}

// Post method

export async function POST(req: NextRequest) {
  await connectMongoDB();

    try {
      const { creatorId, time, description, image, creatorName, meetingId, state}: IMeeting = await req.json();
  

    // Create post with uploaded image URL
    const postData = {
      creatorId, 
      time, 
      description, 
      image, 
      creatorName, 
      meetingId,
      state
    };

    console.log(postData)

    // Save post data to database
    const createdPost = await Meeting.create(postData);

    return NextResponse.json(createdPost);

  } catch (error) {
    NextResponse.json({error}, {status: 500})
     }



}






