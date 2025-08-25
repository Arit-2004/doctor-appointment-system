import mongoose, { Schema } from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"

const feedbackSchema = new Schema({
    
    patientId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    doctorId : {
        type : Schema.Types.ObjectId,
        ref : "Doctor",
        required : true
    },

    content : {
        type : String,
        required : true
    }
},
{
    timestamps : true
})

feedbackSchema.plugin(mongooseaggregatePaginate);

export const Feedback = mongoose.model("Feedback" , feedbackSchema)