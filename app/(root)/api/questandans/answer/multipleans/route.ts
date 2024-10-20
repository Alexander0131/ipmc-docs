import { NextRequest, NextResponse } from 'next/server';
import AnswerModel from '@/app/models/Answers';
import connectMongoDB from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  await connectMongoDB();
  console.log("back connected");

  const { searchParams } = new URL(req.url);
  const questionId = searchParams.get('q'); 
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const skip = (page - 1) * limit;

  try {
    const questionDocument = await AnswerModel.findOne({ questionId });

    if (!questionDocument) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const totalAnswers = questionDocument.answers.length;
    const paginatedAnswers = questionDocument.answers.slice(skip, skip + limit);
    console.log(paginatedAnswers)

    return NextResponse.json(
      {
        data: paginatedAnswers,
        total: totalAnswers,
        currentPage: page,
        totalPages: Math.ceil(totalAnswers / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error Occurred" }, { status: 500 });
  }
}
