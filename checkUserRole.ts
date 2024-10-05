'use client'
import { useUser } from "@clerk/nextjs";

export default function CheckUser() {
    const { user } = useUser();
    if(user){
        const userRole = user?.publicMetadata.role;
        if(userRole === "instructor" || userRole === "admin" || userRole === "student" || userRole === "moderator" || userRole === "prefect"){
            return true
        }
        else{
            window.location.href = "/welcome";
        }
    }
    return null
}