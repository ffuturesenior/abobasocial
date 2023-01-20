import Like from '../objects/Like.js'


class LikeController{

    async create(req,res){
        try{
            const {userId,postId}=req.body
            const likeCheck=await Like.findOne({userId:userId,postId:postId})
            console.log(likeCheck)
            if(likeCheck){
                return res.status(400).json(`already liked`)
            }
            const like=await Like.create(req.body)
            return res.status(200).json(like)
        }catch(e){
            console.log(e)
        }
    }

    async  getAll(req,res){
        try{
            const like=await Like.find()
            return res.status(200).json(like)
        }catch(e){
            console.log(e)
        }
    }
    async  getByPost(req,res){
        try{
            const {id}=req.params
            const like=await Like.find({postId:id})
            return res.status(200).json(like)
        }catch(e){
            console.log(e)
        }
    }
    async  checkLike(req,res){
        try{
            const {postId,userId}=req.params
            const like=await Like.find({postId:postId,userId:userId})
            return res.status(200).json(like)
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
            const like=await Like.findById(id)
            return res.status(200).json(like)
        }catch(e){
            console.log(e)
        }
    }
    async  update(req,res){
        try{
            const {id}=req.params
            const like=req.body
            //console.log(req.files.avatar)
            //const fileName=FileService.saveFile(req.files.avatar)
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedLike=await Like.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(updatedLike)                /* {...user,avatar:fileName}*/
        }catch(e){
            res.status(500).json(`${e}`)
        }
    }
    async  delete(req,res){
        try{
            const {postId,userId}=req.params
            if(!postId&&!userId){
                res.status(400).json({message:"id undef"})
            }
            const like=await Like.deleteOne({postId:postId,userId:userId})
            return res.json(like)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new LikeController();
