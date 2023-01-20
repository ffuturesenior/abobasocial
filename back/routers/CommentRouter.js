import { Router } from "express";
import CommentController from "../Controllers/CommentController.js";

const CommentRouter=new Router();

CommentRouter.post('/comments',CommentController.create)
CommentRouter.get('/comments',CommentController.getAll)
CommentRouter.get('/comments/byPost/:id',CommentController.getByPost)
CommentRouter.get('/comments/:id',CommentController.getOne)
CommentRouter.put('/comments',CommentController.update)
CommentRouter.delete('/comments/:id',CommentController.delete)


export default CommentRouter;