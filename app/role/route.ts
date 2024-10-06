import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { UserUpadateType } from '@/types/global';

export async function POST(req: NextRequest) {
    const data: UserUpadateType = await req.json();

    console.log(data)
    const userId = data.id;
    const params = data.params;


  const updatedUser = await clerkClient.users.updateUser(userId, params)

  return NextResponse.json({ updatedUser })
}