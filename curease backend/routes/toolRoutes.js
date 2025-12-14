import express from "express";
import { imageToText } from "../controllers/toolController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "public/imgtotext" });

router.post("/img-to-text",upload.single("image"),imageToText)

export default router;
