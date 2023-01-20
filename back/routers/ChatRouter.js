import { Router } from "express";
import ChatController from "../Controllers/ChatController.js";

const ChatRouter=new Router();

ChatRouter.post('/chat',ChatController.create)
ChatRouter.get('/chat',ChatController.getAll)
ChatRouter.get('/chat/getByName/:name',ChatController.getByName)
ChatRouter.get('/chat/:id',ChatController.getOne)
ChatRouter.put('/chat',ChatController.update)
ChatRouter.delete('/chat/:id',ChatController.delete)


export default ChatRouter;