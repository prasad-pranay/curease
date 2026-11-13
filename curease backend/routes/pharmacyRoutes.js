import express from "express";
import { updateMyCart, getRandomMedicines, searchMedicine, addNewOrder, rateOrder, getOrders, statusOrder } from "../controllers/pharmacyRouter.js";

const router = express.Router();

router.post("/updateMyCart",updateMyCart)
router.get("/random-rows", getRandomMedicines);
router.get("/search", searchMedicine );
router.post("/add-new-order", addNewOrder );
router.post("/rate-order", rateOrder );
router.get("/get-orders",getOrders)
router.post("/status-orders",statusOrder)

export default router;

