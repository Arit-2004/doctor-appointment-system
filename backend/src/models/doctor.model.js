import mongoose, { Schema } from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"
import { type } from "os";

const doctorSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    specalization : {
        type : String,
        required : true
    },
    date : {
      type : Date,
      required : true
    },
    
    timeslot: {
    start: { type: String, required: true },
    end: { type: String, required: true }
    },

    fees : {
        type : String,
        required : true
    },
    availability:[{
        type : String
    }],
    hospital : {
        type : String
    },
    avatar : {
        type : String, // cloudinary url
        required : true
    }
},{
    timestamps : true
})

doctorSchema.plugin(mongooseaggregatePaginate);

export const Doctor = mongoose.model("Doctor" , doctorSchema)