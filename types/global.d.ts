
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
  meetingId:string;
  creatorId: string;
  time: string;
  description: string;
  image : string;
  creatorName: string;
  state: string;
}


export interface UserUpadateType{
    id: string;
    params: string[];
}

export interface YoutubeEmbedProps {
  videoId: string;
}

// 
export interface editMeetingState {
  meetingId: string;
  state: string
}


// MiniProfile 

export interface MiniProfileProps {
  userId: string; 
  height: number;
  width: number;
}