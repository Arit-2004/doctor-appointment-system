import mongoose, { Schema } from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2";

const appointmentSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    date: {
      type: Date,
      required : true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "cancelled" , "rescheduled"],
      default: "pending",
    },

    timeslot: {
      start: {
       type : String,
       ref : "Doctor"
      },
      end: {
        type : String,
        ref : "Doctor"
      },
    },

    reason: {
      type: String,
      required: true,
    },

    cancelledBy: {
      type: String,
      enum: ["doctor", "patient"],
      default: null, 
    },

    cancellationReason: {
      type: String,
      default: null, 
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.plugin(mongooseaggregatePaginate);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
