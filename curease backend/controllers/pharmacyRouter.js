import fs, { createReadStream } from "fs";
import csv from "csv-parser";
import { OrdersScheme,PatientScheme  } from "../utils/Schemas.js";
import jwt from "jsonwebtoken"
import Papa from "papaparse"

// Functions Here
function getRandomRowsFromCSV(filePath, count = 60) {
  return new Promise((resolve, reject) => {
    const results = [];

    createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => {
        const shuffled = results.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);
        resolve(selected);
      })
      .on("error", (err) => reject(err));
  }); 
}
// Functions Here
function searchCSV(searchTerm) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("./data/Medicine_Details_With_ID.csv")
      .pipe(csv())
      .on("data", (row) => {
        const secondColumnValue = Object.values(row)[1]; // second column
        if (
          secondColumnValue &&
          secondColumnValue.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push(row);
        }
      })
      .on("end", () => resolve(results.slice(0, 50)))
      .on("error", reject);
  });
}

export const getRandomMedicines = async (req, res) => {
  try {
    const rows = await getRandomRowsFromCSV("./data/Medicine_Details_With_ID.csv",60);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to read CSV file", "msg":err });
  }
}

export const updateMyCart = async (req,res)=>{
  try{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const fetchPatientData = await PatientScheme.findById(decoded["id"]);
    fetchPatientData.cart = req.body;
    fetchPatientData.save()
    return res.status(200).json({ success: true })
  }catch(err){
    console.log("got an error at updating my cart:",err)
    return res.status(200).json({ success: false,message:err })
  }
}

export const searchMedicine = async (req, res) => {
  const searchTerm = req.query.q; // example: /search?q=Paracetamol
  if (!searchTerm) {
    return res.status(400).json({ error: "Please provide ?q=searchTerm" });
  }

  try {
    const results = await searchCSV(searchTerm);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export const getOrders = async(req,res)=>{
  try{
    const Orders = await OrdersScheme.find({})
    return res.status(200).json(Orders)

  }catch(err){
    console.log("unable to get all error:",err)
    return res.status(400).json({ success: false,message:err })
  }
}

export const addNewOrder = async (req, res) => {
  try{
    const data = req.body;
    const newOrder = await OrdersScheme(data)
    newOrder.save()
    Object.keys(data["medicine"]).map(val=>{
      decrementInstock(val,data["medicine"][val].quantity)
    })
    return res.status(200).json({ success: true })
  }catch(err){
    console.log("got an error at updating my cart:",err)
    return res.status(200).json({ success: false,message:err })
  }
}

export const statusOrder = async (req, res) => {
  try{
    const statusOrder = await OrdersScheme.findOne({_id: req.body.id})
    statusOrder.status = req.body.status;
    await statusOrder.save()
    const AllOrders = await OrdersScheme.find({});
    return res.status(200).json(AllOrders)
  }catch(err){
    console.log("got an error at updating status of a order",err)
    return res.status(200).json({ success: false,message:err })
  }
}

export const rateOrder = async (req, res) => {
  try{
    const newOrder = await OrdersScheme.findOne({_id: req.body.id})
    newOrder.rating = req.body.rating;
    await newOrder.save()
    return res.status(200).json({ success: true })
  }catch(err){
    console.log("got an error at updating review of a order",err)
    return res.status(200).json({ success: false,message:err })
  }
}





function decrementInstock(id,count) {
    const file = fs.readFileSync("data/Medicine_Details_With_ID.csv", "utf8");
    console.log(id,count)
    let data = Papa.parse(file, {
        header: true,
        skipEmptyLines: true
    }).data;

    data = data.map(row => {
        if (row.ID == id) {
            let value = parseInt(row.instock) || 0;
            row.instock = Math.max(value - count, 0);  // prevent negative
            console.log(row)
        }
        return row;
    });

    const csvString = Papa.unparse(data);
    fs.writeFileSync("data/Medicine_Details_With_ID.csv", csvString);
}
