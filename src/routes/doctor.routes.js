import { Router } from "express";
import { upload } from "../middilewares/multer.middileware.js";
import {
  createDoctorProfile,
  getAllDoctors,
  getAllDoctorsById,
  updateDoctor,
  updateAvatar,
  getDoctorBySpecalization,
  getDoctorByAvailability,
  deleteDoctor
} from "../controllers/doctor.controllers.js";
import { verifyJWT } from "../middilewares/auth.middileware.js";

const router = Router();

router.post("/create-doctor", verifyJWT, upload.single("avatar"), createDoctorProfile);

router.get("/", getAllDoctors);

router.get("/search/specalization", getDoctorBySpecalization);

router.get("/:id/availability", getDoctorByAvailability);

router.get("/:id", getAllDoctorsById);

router.patch("/update-doctor", verifyJWT, updateDoctor);

router.put("/update-avatar", verifyJWT, upload.single("avatar"), updateAvatar);

router.delete("/:id", verifyJWT, deleteDoctor);

export default router;
