import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import UserRouter from './routers/UserRouter.js';
import PostRouter from './routers/PostRouter.js'
import ParcipiantRouter from './routers/ParcipiantRouter.js'
import MessageRouter from './routers/MessageRouter.js'
import LikeRouter from './routers/LikeRouter.js'
import CommentRouter from './routers/CommentRouter.js';
import ChatRouter from './routers/ChatRouter.js';
import FriendShipRouter from './routers/FriendShipRouter.js';
import p2pChatRouter from './routers/p2pChatRouter.js';
import dotenv from 'dotenv/config'
import bodyParser from 'body-parser'
import multer from 'multer'
import File from './objects/File.js';

//import cors from './middleware/cors.middleware.js';
const PORT=process.env.PORT||5000;
const DB_URL=process.env.DB_URL


const app=express();
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
app.use(cors())
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/aboba',UserRouter)
app.use('/aboba',PostRouter)
app.use('/aboba',ParcipiantRouter)
app.use('/aboba',MessageRouter)
app.use('/aboba',LikeRouter)
app.use('/aboba',CommentRouter)
app.use('/aboba',ChatRouter)
app.use('/aboba',FriendShipRouter)
app.use('/aboba',p2pChatRouter)

async function StartApp(){
    try{
        await mongoose.connect(DB_URL,{useUnifiedTopology:true,useNewUrlParser:true})
        

        app.listen(PORT,()=>{console.log("working")})
    }catch(e){
        console.log(e)
    }
}
StartApp()

app.get('/',(req,res)=>{
    res.status(200).json(req.body)
})


app.get('/aboba/file/:id', async(req,res)=>{
    const {id}=req.params
    const file=await File.findOne({specialId:id})
    return res.status(200).json(file)
})

app.post('/aboba/file/', async(req,res)=>{
    const file=await File.create(req.body)
    return res.status(200).json(file)
})
app.delete('/aboba/file/:id', async(req,res)=>{
    const {id}=req.params
    const file=await File.findOneAndDelete({specialId:id})
    return res.status(200).json(file)
})
