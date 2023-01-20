import mongoose from "mongoose";

const Post=new mongoose.Schema({
    userId:{type:String,required:true},
    caption:{type:String,required:true},
    specialId:{type:Number,required:true},
    date:{type:String,required:true}
})


export default mongoose.model('Post',Post)
