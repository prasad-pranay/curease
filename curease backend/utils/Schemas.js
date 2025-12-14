import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// initializing the environment file
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const patientSchema = new mongoose.Schema({
  name: String,
  joining_date: String,
  plan:String,
  password: String,
  imageUrl: String,
  gender: String,
  info: {
    "dob": String,
    "blood_group": String,
    "occupation": String,
    "age": Number,
    "emergency": String,
  },
  contact: {
    phone: { type: String,  },
    email: { type: String,  },
    location: { type: String,  },
  },
  cart:{
    type: Object,
    default: {},
  },
  address: [
    {
      name: { type: String,  },
      address: { type: String,  },
      pincode: { type: String,  },
      mobile: { type: String,  },
    },
  ],
  payment: [
    {
      name: {type: String},
      cardNo: { type: String,  },
      cvv: { type: String,  },
      expiry: { type: String,  },
    },
  ],
  chat: {
  type: Map,
  of: [
    new mongoose.Schema({
      role: String,
      parts: [{ text: String }]
    },{ _id: false } )
  ],
  default: {}
},
  notification: {
    type: Array,
    default: []
  },
});
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
patientSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, type: "patients" },
    process.env.JWT_SECRET, // secret key
    { expiresIn: "30d" } // token expiry
  );
};
export const PatientScheme = mongoose.model("Patient", patientSchema, "patients");



const everyoneSchema = new mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
  password: String,
  pass:String,
  type: String
});
everyoneSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
export const EveryoneScheme = mongoose.model("Everyone", everyoneSchema, "everyone");



const doctorSchema = new mongoose.Schema({
  name: { type: String },
  joining_date: { type: String },
  password: { type: String },
  imageUrl: { type: String },
  gender: { type: String },
  department: {type: String},
  count: {
    type: Map,
    of: String, // or 'of: Number' depending on what you want to store
    default: {},
  },
  phone: { type: String },
  email: { type: String },
  location: { type: String },
  cart: {
    type: Object,
    default: {},
  },
  notification: [],
});
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
doctorSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, type: "doctors" },
    process.env.JWT_SECRET, // secret key
    { expiresIn: "30d" } // token expiry
  );
};
export const DoctorScheme = mongoose.model("Doctor", doctorSchema, "doctors");



const appointmentSchema = new mongoose.Schema({
  email: String,
  date: String,
  time: String,
  name: String,
  department: String,
  docName: String,
  completedTime: String,
  status: Number,
  rating: Number,
  report: {
    type: Array,
    default: [],
  },
});
export const AppointmentScheme = mongoose.model("Appointment", appointmentSchema, "appointment");


const ordersSchema = new mongoose.Schema({
  email: String,
  date: String,
  time: String,
  total: Number,
  status: Number,
  rating: Number,
  address: {
    name: String,
    address: String,
    pincode: String,
    mobile: String
  },
  payment: {
    cardNo: String,
    expiry: String,
    cvv: String,
  },
  medicine: {
    type: Map,
    of: new mongoose.Schema({
      img: String,
      name: String,
      price: Number,
      quantity: Number,
    }),
    default: {},
  },
});
export const OrdersScheme = mongoose.model("Orders", ordersSchema, "orders");




