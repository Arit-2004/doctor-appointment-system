import mongoose, { Schema } from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"

const doctorSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    specalization : {
        type : String,
        required : true
    },
    timeslot : [
        {
            start : {type : String},
            end : {type : String}
        }
    ],
    fees : {
        type : String,
        required : true
    },
    availability:[{
        type : String
    }],
    hospital : {
        type : String
    }
},{
    timestamps : true
})

doctorSchema.plugin(mongooseaggregatePaginate);

export const Doctor = mongoose.model("Doctor" , doctorSchema)