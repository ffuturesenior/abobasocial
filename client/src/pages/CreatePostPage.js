import React, { useState } from "react";
import { Router, useHistory } from "react-router-dom";
import { createFileReq } from "../servFunctions/FileFunctions";
import { createPostReq } from "../servFunctions/postFunctions";


const CreatePostPage=()=>{
    const formData=new FormData()
    const [activeFile,setActiveFile]=useState('')
    const [inputPostField,setInputPostField]=useState({
        caption:""  
    })
    const router=useHistory()

    const fileHandler=(e)=>{
        const file=e.target.files[0]
        formData.append('file',file)
       //console.log(formData.get('file'))
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setActiveFile(reader.result)
        };
    }

   
    const captionHandler=(e)=>{
        setInputPostField({...inputPostField,caption:e.target.value})
    }

    const submitForm=(e)=>{
        e.preventDefault()
        const sp =Date.now()*Math.random()
        createPostReq(inputPostField.caption,sp,activeFile)
        //getBase64(formData.get('file'),sp)  
    }

    return(
        <>
            <h1>create post</h1>
            <form>
                <textarea style={{border:"1px solid black",resize:"none"}} placeholder={`enter caption`} value={inputPostField.caption} onChange={(e)=>setInputPostField({...inputPostField,caption:e.target.value})}/><br/>
                <input type={"file"} placeholder='choose image' onChange={(e)=>fileHandler(e)}/><br/>
                {activeFile!=''?
                    <div style={{position:"relative",left:"0px",overflow:"hidden",border:"1px solid black",width:`${60}px`,height:`${60}px`}}>
                        <img style={{position:"absolute",left:"0px",height:"100%",width:"100%",objectFit:"cover"}}  src={activeFile}/>
                    </div>
                :
                    <></>
                }
                                
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