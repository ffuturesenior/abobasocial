import Comment from '../objects/Comment.js'

class CommentController{

    async create(req,res){
        try{
            const comment= await Comment.create(req.body)
            return res.status(200).json(comment)
        }catch(e){
            console.log(e)
        }
    }

    async  getAll(req,res){
        try{
            const comment=await Comment.find()
            return res.status(200).json(comment)
        }catch(e){
            console.log(e)
        }
    }

    async  getByPost(req,res){
        try{
            const {id}=req.params
            const comment=await Comment.find({postId:id})
            return res.status(200).json(comment)
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
            const comment=await Comment.findById(id)
            return res.status(200).json(comment)
        }catch(e){
            console.log(e)
        }
    }
    async  update(req,res){
        try{
            const {id}=req.params
            const comment=req.body
            //console.log(req.files.avatar)
            //const fileName=FileService.saveFile(req.files.avatar)
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedComment=await Comment.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(updatedComment)                /* {...user,avatar:fileName}*/
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
            const comment=await Comment.findOneAndDelete({specialId:id})
            return res.json(comment)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new CommentController();
