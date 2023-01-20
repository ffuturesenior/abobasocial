import mongoose from "mongoose";

const Chat=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
})


export default mongoose.model('Chat',Chat)
