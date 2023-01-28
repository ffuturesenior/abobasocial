import User from '../objects/User.js'

import { validationResult } from 'express-validator'
import  jwt from 'jsonwebtoken'
//import FileService from '../fileService/FileService.js'
import bcrypt from 'bcryptjs'

class UserController{
    async  registrate (req,res) {
        try{
            //console.log('req func worked')
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:`reg error,errors:${errors}`}) 
            }
            const {username,email,pswd,admin,caption,avatar}=req.body
            const usernameChek=await User.findOne({username})
            const emailChek=await User.findOne({email})
            if(usernameChek){
                return res.status(400).json({message:`username:${username} already taken`})
            }
            if(emailChek){
                return res.status(400).json({message:`username:${email} already email`})
            }
            const hashPswd= await bcrypt.hash(pswd,8)
            const user=new User({username,email,pswd:hashPswd,admin,caption,avatar})
            await user.save()
            return res.status(200).json({message:"user created"})
        }catch(e){
            console.log(e)
        }
    }
    async  login(req,res){
        try{
            //console.log('login func worked')
            const {username,email,pswd}=req.body
            const user =await User.findOne({email})
            const usernameFind=await User.findOne({username})
            const emailFind=await User.findOne({email})
            if(!usernameFind){
                return res.status(400).json({message:`can not find:${username} `})
            }
            if(!emailFind){
                return res.status(400).json({message:`can not find:${email}`})
            }
            const pswdCheck=  bcrypt.compareSync(pswd,user.pswd)
            if(!pswdCheck){
                return res.status(400).json({message:"invalid pswd"})
            }
            const token=jwt.sign({id:user._id},"228",{expiresIn:"1h"})
            return res.status(200).json({
                token,
                user:{
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    //pswd:user.pswd,
                    caption:user.caption,
                    avatar:user.avatar,
                    admin:user.admin
                }
            })
        }catch(e){
            console.log(e)
        }
    }
    async  getAll(req,res){
        try{
            //console.log('getAll worked')
            const users=await User.find()
            return res.status(200).json(users)
        }catch(e){
            console.log(e)
        }
    }
    async  getOne(req,res){
        try{
            //console.log('getOne worked')
            const {id}=req.params
            
            if(!id){
                return res.status(400).json({message:"invalid id"})
            }
            if(id==undefined){
                return res.status(400).json({message:"invalid id"})
            }
            const user=await User.findById(id)
            return res.status(200).json(user)
        }catch(e){
            console.log(e)
        }
    }
    async  byName(req,res){
        try{
            const {name}=req.params
            //console.log('by name')
            if(name.length>=3){
                const user=await User.find()
                const usersByName=user.filter(user=>{
                    return user.username.toLowerCase().includes(name.toLowerCase())
                })
                return res.status(200).json(usersByName)
            }
        }catch(e){
            console.log(e)
        }
    }
    async  update(req,res){
        try{
            const {id}=req.params
            const user=req.body
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(updatedUser)     
        }catch(e){
            res.status(500).json(`${e}`)
        }
    }
    async  updateCaption(req,res){
        try{
            //console.log('updateCaption func')
            const {id}=req.params
            const user=req.body
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(updatedUser)     
        }catch(e){
            res.status(500).json(`${e}`)
        }
    }
    async  updateByName(req,res){
        try{
            //console.log('updateByName func')
            const {id,name}=req.params
            //const user=req.body

            //console.log(req.files.avatar)
            //const fileName=FileService.saveFile(req.files.avatar)
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const nameCheck=await User.findOne({username:name})
            if(nameCheck){
                return res.status(400).json('name already taken')
            }else{
                const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true})
                return res.status(200).json(updatedUser)      /* {...user,avatar:fileName}*/
            }
        }catch(e){
            res.status(500).json(`${e}`)
        }
    }
    async  delete(req,res){
        try{
            //console.log('delete func')
            const {id}=req.params
            if(!id){
                res.status(400).json({message:"id undef"})
            }
            const user=await User.findByIdAndDelete(id)
            return res.json(user)
        }catch(e){
            res.status(500).json(e)
        }
    }

    async  rehost(req,res){
        try{
            //console.log('rehost func')

            const {id}=req.params
            if(!id){
                res.status(400).json({message:"id undef"})
            }
            const user = await User.findById(id)
            const token = jwt.sign({id: id}, '228', {expiresIn: "1h"})
            return res.status(200).json({
                token,
                user:{
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    //pswd:user.pswd,
                    caption:user.caption,
                    avatar:user.avatar,
                    admin:user.admin
                }
            })
        }catch(e){
            console.log(e)
        }
    }
}

export default new UserController();
