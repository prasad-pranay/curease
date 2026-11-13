import express from "express";
import multer from "multer";
import { deleteAppointment, markAppointment, rateAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "public/DoctorProfileImage/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });


router.post("/delete",deleteAppointment)
router.post("/mark-appointment",markAppointment)
router.post("/rate-appointment",rateAppointment)
// router.post("/schedule",ListDoctors)

// router.post("/addNewDoctor", upload.single("image"), addNewDoctor);


export default router; 