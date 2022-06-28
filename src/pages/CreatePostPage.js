import React, { useState } from "react";
import { createPostReq } from "../servFunctions/postFunctions";


const CreatePostPage=()=>{
    const formData=new FormData()
    const [inputPostField,setInputPostField]=useState({
        caption:""  
    })

    const fileHandler=(e)=>{
        const file=e.target.files[0]
        formData.append('file',file)
    }

    const submitForm=(e)=>{
        e.preventDefault()
        formData.append('caption',inputPostField.caption)
        formData.append('userId',localStorage.getItem('userID'))
        formData.append('date',Date.now())
        createPostReq(formData).then(()=>{
            formData.delete('caption')
            formData.delete('userId')
            formData.delete('date')
        })
    }

    return(
        <>
            <h1>create post</h1>
            <form>
                <textarea style={{border:"1px solid black",resize:"none"}} placeholder={`enter caption`} value={inputPostField.caption} onChange={(e)=>setInputPostField({...inputPostField,caption:e.target.value,})}/><br/>
                <input type={"file"} placeholder='choose image' onChange={fileHandler}/><br/>                
                <button style={{padding:"5px",borderRadius:"5px",border:"1px solid black"}} onClick={submitForm}>create</button>
            </form>
        </>
    )
}


export default CreatePostPage


/* 
    userId:{type:String,required:true},
    caption:{type:String,required:true},
    file:{type:String,required:true},
    date:{type:String,req:true}
*/