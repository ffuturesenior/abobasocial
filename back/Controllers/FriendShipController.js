import FriendShip from '../objects/FriendShip.js'


class FriendShipController{

    async create(req,res){
        try{
            const {from,to}=req.body
            const check=await FriendShip.findOne({from:from,to:to})
            if(!check){
                const friendShip=await FriendShip.create(req.body)
                return res.status(200).json(friendShip)
            }else{
                return res.status(400).json('already subscribed')
            }
           
        }catch(e){
            console.log(e)
        }
    }

    async  getAll(req,res){
        try{
            const friendShip=await FriendShip.find()
            return res.status(200).json(friendShip)
        }catch(e){
            console.log(e)
        }
    }

    async  getSubscribers(req,res){
        try{
            const {id}=req.params
            const friendShip=await FriendShip.find({to:id})
            return res.status(200).json(friendShip)
        }catch(e){
            console.log(e)
        }
    }
    async  getSubscribes(req,res){
        try{
            const {id}=req.params
            const friendShip=await FriendShip.find({from:id})
            return res.status(200).json(friendShip)
        }catch(e){
            console.log(e)
        }
    }
    async  check(req,res){
        try{
            const {id,otherUserId}=req.params
            
            if(!id && !otherUserId){
              return res.status(400).json({message:"invalid id"})
            }
            const friendShip=await FriendShip.findOne({from:id,to:otherUserId})
            return res.status(200).json(friendShip)
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
            const friendShip=await FriendShip.findById(id)
            return res.status(200).json(friendShip)
        }catch(e){
            console.log(e)
        }
    }
    async  update(req,res){
        try{
            const {id}=req.params
            const friendShip=req.body
            //console.log(req.files.avatar)
            //const fileName=FileService.saveFile(req.files.avatar)
            if(!id){
               return res.status(400).json({message:"id undef"})
            }
            const updatedFriendShip=await FriendShip.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json(updatedFriendShip)                /* {...user,avatar:fileName}*/
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
            const friendShip=await FriendShip.findByIdAndDelete(id)
            return res.json(friendShip)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new FriendShipController();
