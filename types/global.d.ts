// set role
export type Roles = 'instructor' | 'student' | 'prefect' | 'moderator' | 'admin';

export interface userRoleA{
    [key: string]: string;
} 

// userroles
export interface userRole {
    id: string | undefined;
    params: {}
  }

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email?: string;
    imageUrl?: string; 
    banned: boolean;
    hasImage: boolean;
}

export interface UserUpadateType{
    id: string;
    params: string[];
}

export interface YoutubeEmbedProps {
  videoId: string;
}


