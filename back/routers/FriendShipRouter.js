import { Router } from "express";
import FriendShipController from "../Controllers/FriendShipController.js";

const FriendShipRouter=new Router();

FriendShipRouter.post('/subscribes',FriendShipController.create)
FriendShipRouter.get('/subscribes',FriendShipController.getAll)
FriendShipRouter.get('/subscribes/getSubscribers/:id',FriendShipController.getSubscribers)
FriendShipRouter.get('/subscribes/getSubscribes/:id',FriendShipController.getSubscribes)
FriendShipRouter.get('/subscribes/check/:id&:otherUserId',FriendShipController.check)
FriendShipRouter.get('/subscribes/:id',FriendShipController.getOne)
FriendShipRouter.put('/subscribes',FriendShipController.update)
FriendShipRouter.delete('/subscribes/:id',FriendShipController.delete)


export default FriendShipRouter;