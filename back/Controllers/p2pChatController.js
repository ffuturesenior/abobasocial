import p2pChat from '../objects/p2pChat.js'

class p2pChatController{
    
    async  create(req,res){
        try{
            const  p2pChats=await p2pChat.create(req.body)
            return res.status(200).json(p2pChats)
        }catch(e){
            console.log(e)
        }
    }
    async  getAll(req,res){
        try{
            const  p2pChats=await p2pChat.find()
            return res.status(200).json(p2pChats)
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
            const p2pChats=await p2pChat.findById(id)
            return res.status(200).json(p2pChats)
        }catch(e){
            console.log(e)
        }
    }
    async  getByTwoUsers(req,res){
        try{
            const {user1Id,user2Id}=req.params
            
            if(!user1Id||!user2Id){
              return res.status(400).json({message:"invalid id"})
            }
            const p2pChats1attempt=await p2pChat.find({spId:`${user1Id}${user2Id}`})
            const p2pChats2attempt=await p2pChat.find({spId:`${user2Id}${user1Id}`})
            if(p2pChats1attempt.length==0){
                return res.status(200).json(p2pChats2attempt)
            }
            if(p2pChats2attempt.length==0){
                return res.status(200).json(p2pChats1attempt)
            }
        }catch(e){
            console.log(e)
        }
    }


    async  getByUserId(req,res){
        try{
            const {id}=req.params
            
            if(!id){
                return res.status(400).json({message:"invalid id"})
              }
            const p2pChats=await p2pChat.find()
            const p2pChatsBySpId=p2pChats.filter(p2pChat=>{
                return p2pChat.spId.toLowerCase().includes(id.toLowerCase())
            })
            return res.status(200).json(p2pChatsBySpId)
        }catch(e){
            console.log(e)
        }
    }
    async  update(req,res){
        try{
            const {id}=req.params
            const p2pChats=req.body
           
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const uptadetP2pChats=await p2pChat.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(uptadetP2pChats)                /* {...user,avatar:fileName}*/
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
            const p2pChats=await p2pChat.findByIdAndDelete(id)
            return res.json(p2pChats)
        }catch(e){
            res.status(500).json(e)
        }
    }

}

export default new p2pChatController();
