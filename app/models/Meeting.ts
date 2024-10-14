import mongoose, { Document, Schema } from "mongoose";

export interface IMeeting extends Document {
    meetingId: string;
    creatorId: string;
    time: string;
    description: string;
    image: string;
    creatorName: string;
    state: string;
} 

const uploadSchema: Schema = new mongoose.Schema({
    meetingId: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    creatorName: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    }
}, { collection: 'meeting' }); 
const Meeting = mongoose.models.Meeting || mongoose.model<IMeeting>('Meeting', uploadSchema);

export default Meeting;
