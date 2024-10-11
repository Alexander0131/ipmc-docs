import mongoose, {Document, Schema } from 'mongoose'

export interface answerArray {
    id: string;
    userId: string;
    ans: string;
    like: string[];
    unlike:string[];
}



export interface IAnswer extends Document {
    questionId: string;
    answers: answerArray
}


const uploadSchema: Schema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        unique: true
    },
    answers:{
        type: Array,
        required: true
    }
},{
    timestamps: true,
    collection: 'answer'
}
)

const AnswerModel = mongoose.models.answer || mongoose.model<IAnswer>('answer', uploadSchema);

export default AnswerModel;