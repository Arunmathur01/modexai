
import express from "express"
import { agent } from "../controller/agent.controller.js"
const router = express.Router()

router.post("/chat",agent)

export default router;