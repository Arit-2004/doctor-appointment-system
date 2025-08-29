import {Router} from "express";
import{
     bookAppointment,
  rescheduleAppointment,
  cancelAppointment,
  getAllAppointmentsOfDoctor,
  getAllAppointmentsOfPatient,
} from "../controllers/appointment.controllers.js"

import { verifyJWT } from "../middilewares/auth.middileware.js";

const router = Router();

router.use(verifyJWT)

router.route("/book").post(bookAppointment)
router.route("/:id/reschedule").patch(rescheduleAppointment)
router.route("/:id/cancel").patch(cancelAppointment);
router.route("/doctor/:doctorId").get(getAllAppointmentsOfDoctor);
router.route("/patient/:patientId").get(getAllAppointmentsOfPatient)



export default router;