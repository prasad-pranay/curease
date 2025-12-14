import express from "express";
import { forgotPassword, google_login, google_signup, loginStatus, make_login, make_Logout } from "../controllers/loginControllers.js";

const router = express.Router();

router.get("/loginStatus", loginStatus);
router.post("/google-signup", google_signup);
router.post("/google-login", google_login);
router.post("/logout", make_Logout)
router.post("/makeLogin", make_login)
router.post("/forgotPassword",forgotPassword)

export default router;
