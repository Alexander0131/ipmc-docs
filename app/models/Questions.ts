import mongoose, { Document, Schema } from "mongoose";

export interface IQuest extends Document {
    asker:string,
    answerId:string,
    question:string
}

const uploadSchema: Schema = new mongoose.Schema({
    asker: {
        type: String,
        required: true
    },
    answerId: {
        type: String,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true
    }
}, {timestamps: true,
    collection: "Question"});

const QuestionModel = mongoose.models.Question || mongoose.model<IQuest>('Question', uploadSchema);

export default QuestionModel;