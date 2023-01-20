import mongoose from "mongoose";


const User=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    pswd:{type:String,required:true},
    caption:{type:String,required:false},
    avatar:{data:String,required:false},
})


export default mongoose.model('User',User)


