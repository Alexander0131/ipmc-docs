import AnswerModel from "@/app/models/Answers";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await connectMongoDB();
    console.log("first")
  try {
    const body = await req.json();
    const { paramId, ansId } = body;
    const answerDocument = await AnswerModel.findOne({ questionId: ansId });
    
    console.log(body)

    if (!answerDocument) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const updatedAnswers = answerDocument.answers.filter(
      (answer: any) => answer.id !== paramId
    );

    console.log(updatedAnswers)
    answerDocument.answers = updatedAnswers;
    await answerDocument.save();

    return NextResponse.json({ success: true, message: "Answer deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
