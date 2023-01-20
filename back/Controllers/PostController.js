import Post from '../objects/Post.js'
import FriendShip from '../objects/FriendShip.js'
//import FileService from '../fileService/FileService.js'
import * as uuid from 'uuid'
import multer from 'multer'
import fs from 'fs'

class PostController{
   
    async create(req,res){
        try{
            
            const post=await Post.create(req.body)
            //const fileName=FileService.saveFile(req.files.file,req.file.path)
            return res.status(200).json(post)
        }catch(e){
            console.log(e)
        }
    }

    async  getAll(req,res){
        try{
            const post=await Post.find()
            return res.status(200).json(post)
        }catch(e){
            console.log(e)
        }
    }
    /*getFollowedPost */


    async  byUserId(req,res){
        try{
            const {id}=req.params
            
            const post=await Post.find({userId:id})
            return res.status(200).json(post)
        }catch(e){
            console.log(e)
        }
    }

    async  getOne(req,res){
        try{
            const {id}=req.params
            if(!id){
              return res.status(400).json({message:"invalid id"})
            }
            const post=await Post.findById(id)
            return res.status(200).json(post)
        }catch(e){
            console.log(e)
        }
    }
    async  update(req,res){
        try{
            const {id}=req.params
            const post=req.body
            //console.log(req.files.avatar)
            //const fileName=FileService.saveFile(req.files.avatar)
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedPost=await Post.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(updatedPost)                /* {...user,avatar:fileName}*/
        }catch(e){
            res.status(500).json(`${e}`)
        }
    }
    async  delete(req,res){
        try{
            const {id}=req.params
            if(!id){
                res.status(400).json({message:"id undef"})
            }
            const user=await Post.findByIdAndDelete(id)
            return res.json(user)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new PostController();
