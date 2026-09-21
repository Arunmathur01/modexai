import express from "express";
import { creditDeduction, Login , Logout, updateUserPayment } from "../controller/Usercontoller.js";

const router = express.Router();

router.post("/login",Login);
router.get("/logout",Logout);
router.post("/update-plan",updateUserPayment);
router.post("/deduct-credits",creditDeduction);
export default router;