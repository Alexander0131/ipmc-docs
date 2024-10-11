import { answerArray } from "@/app/models/Answers";

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

export interface HomeQuests {
  _id: string;
  asker: string;
  answerId: string;
  question: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnswerPlatformType {
  ansId: string;
  mainId: string;

}

export interface IAnswerOut extends Document {
  questionId: string;
  answers: answerArray
}

export interface AnswerDisType {
  questionId: string;
  answers: answerArray;
  createdAt: string;
}

// like a question
export interface likeType {
  id: string;
  params: answerArray;
}