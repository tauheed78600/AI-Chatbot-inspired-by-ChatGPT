import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat_controller.js";

// Protected API
const chatRoute = Router()
chatRoute.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion)
chatRoute.get('/all-chats', verifyToken, sendChatsToUser)
chatRoute.delete('/delete-chats', verifyToken, deleteChats)

export default chatRoute