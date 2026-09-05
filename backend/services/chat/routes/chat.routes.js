import express from "express";
import {createconversation,getConversation,updateconversation} from "../controller/conversation.controller.js"
import {saveMessage,getMessage} from "../controller/message.controller.js"

const router = express.Router();

router.get("/create-conversation",createconversation)
router.get("/get-conversation",getConversation)
router.post("/update-conversation",updateconversation)
router.post("/save-message",saveMessage)
router.get("/get-message/:conversationId",getMessage)





export default router;