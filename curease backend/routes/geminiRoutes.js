import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken";
import { PatientScheme } from "../utils/Schemas.js";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash",apiVersion: "v1beta", systemInstruction: `
// You are a medical expert providing concise, professional, and fact-based responses.
// Reply in a clinical and human tone.
// Do not include disclaimers or mention being an AI assistant.
// Focus only on medical explanation or advice.
// `});

const router = express.Router();


router.post("/saved-chat", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    // await PatientScheme.updateOne({ _id: decoded.id },{ $unset: { password: "" } });
    const fetchPatientData = await PatientScheme.findById(decoded["id"]);
    const chatList = []
    if (fetchPatientData.chat?.has("default")){
      await PatientScheme.updateOne({ _id: decoded.id },{ $unset: { "chat.default": "" } });
      await fetchPatientData.save();
    }else{
      console.log("there")
    }
    for (let key of fetchPatientData.chat.keys()) {
        chatList.push([fetchPatientData.chat.get(key)[0].parts[0].text,key]);
    }
    res.json({data:chatList})
})

router.post("/get-data", async (req, res) => {
    const RECIEVED_DATA = req.body;
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const fetchPatientData = await PatientScheme.findById(decoded["id"]);
    const currentChatData = fetchPatientData.chat.get(String(RECIEVED_DATA.chatId))
    res.json({data:currentChatData})
})

async function getResponseFromFlask(query,history){
    const sendData = {
        query:query,
        history:history
    }
    const result = await fetch(`http://127.0.0.1:8000/get-response`,{
            method:"POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData),
        })
    const response = await result.json()
    return response.data;
}

router.post("/get-response", async (req, res) => {
  const RECIEVED_DATA = req.body;
  const token = req.cookies.token;
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  if(RECIEVED_DATA.chatId==null){
    // means first create new chat 
    const fetchPatientData = await PatientScheme.findById(decoded["id"]);
    const nextKey = fetchPatientData.chat.size;
    const result = await getResponseFromFlask(RECIEVED_DATA.query,[]);
    fetchPatientData.chat.set(String(nextKey), [
      { role: "user", parts: [{ text: RECIEVED_DATA.query }] },
      { role: "model", parts: [{ text: result }] }
    ])
    fetchPatientData.markModified('chat');
    await fetchPatientData.save()
    res.json({ chatId: nextKey });
  }else{
    const fetchPatientData = await PatientScheme.findById(decoded["id"]);
    const previousHistory = fetchPatientData.chat.get(String(RECIEVED_DATA.chatId))
    const result = await getResponseFromFlask(RECIEVED_DATA.query,previousHistory);
    fetchPatientData.chat.get(String(RECIEVED_DATA.chatId)).push({ role: "user", parts: [{ text: RECIEVED_DATA.query }] })
    fetchPatientData.chat.get(String(RECIEVED_DATA.chatId)).push({ role: "model", parts: [{ text: String(result) }] })
    fetchPatientData.markModified('chat');
    await fetchPatientData.save()
    res.json({data:fetchPatientData.chat.get(String(RECIEVED_DATA.chatId))})
    }
});


// export const addNewChat = async (req,res)=>{
//   try {
//     const RECIVED_DATA = req.body;
//     const token = req.cookies.token;
//     const decoded = jwt.verify(token,process.env.JWT_SECRET);
//     const fetchPatientData = await PatientScheme.findById(decoded["id"]);
//     const today = new Date()
//     // fetching next key 
//     const keys = Object.keys(fetchPatientData.chat);
//     const nextKey = keys.length > 0 ? Math.max(...keys.map(k => Number(k))) + 1 : 1;

//     fetchPatientData.chat[nextKey] = {
//       date:`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`,
//       time:`${today.getHours()}:${today.getMinutes()}`,
//       chat: [[RECIVED_DATA.data]]
//     }
//     await fetchPatientData.save()

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error adding new chat" });
//   }
// }


export default router;