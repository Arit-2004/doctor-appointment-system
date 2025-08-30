import mongoose, { Schema } from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"

const feedbackSchema = new Schema({
    name : {
        type : String,
        required : "Anonymous"
    },
   content : {
       type : String,
       required : true
   },

},
{
    timestamps : true
})

feedbackSchema.plugin(mongooseaggregatePaginate);

export const Feedback = mongoose.model("Feedback" , feedbackSchema)