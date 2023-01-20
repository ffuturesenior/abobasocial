import { Router } from "express";
import ParcipiantController from "../Controllers/ParcipiantController.js";

const ParcipiantRouter=new Router();

ParcipiantRouter.post('/parcipiants',ParcipiantController.create)
ParcipiantRouter.get('/parcipiants',ParcipiantController.getAll)
ParcipiantRouter.get('/parcipiants/:id',ParcipiantController.getOne)
ParcipiantRouter.get('/parcipiants/getParcipiantsByChatId/:id',ParcipiantController.byRoomId)
ParcipiantRouter.get('/parcipiants/get10ParcipiantsByChatId/:id',ParcipiantController.byRoomIdTenParcipiants)
//getParcipiantByName
ParcipiantRouter.get('/parcipiants/getParcipiantByName/:username',ParcipiantController.getByUserName)
ParcipiantRouter.get('/parcipiants/getParcipiantByChatIdAndUserId/:userId&:chatId',ParcipiantController.byRoomAndChatId)
ParcipiantRouter.get('/parcipiants/byParcipiantId/:id',ParcipiantController.byUserId)
ParcipiantRouter.put('/parcipiants/:id',ParcipiantController.update)
ParcipiantRouter.delete('/parcipiants/:id',ParcipiantController.delete)

export default ParcipiantRouter;