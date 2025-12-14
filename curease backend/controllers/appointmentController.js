import { AppointmentScheme, DoctorScheme } from "../utils/Schemas.js";


export const deleteAppointment = async (req,res)=>{
    const RECIVED_DATA = req.body.id;
    try{
        await AppointmentScheme.deleteOne({_id:RECIVED_DATA}); 
        res.status(200).json({ msg:"success" });
    }catch(err){
        console.log(err)
        res.status(401).json({ msg:"error occured" });
    }
}


export const markAppointment = async (req,res)=>{
    // name,age,gender,id,items,docName,docId
    const RECIVED_DATA = req.body;
    const resd = await fetch("http://127.0.0.1:8000/get-recipt",{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RECIVED_DATA),
    })
    const reciptImage= await resd.json()

    const currApp = await AppointmentScheme.findById(RECIVED_DATA.appointmentId)

    const today = new Date();

    const doctor = await DoctorScheme.findById(RECIVED_DATA.docId)
    if(doctor.count.has(`${today.getDate()}`)){
        const old = doctor.count.get(`${today.getDate()}`)
        doctor.count.set(`${today.getDate()}`,old+1);
    }else{
        doctor.count.set(`${today.getDate()}`,1);
    }
    await doctor.save()

    currApp.completedTime = `${today.getHours()}:${today.getMinutes()} | ${today.getDate()}/${today.getMonth()}`
    currApp.docName = RECIVED_DATA.docName,
    currApp.status = 2
    currApp.report.push([reciptImage.img,RECIVED_DATA.items])
    await currApp.save()
    res.status(200).json({ msg:"success" });

}


export const rateAppointment = async (req,res)=>{
    const RECIVED_DATA = req.body;
    const currApp = await AppointmentScheme.findById(RECIVED_DATA.id);
    currApp.rating = RECIVED_DATA.rating;
    await currApp.save()

}