import mongoose from "mongoose";

const Like=new mongoose.Schema({
    userId:{type:String,required:true,unique:false},
    postId:{type:String,required:true,unique:false}
})


export default mongoose.model('Like',Like)
