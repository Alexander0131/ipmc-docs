import AnswerModel, { answerArray } from "@/app/models/Answers";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

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
    
        const removeAns = existingData.answers.filter((item: answerArray) => item.id !== newAns.id);
        
        const updatedAnswers = [...removeAns, newAns];
    
        await AnswerModel.findByIdAndUpdate(editId, {
          answers: updatedAnswers,
        });
    
        return NextResponse.json({ success: true }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    
}
