import mongoose, { Schema } from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"

const appointmentSchema = new Schema({

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
    date : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        enum : ["pending" , "approved" , "cancelled"],
        default : "pending"
    }


},{
    timestamps : true
})


appointmentSchema.plugin(mongooseaggregatePaginate);
export const Appointment = mongoose.model("Appointment" , appointmentSchema)