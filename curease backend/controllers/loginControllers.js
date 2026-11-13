import {
  AppointmentScheme,
  DoctorScheme,
  EveryoneScheme,
  OrdersScheme,
  PatientScheme,
} from "../utils/Schemas.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { forgotMailPassword } from "../utils/sendMail.js";
dotenv.config();

export const loginStatus = async (req, res) => {
  const token = req.cookies.token; // read from cookie
  if (!token) {
    return res.status(401).json({ success: false, message: "No token found" });
  }
  try {
    // decoding the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // type is patient
    if (decoded["type"] == "patients") {
      const fetchPatientData = await PatientScheme.findById(
        decoded["id"]
      ).lean();
      // if patient not found
      if (!fetchPatientData)
        return res.status(400).json({ message: "User not found" });
      else {
        // patient is found , get the orders and appointemtns of them
        const fetchPatientAppointment = await AppointmentScheme.find({
          email: fetchPatientData.contact.email,
        }).lean();
        const fetchPatientOrders = await OrdersScheme.find({
          email: fetchPatientData.contact.email,
        }).lean();
        // adding appointment and orders data in patient data
        fetchPatientData["appointments"] = fetchPatientAppointment;
        fetchPatientData["orders"] = fetchPatientOrders;

        return res
          .status(200)
          .json({ success: true, type: "patient", data: fetchPatientData });
      }
    } else if (decoded["type"] == "doctors" || decoded["type"] == "doctor") {
      const fetchDoctorData = await DoctorScheme.findById(decoded["id"]).lean();
      if (!fetchDoctorData)
        return res.status(400).json({ message: "Doctor not found" });
      else {

        const fetchAllAppointment = await AppointmentScheme.find().lean();
        // adding appointment and orders data in patient data
        fetchDoctorData["appointments"] = fetchAllAppointment;
        return res
          .status(200)
          .json({ success: true, type: "Doctor", data: fetchDoctorData });
      }
    }else if(decoded["type"]=="admin"){
      return res.status(200).json({ success: true, type: "admin" });
    }

    res.status(200).json({ success: true,type:"null", message: "user not verified" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const google_login = async (req, res) => {
  // {
  //   sub: '113171188302874382895',
  //   name: 'Pranay',
  //   given_name: 'Pranay',
  //   picture: 'https://lh3.googleusercontent.com/a/ACg8ocL4WLc6APKboO64cstwKbG3b9yCaNJ9VJ2xcHKehKQaQeX7vbw=s96-c',
  //   email: 'prasadpranay2005@gmail.com',
  //   email_verified: true
  // }
  try {
    const access_token = req.body.token;
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const userData = await response.json();

    const user = await EveryoneScheme.findOne({ email: userData.email });
    if (!user)
      return res.status(400).json({ message: "Users not found", code: 1 });
    if (user.type == "patient") {
      const NewUserData = await PatientScheme.findOne({
        "contact.email": userData.email,
      });
      const token = NewUserData.generateToken();
      res.cookie("token", token, {
        httpOnly: true, // cannot be accessed via JavaScript
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return res
        .status(200)
        .json({ message: "Login successful", type: user.type, code: 0 });
    }else if (user.type == "doctor") {
      const NewUserData = await DoctorScheme.findOne({
        "email": userData.email,
      });
      const token = NewUserData.generateToken();
      res.cookie("token", token, {
        httpOnly: true, // cannot be accessed via JavaScript
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return res
        .status(200)
        .json({ message: "Login successful", type: user.type, code: 0 });
    }
    res.json({ code: 1 });
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: 2 });
  }
};

export const google_signup = async (req, res) => {
  try {
    const access_token = req.body.token;
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const userData = await response.json();
    res.json({
      code: 0,
      email: userData.email,
      image: userData.picture,
      name: userData.name,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: 1 });
  }
};

export const make_Logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({ message: "Cookie deleted successfully" });
};

export const forgotPassword = async (req, res) => {
  const data = req.body;
  const user = await EveryoneScheme.findOne({ email: data.email });
  if (!user)return res.status(400).json({ code: 1,msg:"user does not exist" });
  const result = await forgotMailPassword(data.email,user.name,user.pass);
  if(result==0){
    return res.status(400).json({ code: 2, msg:"Something is not right" });
  }else{
    return res.status(400).json({ code: 0, msg:"Success" });
  }
  
}
export const make_login = async (req, res) => {
  const { email, password } = req.body;
  
  // ccheck for admins
  if(email==process.env.ADMIN_NAME && password==process.env.ADMIN_PASS){
    const token = jwt.sign(
      { id: "adminid", type: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "10s" } // session valid for 1 hour
    );
    res.cookie("token", token, {
        httpOnly: true, // cannot be accessed via JavaScript
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60*60*1000
      });
      return res
        .status(200)
        .json({ message: "Login successful", type: "admin", code: 0 });
  }

  try {
    const user = await EveryoneScheme.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "Users not found", code: 1 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "wrong password", code: 2 });

    if (user.type == "patient") {
      const NewUserData = await PatientScheme.findOne({
        "contact.email": email,
      });
      const token = NewUserData.generateToken();
      res.cookie("token", token, {
        httpOnly: true, // cannot be accessed via JavaScript
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return res
        .status(200)
        .json({ message: "Login successful", type: user.type, code: 0 });
    } else if (user.type == "doctors" || user.type == "doctor") {
      const NewDoctorData = await DoctorScheme.findOne({ email: email });
      const token = NewDoctorData.generateToken();
      res.cookie("token", token, {
        httpOnly: true, // cannot be accessed via JavaScript
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return res
        .status(200)
        .json({ message: "Login successful", type: user.type, code: 0 });
    }
    res.status(200).json({ message: "Login successful", code: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
