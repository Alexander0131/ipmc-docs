import axios from "axios";
import { UpcomingTypeIn, User, userRole } from "./types/global";





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

    return res.data;
    } catch (error) {
        console.log(error) 
    }
   
}

// Post upcoming meetings
export const postMeeting = async (params?: UpcomingTypeIn): Promise<UpcomingTypeIn | UpcomingTypeIn[] | undefined> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/meeting`, params);

        return response.data
        
    } catch (error) {
        
    }
}

// get Users
 export const fetchUsers = async (params?: string): Promise<User | User[] | undefined> => {
     try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchusers`);
        if (!response.ok) {
            const errorText = await response.text(); 
            console.error(`Error response from API: ${errorText}`); 
            return;
        }
        
      
        const data: User[] = await response.json();

        
        if (params) {
            return data.find((item: User) => item.id === params); 
        }
       
        return data;
    } catch (error) {
         
    }
};


// // Fetch Questions from api
// export const fetchAllQuetions = async () => {
//     try {
//         const fetchAllQuetionsData = await axios.get('/api/connectDb/api/questionmethod');
//         return fetchAllQuetionsData.data;
//     } catch (error) {
//         console.log(error)
//     }
// }


// // like a question
// export const likeAQuest = async (_id: string, otherData: string[]) => {
//     try {
//         const like = await axios.put('/api/connectDb/api/questionmethod', {_id, like: otherData});
//         return like.data;
//     } catch (error) {
//         console.log(error)
//     }
// }







