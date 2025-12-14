import express from "express";
import { profileCitySearch, addNewPatient, bookNewAppointment, addAddress, addNewCard, changePlan } from "../controllers/patientControllers.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/PatientProfileImage/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


router.get("/profile-city",profileCitySearch)

router.post("/addNewPatient", upload.single("image"), addNewPatient);

router.post("/book-new-appointment", bookNewAppointment);

router.get("/add-address",addAddress)

router.post("/add-new-card",addNewCard)

router.post("/change-plan",changePlan)

export default router;
