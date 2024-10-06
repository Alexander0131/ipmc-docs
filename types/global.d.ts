
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
export interface UpcomingType {
  _id:string;
  creatorId: string;
  time: string;
  description: string;
  image : string;
  creatorName: string;
  meetingId: string;
  state: string;
}

export interface UpcomingTypeIn {
  creatorId: string | null;
  time: string;
  description: string;
  image : string | null;
  creatorName: string | null;
  meetingId: string;
  state: string;
}

export interface UserUpadateType{
    id: string;
    params: string[];
}

export interface YoutubeEmbedProps {
  videoId: string;
}


// MiniProfile 

export interface MiniProfileProps {
  userId: string; // Define userId as a string
}