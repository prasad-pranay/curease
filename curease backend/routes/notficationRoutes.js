import express from "express";
import { markNotiRead, multiplePerson, singlePerson } from "../controllers/notificationController.js";

const router = express.Router();


router.post("/single-person",singlePerson)
router.post("/multiple-person",multiplePerson)
router.post("/mark-noti-read",markNotiRead)


export default router; 