import Message from '../objects/Message.js'
class MessageController{

    async create(req,res){
        try{
            const message=await Message.create(req.body)
            return res.status(200).json(message)
        }catch(e){
            console.log(e)
        }
    }

    async  getAll(req,res){
        try{
            const message=await Message.find()
            return res.status(200).json(message)
        }catch(e){
            console.log(e)
        }
    }
    async  getByChatIDwithMaxCount(req,res){
        try{
            const {chatId,maxCount}=req.params
            const  messages=await Message.find({chatId:chatId})
            const slicedMsg=messages.slice(messages.length-maxCount,messages.length)
            //console.log(slicedMsg)
            return res.status(200).json(slicedMsg)
        }catch(e){
            console.log(e)
        }
    }
    
    async  getByChatIDLength(req,res){
        try{
            const {chatId}=req.params
            const  messages=await Message.find({chatId:chatId})
            return res.status(200).json(messages.length)
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
            const message=await Message.findById(id)
            return res.status(200).json(message)
        }catch(e){
            console.log(e)
        }
    }

    //setReaded


    async  update(req,res){
        try{
            const {id}=req.params
            const message=req.body
            //console.log(req.files.avatar)
            //const fileName=FileService.saveFile(req.files.avatar)
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedMessage=await Message.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(updatedMessage)                /* {...user,avatar:fileName}*/
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
            const message=await Message.findOneAndDelete({specialId:id})
            return res.json(message)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new MessageController();
