import QuestionModel, { IQuest } from "@/app/models/Questions";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


// post
export async function POST(req: NextRequest){
    await connectMongoDB();
    try {
        const body = await req.json();
        const {  asker, answerId, question}: IQuest = body;

        const newQuest = {
            asker,
            answerId,
            question
        }

        const res = await QuestionModel.create(newQuest);
        return NextResponse.json(res)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error}, {status: 500})
    }
}










