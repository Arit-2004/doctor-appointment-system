import mongoose, { Schema } from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"

const feedbackSchema = new Schema({
    name : {
        type : String,
        required : "Anonymous"
    },
    email : {
        type : String,
        required : true

},
    subject : {
        type : String,
        required : true 
    },
    message : {
        type : String,
        required : true
    }

})

feedbackSchema.plugin(mongooseaggregatePaginate);

export const Feedback = mongoose.model("Feedback" , feedbackSchema)