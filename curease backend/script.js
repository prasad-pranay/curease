import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { sendMailPatientWelcome } from "./utils/sendMail.js";
// routes here
import PatientRouter from "./routes/patientRoutes.js"
import PharmacyRouter from "./routes/pharmacyRoutes.js"
import LoginRouter from "./routes/loginRoutes.js"
import DoctorRoutes from "./routes/doctorRoutes.js";
import ToolsRoutes from "./routes/toolRoutes.js";
import NotificationRoutes from "./routes/notficationRoutes.js";
import GeminiRoutes from "./routes/geminiRoutes.js";
import AppointmentRoutes from "./routes/appointmentRoutes.js";

// initializinng the env file
dotenv.config();
// initializing the app
const app = express();
// initializing the port
const PORT = process.env.PORT || 5000;
// updating the cors, and other options ffor the app
app.use(cors({ origin: "http://localhost:5173", credentials: true}), express.json(), cookieParser(),express.static("public"),express.static("recipts"));

// all app paths here
app.use("/doctor", DoctorRoutes);
app.use("/patient", PatientRouter);
app.use("/pharmacy", PharmacyRouter);   
app.use("/login", LoginRouter);
app.use("/tools", ToolsRoutes);
app.use("/notification", NotificationRoutes);
app.use("/gemini", GeminiRoutes);
app.use("/appointments", AppointmentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});























// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "cureaseSecretKey");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };

// router.get("/my-orders", verifyToken, (req, res) => {
//   res.json({ message: `Welcome ${req.user.email}`, data: [] });
// });
