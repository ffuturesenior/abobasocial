import { Router } from "express";
import MessageController from "../Controllers/MessageController.js";

const MessageRouter=new Router();

MessageRouter.post('/messages',MessageController.create)
MessageRouter.get('/messages',MessageController.getAll)
MessageRouter.get('/messages/getbychatid/:chatId&:maxCount',MessageController.getByChatIDwithMaxCount)
MessageRouter.get('/messages/getbychatid/:chatId',MessageController.getByChatIDLength)
MessageRouter.get('/messages/:id',MessageController.getOne)
MessageRouter.put('/messages',MessageController.update)
MessageRouter.delete('/messages/:id',MessageController.delete)


export default MessageRouter;