import mongoose, { Document, Schema } from "mongoose";

export interface IQuest extends Document {
    asker:string,
    answers:string,
    question:string
}

const uploadSchema: Schema = new mongoose.Schema({
    asker: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {timestamps: true,
    collection: "Question"});

const Meeting = mongoose.models.Meeting || mongoose.model<IQuest>('Meeting', uploadSchema);

export default Meeting;