import mongoose from "mongoose";

const File=new mongoose.Schema({
    data:{type:String,required:true},
    specialId:{type:Number,required:true},
})


export default mongoose.model('File',File)
