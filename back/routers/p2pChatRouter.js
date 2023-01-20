import { Router } from "express";
import p2pChatController from "../Controllers/p2pChatController.js";

const p2pChatRouter=new Router();


p2pChatRouter.post('/p2pchats',p2pChatController.create)
p2pChatRouter.get('/p2pchats',p2pChatController.getAll)
p2pChatRouter.get('/p2pchats/getbyusers/:user1Id&:user2Id',p2pChatController.getByTwoUsers)
p2pChatRouter.get('/p2pchats/getbyuserId/:id',p2pChatController.getByUserId)
p2pChatRouter.get('/p2pchats/:id',p2pChatController.getOne)
p2pChatRouter.put('/p2pchats/update/:id',p2pChatController.update)
p2pChatRouter.delete('/p2pchats/:id',p2pChatController.delete)



export default p2pChatRouter;