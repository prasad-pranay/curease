import fs from "fs";
import { AppointmentScheme, EveryoneScheme,OrdersScheme,PatientScheme  } from "../utils/Schemas.js";
import path from "path";
import jwt from "jsonwebtoken"
import { sendMailPatientWelcome } from "../utils/sendMail.js";

function searchItems(query, limit = 5) {
  const data = fs.readFileSync("./data/cityList.csv", "utf8");
  const items = data.split("\n").map(line => line.trim()).filter(Boolean);
  const lower = query.toLowerCase();
  const matches = items.filter(item =>
    item.toLowerCase().includes(lower)
  );
  return matches.slice(0, limit);
}

export const profileCitySearch = async (req, res) => {
  const searchCity = req.query.city; // example: /patient-city?city=q=Paracetamol
  const results = searchItems(searchCity);
  res.status(200).json({ data: results });
}

export const addNewPatient = async (req, res) => {
  try {
    const RECIVED_DATA = JSON.parse(req.body.data);
    let photoPath = req.file ? req.file.path : "public/nouser.jpg";
    photoPath = photoPath.substring(6)
    RECIVED_DATA['imageUrl'] = photoPath;

    const newPatient = new PatientScheme(RECIVED_DATA);
    await newPatient.save();

    // await PatientScheme.updateOne({ _id: decoded.id },{ $unset: { "chat.default": "" } });
    // await fetchPatientData.save();


    const AddToEveryone = new EveryoneScheme({name: RECIVED_DATA.name,password:RECIVED_DATA.password,pass:RECIVED_DATA.password,email: RECIVED_DATA.contact.email,imageUrl: RECIVED_DATA.imageUrl,type: "patient"});
    await AddToEveryone.save()

    const mail = await sendMailPatientWelcome(RECIVED_DATA.contact.email, RECIVED_DATA.name);
    res.status(201).json({
      success: true, 
      message: "Patient added successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving patient" });
  }
}

export const bookNewAppointment = async (req,res)=>{
  try{ 
      const RECIEVED_DATA = req.body
      const NewAppointment = new AppointmentScheme(RECIEVED_DATA);
      await NewAppointment.save();
        res.status(201).json({
        success: true,
        message: "Appointment Booked Successfully",
      });
  }catch(err){
    console.error(err);
    res.status(500).json({ success: false, message: "Error booking appointment" });
  }
}

export const addAddress = async (req,res)=>{
  try{
      const token = req.cookies.token;
      const name = req.query.name
      const address = req.query.address
      const pincode = req.query.pincode
      const mobile = req.query.mobile

      // console.log(name,address,pincode,mobile)
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      const fetchPatientData = await PatientScheme.findById(decoded["id"]);
      fetchPatientData.address.push({"name":name,"address":address,"pincode":pincode,"mobile":mobile})
      await fetchPatientData.save()
  }catch(err){
    console.error(err);
    res.status(500).json({ success: false, message: "Error adding address" });
  }
}

export const addNewCard = async (req, res) => {
  try {
    const RECIVED_DATA = req.body;
      const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const fetchPatientData = await PatientScheme.findById(decoded["id"]);
    fetchPatientData.payment.push({"cardNo":RECIVED_DATA.number,"cvv":RECIVED_DATA.cvc,"expiry":RECIVED_DATA.expiry,"name":RECIVED_DATA.name})
    await fetchPatientData.save()

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving new card" });
  }
} 

export const changePlan = async (req, res) => {
  try {
    const RECIVED_DATA = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const fetchPatientData = await PatientScheme.findById(decoded["id"]);
    fetchPatientData.plan = RECIVED_DATA.newPlan;
    await fetchPatientData.save()

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving new plan" });
  }
} 
