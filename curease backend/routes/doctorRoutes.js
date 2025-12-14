import express from "express";
import { addNewDoctor, ListDoctors, ListPatients } from "../controllers/doctorController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/DoctorProfileImage/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


router.get("/", (req, res) => {
  res.send("User doctor Page");
});

router.get("/list-patients",ListPatients)
router.get("/list-doctors",ListDoctors)

router.post("/addNewDoctor", upload.single("image"), addNewDoctor);


export default router; 