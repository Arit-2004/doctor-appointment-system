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
      ref: "User",
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

    availability: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
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
