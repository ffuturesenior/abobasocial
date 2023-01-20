import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import { check,validationResult } from "express-validator";

const UserRouter=new Router();

UserRouter.post('/users/registrate',
                [
                    check('username','uncorrect username(min:4,max:15)').isLength({min:4,max:15}),
                    check('email','uncorrectemail').isEmail(),
                    check('pswd','uncorrect password(min:4,max:15)').isLength({min:4,max:15})
                ]
                ,UserController.registrate)
UserRouter.post('/users/login',UserController.login)
UserRouter.get('/users',UserController.getAll)
UserRouter.get('/users/:id',UserController.getOne)
UserRouter.get('/users/byName/:name',UserController.byName)
UserRouter.put('/users/update/:id',UserController.update)
UserRouter.put('/users/updateCaption/:id',UserController.updateCaption)
UserRouter.put('/users/updateByName/:id&:name',UserController.updateByName)
UserRouter.delete('/users/:id',UserController.delete)
UserRouter.get('/users/auth/:id',UserController.rehost)

/*users/updateByName*/

export default UserRouter;