import express from "express";
import login  from "../controller/Usercontoller.js";
const router = express();

router.post("/login",login);

export default router;