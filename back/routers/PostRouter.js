import { Router } from "express";
import PostController from "../Controllers/PostController.js";

const PostRouter=new Router();

PostRouter.post('/posts',PostController.create)
PostRouter.get('/posts',PostController.getAll)
PostRouter.get('/posts/:id',PostController.getOne)
PostRouter.get('/posts/byUserId/:id',PostController.byUserId)
PostRouter.put('/posts',PostController.update)
PostRouter.delete('/posts/:id',PostController.delete)


export default PostRouter;