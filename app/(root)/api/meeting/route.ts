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

// Put method

export async function PUT(req: NextRequest) {
  await connectMongoDB();

  try {
    const { meetingId, ...updateData }: IMeeting = await req.json();

    // Update the meeting in the database
    const updatedMeeting = await Meeting.findByIdAndUpdate(meetingId, updateData, { new: true });

    if (!updatedMeeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    return NextResponse.json(updatedMeeting);
  } catch (error) {
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}





