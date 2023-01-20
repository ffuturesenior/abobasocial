import React,{useEffect,useState} from "react";
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
    const [isErr,setIsErr]=useState(true)
    const [isLoading,setIsLoading]=useState()
    useEffect(()=>{  
        getUser(localStorage.getItem('userID'),setUserData,setIsErr,setRedactData,setIsLoading)
    },[])

    const formData=new FormData()

    const fileHandler=(e)=>{
        const avatar=e.target.files[0]
        formData.append('avatar',avatar)
    }


    const redactUsername=()=>{
        // formData.append("username",redactData.username)
         //formData.append('caption',redactData.caption)
         //console.log(redactData.avatar)
         if(redactData.username.length>=4){
             redactUsername1(localStorage.getItem('userID'),redactData.username)
             //formData.delete('caption')
             //formData.delete('avatar')
         }else{
             alert('short nickname')
         }
         
     }
 

    const redactCaption=()=>{
        if(redactData.caption.length>1){
            redactUserCaption(localStorage.getItem('userID'),redactData.caption)
        }
    }

    const redactAvatar=()=>{
        redactUserAvatar(localStorage.getItem('userID'),formData)
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
                    <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={redactAvatar}> put</button>           
                </>
            }
        </div>
    )
}

export default RedactProfilePage