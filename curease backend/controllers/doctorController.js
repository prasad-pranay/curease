import { DoctorScheme, EveryoneScheme, PatientScheme } from "../utils/Schemas.js";

export const ListPatients = async (req,res)=>{
    const PATIENTS = await PatientScheme.find().select("name plan info.age imageUrl contact.email"); 
    res.status(200).json({ data: PATIENTS });
}

export const ListDoctors = async (req,res)=>{
    const DOCTORS = await DoctorScheme.find().select("name department imageUrl"); 
    res.status(200).json({ data: DOCTORS });
}


export const addNewDoctor = async (req, res) => {
  try {
    const RECIVED_DATA = JSON.parse(req.body.data);
    let photoPath = req.file ? req.file.path : "public/nouser.jpg";
    photoPath = photoPath.substring(6);
    if("image" in RECIVED_DATA){
      const image = RECIVED_DATA["image"]
      delete RECIVED_DATA.image
      RECIVED_DATA['imageUrl'] = image;
    }else{
      RECIVED_DATA['imageUrl'] = photoPath;
    }
    const newDoctor = new DoctorScheme(RECIVED_DATA);
    await newDoctor.save();
    const AddToEveryone = new EveryoneScheme({name: RECIVED_DATA.name,password:RECIVED_DATA.password,pass:RECIVED_DATA.password,email: RECIVED_DATA.email,imageUrl: RECIVED_DATA.imageUrl,type: "doctor"});
    await AddToEveryone.save()

    res.status(201).json({
      success: true, 
      message: "Doctor added successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving Doctor" });
  }
}
