import axios from "axios";
import { editMeetingState, likeType, QuestionType, UpcomingType, User, userRole } from "./types/global";
import { answerArray } from "./app/models/Answers";
import { toast } from "./components/ui/use-toast";





// Add user role
export const setUserRole = async (params?: userRole) => {
    try {
        const response = await axios.post('/api/account/role', params);
        console.log(response.data);
        return true;
    } catch (error) {
        console.log(error)
    }
}

// get Upcoming meetings
export const getMeetings = async (params: string) => {
    try {
         const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/meeting?q=${params}`);

         console.log(res.data)
    return res.data;
    } catch (error) {
        console.log(error) 
    }
   
}

// Post upcoming meetings
export const postMeeting = async (params?: UpcomingType): Promise<UpcomingType | UpcomingType[] | undefined> => {
    console.log({params})
    try {
        console.log("trying")
        if(params){
            console.log("tried")
            const userIdRaw = await getMeetings('upcoming');
            console.log(userIdRaw)
            const userId = await userIdRaw.find((item: UpcomingType) => item.meetingId === params.meetingId);
            console.log({userId})

            if(!userId){
                // console.log("No one like this")
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/meeting`, params);
                // window.location.href = `/meeting/${params.meetingId};`
                return response.data
            }
            
        }
    } catch (error) {
        
    }
}


// change meeting state
export const changeMeetingState = async (params: editMeetingState) => {

    try {
        // get the post id first
        const userIdRaw = await getMeetings('upcoming');
        const userId = await userIdRaw.find((item: UpcomingType) => item.meetingId === params.meetingId);
        const reParams = {_id: userId._id, state: params.state};
        console.log({reParams})

        const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/meeting`, reParams)
        console.log(response.data);

    window.location.href ="/"
    } catch (error) {
        
    }
}
// Get users
export const fetchUsers = async (params?: string): Promise<User | User[] | undefined> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchusers`, {
            params: { id: params }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Fetch Questions from api
export const getHomeQuetions = async () => {
    try {
        const fetchAllQuetionsData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/question/home`);
        return fetchAllQuetionsData.data;
    } catch (error) {
        console.log(error)
    }
}

// Send question to db
export async function postQuest(params: QuestionType){
    try {
       await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/question`, params);
        return true;
    } catch (error) {
        return false;
    }
}

// fetch an answer from api
export const getAnswer = async (params: string) => {
    try {
        const resData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/answer?q=${params}`);

        return resData.data;
    } catch (error) {
        return null
    }
}

// fetch an answer to get id from api 
export const getAnswerForId = async (params: string) => {
    try {
        const resData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/answer/id?q=${params}`);

        return resData.data;
    } catch (error) {
        return null
    }
}


// like a question
export async function likeAnAns(params: likeType){
    try {
        const resData = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/answer/like`, params);
        console.log(resData);
    } catch (error) {
        
    }
}


// ans a question
export async function postNewAns(paramId: string, params: answerArray){
    console.log("Hello hi")
    console.log({paramId})
    const setData = {
        questionId: paramId,
        answers: params
    }
    try {
         await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/answer`, setData);
        toast({
            title: 'Answer added',
          })
    } catch (error) {
    }
}



export async function postAnAns(params: likeType){
    console.log(params)
    try {
         await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/answer`, params);
        return true
    } catch (error) {
        return false
    }
}

// delete an answer
export async function deleteAns(paramId: string, ansId: string){
    try {
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/answer/delete`, {paramId, ansId});
    } catch (error) {
        return null
    }
}









