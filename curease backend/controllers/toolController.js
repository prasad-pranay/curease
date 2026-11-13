import Tesseract from "tesseract.js";

export const imageToText = async (req,res)=>{
    try {
    const result = await Tesseract.recognize(req.file.path, "eng");
    const TEXT = result.data.text;
    const Ai = await fetch(`http://127.0.0.1:8000/get-response`,{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
        history:[],
        query: `Give me only a json format of what this text says, in which heading is the key and content is the key value of it. \n ${TEXT}`
      })
    })
    const AiText = await Ai.json()
    console.log(AiText)
    res.json({ text: TEXT, ai:AiText.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OCR failed" });
  }
}