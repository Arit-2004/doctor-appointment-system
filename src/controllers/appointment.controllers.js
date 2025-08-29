import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";


const bookAppointment = asyncHandler(async (req, res) => {
  const patientId = req.user?._id;
  const { doctorId, date , availability, timeslot, reason } = req.body;

  if (!patientId) throw new ApiError(403, "No patient found");
  if (!doctorId || !date || !availability || !reason)
    throw new ApiError(403, "Fill all required fields");

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    date,
    availability,
    timeslot,
    reason,
  });

  return res.status(200).json(
    new ApiResponse(200, appointment, "Appointment booked successfully")
  );
});

const rescheduleAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { availability, date ,timeslot, reason } = req.body;

  if (!availability || !date || !timeslot || !reason)
    throw new ApiError(403, "Please provide new availability, date, timeslot, and reason");

  const appointment = await Appointment.findById(id);
  if (!appointment) throw new ApiError(404, "Appointment not found");

  if (
    appointment.patientId.toString() !== req.user?._id.toString() &&
    appointment.doctorId.toString() !== req.user?._id.toString()
  )
    throw new ApiError(403, "You are not authorized to reschedule this appointment");

  appointment.availability = availability
  appointment.date = date;
  appointment.timeslot = timeslot;
  appointment.reason = reason;
  appointment.status = "rescheduled";

  await appointment.save();

  return res.status(200).json(
    new ApiResponse(200, appointment, "Appointment rescheduled successfully")
  );
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { cancelledBy, cancellationReason } = req.body;

  if (!cancelledBy || !cancellationReason)
    throw new ApiError(400, "Please provide who cancelled and the reason");

  const appointment = await Appointment.findById(id);
  if (!appointment) throw new ApiError(404, "Appointment not found");

  if (
    appointment.patientId.toString() !== req.user?._id.toString() &&
    appointment.doctorId.toString() !== req.user?._id.toString()
  )
    throw new ApiError(403, "You are not authorized to cancel this appointment");

  appointment.status = "cancelled";
  appointment.cancelledBy = cancelledBy;
  appointment.cancellationReason = cancellationReason;

  await appointment.save();

  return res.status(200).json(
    new ApiResponse(200, appointment, "Appointment cancelled successfully")
  );
});


const getAllAppointmentsOfDoctor = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  if (!doctorId) throw new ApiError(400, "Doctor ID is required");

  const appointments = await Appointment.find({ doctorId })
    .populate("patientId", "fullName email")
    .sort({ date: 1, "timeslot.start": 1 });

  return res.status(200).json(
    new ApiResponse(200, appointments, "Appointments fetched successfully")
  );
});

const getAllAppointmentsOfPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  if (!patientId) throw new ApiError(400, "Patient ID is required");

  const appointments = await Appointment.find({ patientId })
    .populate("doctorId", "fullName email")
    .sort({ date: 1, "timeslot.start": 1 });

  return res.status(200).json(
    new ApiResponse(200, appointments, "Appointments fetched successfully")
  );
});

export {
  bookAppointment,
  rescheduleAppointment,
  cancelAppointment,
  getAllAppointmentsOfDoctor,
  getAllAppointmentsOfPatient,
};
