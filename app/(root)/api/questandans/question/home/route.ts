import QuestionModel from "@/app/models/Questions";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

// get question
export async function GET(){
    await connectMongoDB();
    try {
        const res = await QuestionModel.find({});
        console.log(res)

        return NextResponse.json(res, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error}, {status: 500})
    }
}