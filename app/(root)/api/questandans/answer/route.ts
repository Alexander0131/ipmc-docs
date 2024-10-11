import AnswerModel, { answerArray, IAnswer } from "@/app/models/Answers";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


// Get method 
export async function GET(req: NextRequest) {
    await connectMongoDB();
  
    // Parse the query from the request URL
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
  

// Post method
export async function POST(req: NextRequest){
    await connectMongoDB();
    try {
        const body = await req.json();

        const {questionId, answers} :IAnswer = body;

        const answerFormat = {
            questionId,
            answers
        }

        const resData = await AnswerModel.create(answerFormat);

        return NextResponse.json(resData, {status: 200})


    } catch (error) {
        return NextResponse.json({error: "Internal Server error"}, {status: 500})
    }
}

// Put method

export async function PUT(req: NextRequest) {
    await connectMongoDB();
  
    try {
      const body = await req.json();
      console.log(body)
      const editId = body.id;
      const { id, userId, ans, like, unlike }: answerArray = body.params;
  
      const newAns = {
        id,
        userId,
        ans,
        like,
        unlike,
      };
  
      const existingData = await AnswerModel.findById(editId);
  
      if (!existingData) {
        return NextResponse.json({ error: "Document not found" }, { status: 404 });
      }
  
      const updatedAnswers = [...existingData.answers, newAns];
  
      await AnswerModel.findByIdAndUpdate(editId, {
        answers: updatedAnswers,
      });
  
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  







