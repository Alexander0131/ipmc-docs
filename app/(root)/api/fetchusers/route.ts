import { clerkClient, User as ClerkUser } from '@clerk/nextjs/server'; 
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 

type User = {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    imageUrl: string | null;
    banned: boolean;
    hasImage: boolean;
};

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('id'); 
    
    const cachedUser = cookies().get(`user_${userId}`);
    if (cachedUser) {
        return NextResponse.json(JSON.parse(cachedUser.value)); 
    }

    let page = 1; 
    const pageSize = 100; 

    try {
     
        if (userId) {
            const foundUser = await clerkClient.users.getUser(userId);
            if (foundUser) {
                const user: User = {
                    id: foundUser.id,
                    username: foundUser.username,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    email: foundUser.emailAddresses[0]?.emailAddress || null,
                    imageUrl: foundUser.imageUrl,
                    banned: foundUser.banned,
                    hasImage: foundUser.hasImage,
                };

                cookies().set(`user_${userId}`, JSON.stringify(user), { maxAge: 3600 });

                return NextResponse.json(user);
            }
        }

        while (true) {
            const paginatedResponse = await clerkClient.users.getUserList({
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            
            const usersArray: User[] = paginatedResponse.data.map((user: ClerkUser) => ({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.emailAddresses[0]?.emailAddress || null,
                imageUrl: user.imageUrl,
                banned: user.banned,
                hasImage: user.hasImage,
            }));

            if (userId) {
                const foundUser = usersArray.find(user => user.id === userId);
                if (foundUser) {
                    cookies().set(`user_${userId}`, JSON.stringify(foundUser), { maxAge: 3600 });
                    return NextResponse.json(foundUser);
                }
            }

            if (usersArray.length < pageSize) {
                break;
            }

            page++; 
        }

        return NextResponse.json({ error: 'User not found' });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: 'Error fetching users' });
    }
}
