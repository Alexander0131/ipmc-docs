import AnswerModel from "@/app/models/Answers";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Get method 
export async function GET(req: NextRequest) {
    await connectMongoDB();
  
    const { searchParams } = new URL(req.url);
    const ansId = searchParams.get('q'); 
  
    try {
      const getAns = await AnswerModel.find({ questionId: ansId });
  
      return NextResponse.json(getAns, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error Occurred" }, { status: 500 });
    }
  }