import mongoose from "mongoose";


const p2pChat=new mongoose.Schema({
    name:{type:String,required:true},
    spId:{type:String,required:true}
})


export default mongoose.model('p2pChat',p2pChat)
