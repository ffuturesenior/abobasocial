import React,{useEffect,useState} from "react";
import { createFileReq, deleteFileReq } from "../servFunctions/FileFunctions";
import { getUser, getUserAvatar, redactUserAvatar, redactUserCaption, redactUsername1 } from "../servFunctions/functions";


const RedactProfilePage=()=>{

    const [userData,setUserData]=useState({
        username:"",
        caption:"",
        avatar:""
    })
    const [redactData,setRedactData]=useState({
        username:`${userData.username}`,
        caption:`${userData.caption}`,
        avatar:``
    })
    const [activeFile,setActiveFile]=useState('')
    const [isErr,setIsErr]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{  
        getUser(localStorage.getItem('userID'),setUserData,setIsErr,setRedactData,setIsLoading)
    },[])

    const formData=new FormData()


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

 

    const redactCaption=()=>{
        if(redactData.caption.length>1){
            redactUserCaption(localStorage.getItem('userID'),redactData.caption)
        }
    }

    const redactAvatar=()=>{
        const sp=Date.now()*Math.random()
        deleteFileReq(userData.avatar)
        redactUserAvatar(localStorage.getItem('userID'),sp)
        createFileReq(sp,activeFile)
    }

    return(
        <div>
            {isErr?
                <>err</>
            :
                <>
                    {/*<input style={{border:"1px solid black"}} value={redactData.username} onChange={(e)=>{setRedactData({...redactData,username:e.target.value})}}/><button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={redactUsername}>change name</button><br/>*/}
                    <p>Caption now: {redactData.caption}</p>
                    <input style={{border:"1px solid black"}} value={redactData.caption} onChange={(e)=>{setRedactData({...redactData,caption:e.target.value})}}/><button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={redactCaption}>change caption</button><br/>
                    <input style={{border:"1px solid black"}} type="file"  onChange={fileHandler}/>
                    {activeFile!=''?
                        <div style={{position:"relative",left:"0px",overflow:"hidden",border:"1px solid black",width:`${60}px`,height:`${60}px`}}>
                            <img style={{position:"absolute",left:"0px",height:"100%",width:"100%",objectFit:"cover"}}  src={activeFile}/>
                        </div>
                    :
                        <></>
                    }
                    <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={redactAvatar}> put</button>           
                </>
            }
        </div>
    )
}

export default RedactProfilePage