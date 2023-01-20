import Parcipiant from '../objects/Parcipiant.js'
import Chats from '../objects/Chat.js'

class ParcipiantController{

    async create(req,res){
        try{
            const {userId,chatId}=req.body
            const parcipiantCheck= await Parcipiant.findOne({userId:userId,chatId:chatId})
            //console.log(parcipiantCheck)
            if(parcipiantCheck){
                return res.status(400).json('parcipiant already exist')
            }
            const parcipiant=await Parcipiant.create(req.body)
            return res.status(200).json(parcipiant)
           
        }catch(e){
            console.log(e)
        }
    }

    async  getAll(req,res){
        try{
            const parcipiant=await Parcipiant.find()
            return res.status(200).json(parcipiant)
        }catch(e){
            console.log(e)
        }
    }
    async  byUserId(req,res){
        try{
            const {id}=req.params
            const parcipiant=await Parcipiant.find({userId:id})
            return res.status(200).json(parcipiant)
        }catch(e){
            console.log(e)
        }
    }

    //byRoomIdTenParcipiants
    
     
    async  byRoomIdTenParcipiants(req,res){
        try{
            const {id}=req.params
            const parcipiant=await Parcipiant.find({chatId:id}).limit(20)
            return res.status(200).json(parcipiant)
        }catch(e){
            console.log(e)
        }
    }

    async  byRoomId(req,res){
        try{
            const {id}=req.params
            const parcipiant=await Parcipiant.find({chatId:id})
            return res.status(200).json(parcipiant)
        }catch(e){
            console.log(e)
        }
    }
    /*byRoomAndChatId*/

    async  byRoomAndChatId(req,res){
        try{
            const {userId,chatId}=req.params
            const parcipiant=await Parcipiant.findOne({chatId:chatId,userId:userId})
            return res.status(200).json(parcipiant)
        }catch(e){
            console.log(e)
        }
    }
    
    //getByUserName

    async  getByUserName(req,res){
        try{
            const {username}=req.params
            if(username.length>=3){
                const parcipiants=await Parcipiant.find()
                const parcipiantsByName=parcipiants.filter(parcipiant=>{
                    return parcipiant.username.toLowerCase().includes(username.toLowerCase())
                })
                return res.status(200).json(parcipiantsByName)
            }
            return res.status(200).json(parcipiant)
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
            const parcipiant=await Parcipiant.findById(id)
            return res.status(200).json(parcipiant)
        }catch(e){
            console.log(e)
        }
    }
    async  update(req,res){
        try{
            const {id}=req.params
            const parcipiant=req.body
            //console.log(req.files.avatar)
            //const fileName=FileService.saveFile(req.files.avatar)
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedMessage=await Parcipiant.findByIdAndUpdate(id,req.body,{new:true})
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
            const parcipiant=await Parcipiant.findByIdAndDelete(id)
            return res.json(parcipiant)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new ParcipiantController();
