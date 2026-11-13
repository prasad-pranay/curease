import { DoctorScheme, PatientScheme } from "../utils/Schemas.js";

export const singlePerson = async (req, res) => {
  try {
    const RECIVED_DATA = req.body;

    if(RECIVED_DATA.type=="patient"){
        const PatientData = await PatientScheme.findOne({ "_id": RECIVED_DATA._id });
        // first parameter is that if he she has read or not
        PatientData.notification.push([false,RECIVED_DATA.priority,RECIVED_DATA.title,RECIVED_DATA.content])
        await PatientData.save()
    }else{
        const DoctorData = await DoctorScheme.findOne({ "_id": RECIVED_DATA._id });
        // first parameter is that if he she has read or not
        DoctorData.notification.push([false,RECIVED_DATA.priority,RECIVED_DATA.title,RECIVED_DATA.content])
        await DoctorData.save()
    }
    res.status(201).json({
      success: true, 
      message: "Notification sent successfully to single person",
    });
  } catch (error) {
    console.log("error occured whiel sending single person notification")
    console.log(error)
    res.status(500).json({ success: false, message: "Error sending notification to single person" });
  }
}

export const multiplePerson = async (req, res) => {
  try {
    const RECIVED_DATA = req.body;
    if(RECIVED_DATA.type=="patient"){
        await PatientScheme.updateMany({}, { $push: { notification: [false,RECIVED_DATA.priority,RECIVED_DATA.title,RECIVED_DATA.content] } });
    }else if(RECIVED_DATA.type=="doctor"){
        await DoctorScheme.updateMany({}, { $push: { notification: [false,RECIVED_DATA.priority,RECIVED_DATA.title,RECIVED_DATA.content] } });
    }else{
        await DoctorScheme.updateMany({}, { $push: { notification: [false,RECIVED_DATA.priority,RECIVED_DATA.title,RECIVED_DATA.content] } });
        await PatientScheme.updateMany({}, { $push: { notification: [false,RECIVED_DATA.priority,RECIVED_DATA.title,RECIVED_DATA.content] } });
    }
    res.status(201).json({
      success: true, 
      message: "Notification sent successfully to multiple person",
    });
  } catch (error) {
    console.log("error occured whiel sending multiple person notification")
    console.log(error)
    res.status(500).json({ success: false, message: "Error sending notification to multiple person" });
  }
}

export const markNotiRead = async (req, res) => {
  try {
    const RECIVED_DATA = req.body;
    if(RECIVED_DATA.type=="patient"){
        const Patient = await PatientScheme.findOne({_id:RECIVED_DATA._id})
        if(!Patient)return
        RECIVED_DATA.index.map(value=>{
          Patient.notification[value][0] = true;
        })
        Patient.markModified('notification'); 
        await Patient.save()
        console.log("notification read for patient")
      }else if(RECIVED_DATA.type=="doctor"){
        const Doctor = await DoctorScheme.findOne({_id:RECIVED_DATA._id})
        if(!Doctor)return
        RECIVED_DATA.index.map(value=>{
          Doctor.notification[value][0] = true;
        })
        await Doctor.save()
        console.log("notification read for doctor")
    }
    res.status(201).json({
      success: true, 
      message: "Notification marked read",
    });
  } catch (error) {
    console.log("error occured whiel marking noti read")
    console.log(error)
    res.status(500).json({ success: false, message: "Error marking noti read" });
  }
}


