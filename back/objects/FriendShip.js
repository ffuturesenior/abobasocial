import mongoose from "mongoose";

const FriendShip=new mongoose.Schema({
    from:{type:String,required:true,unique:false},
    to:{type:String,required:true,unique:false},
})


export default mongoose.model('FriendShip',FriendShip)
