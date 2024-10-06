import { clerkClient } from '@clerk/nextjs/server';

export async function GET() {
    console.log("hello");
    try {
        const paginatedResponse = await clerkClient.users.getUserList();
        
        const usersArray = Array.from(paginatedResponse.data); // Convert to array if necessary
        const userList = usersArray.map(user => ({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0]?.emailAddress,
            imageUrl: user.imageUrl,

            banned: user.banned,
            hasImage: user.hasImage,
        }));
        return Response.json(userList);
    } catch (error) {
        console.error("Error fetching users:", error);
        
    }
}
