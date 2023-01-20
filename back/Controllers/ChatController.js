import Chat from '../objects/Chat.js'


class ChatController{

    async create(req,res){
        try{
            const {name}=req.body
            const namecheck=await Chat.findOne({name:name})
            console.log(namecheck)
            if(!namecheck){
                const chat=Chat.create(req.body)
                return res.status(200).json(chat)
            }else{
                return res.status(400).json('name already taken')
            }
        }catch(e){
            console.log(e)
        }
    }

    async  getAll(req,res){
        try{
            const chat=await Chat.find()
            return res.status(200).json(chat)
        }catch(e){
            console.log(e)
        }
    }

    async  getByName(req,res){
        try{
            const {name}=req.params
            if(name.length>=3){
                const chat=await Chat.find()
                const chatsByName=chat.filter(chat=>{
                    return chat.name.toLowerCase().includes(name.toLowerCase())
                })
                return res.status(200).json(chatsByName)
            }
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
            const chat=await Chat.findById(id)
            return res.status(200).json(chat)
        }catch(e){
            console.log(e)
        }
    }
    async  update(req,res){
        try{
            const {id}=req.params
            const chat=req.body
            //console.log(req.files.avatar)
            //const fileName=FileService.saveFile(req.files.avatar)
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedChat=await Chat.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(updatedChat)                /* {...user,avatar:fileName}*/
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
            const chat=await Chat.findByIdAndDelete(id)
            return res.json(chat)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new ChatController();
