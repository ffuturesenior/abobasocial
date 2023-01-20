import { Router } from "express";
import LikeController from "../Controllers/LikeController.js";

const LikeRouter=new Router();

LikeRouter.post('/likes',LikeController.create)
LikeRouter.get('/likes',LikeController.getAll)
LikeRouter.get('/likes/byPost/:id',LikeController.getByPost)
LikeRouter.get('/likes/checkLike/:postId&:userId',LikeController.checkLike)
LikeRouter.get('/likes/:id',LikeController.getOne)
LikeRouter.put('/likes',LikeController.update)
LikeRouter.delete('/likes/:postId&:userId',LikeController.delete)


export default LikeRouter;              