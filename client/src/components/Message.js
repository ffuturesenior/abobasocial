import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteMessage, getMessageByChatID, getMessageByID, redactMessage } from "../servFunctions/messageFunctions";
import { getUser } from "../servFunctions/functions";
import { getParcipiantByUserIdAndChatId } from "../servFunctions/parcipiantFunctions";
import Avatar from "./Avatar";



const Message=({setMessages,messages=[],role,rldPage,isOwnMsg,props,deleteCB})=>{
    const [user,setUser]=useState({})
    const [messageData,setMessageData]=useState()
    const [isErr,setIsErr]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [redactToggle,setRedactToggle]=useState(false)
    const [text,setText]=useState('')
    const [flexDirection,setFlexDirection]=useState('')
    const [parcipiantData,setParcipiantData]=useState()
    const [,useless]=useState()
    const formData=new FormData()
    const router=useHistory()
    useEffect(()=>{
        setIsLoading(true)
        getUser(props.userId,setUser,setIsErr,useless,setIsLoading)
        getParcipiantByUserIdAndChatId(props.userId,props.chatId,setParcipiantData,setIsErr,setIsLoading)
        if(localStorage.getItem('userID')==props.userId){
            setFlexDirection('row')
        }else(
            setFlexDirection('row-reverse')
        )
        setText(props.text)
    },[])

 
   



    const removeMsg=()=>{  
        deleteMessage(props.specialId).then(deleteCB(props.specialId))
    }

    return(
        <div onDoubleClick={()=>setRedactToggle(!redactToggle)}>
            {isLoading?
                <>
                    
                </>
            :
                <>
                    {isErr?
                        <>err</>
                        
                    :
                        
                            
                    <div  style={{display:'inline-block',justifyContent:"space-between",padding:"5px",borderRadius:"5px",margin:"5px",maxWidth:"100%"}}>
                        <div style={{display:'flex',flexDirection:`${flexDirection}`,alignItems:"top",justifyContent:"space-between"}}>
                            <div>
                                <div onClick={()=>router.push(`/userprofile/${props.userId}`)} style={{cursor:'pointer'}}> 
                                    {user.username?user.username:''}
                                </div>
                                <div style={{display:"inline-block",background:"#add8e6",padding:"5px",borderRadius:"5px"}}>
                                {parcipiantData?
                                    <> {parcipiantData.isOwner?<p style={{color:"red"}}>owner</p>:<>{parcipiantData.isAdmin?<p style={{color:"brown"}}>admin</p>:<p></p>}</>}</>
                                :
                                    <></>
                                }
                               
                                    <div>
                                        <div style={{maxWidth:"150px",wordWrap:"break-word"}}>
                                            {props.text}
                                        </div>
                                        {redactToggle?
                                            <div>
                                                <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={removeMsg}>delete</button>
                                            </div>       
                                        :
                                            <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div onClick={()=>router.push(`/userprofile/${props.userId}`)}>
                                {user.avatar!=" "?
                                    <Avatar height={30} width={30} avatar={user.avatar}/>
                                :
                                    <div style={{border:"1px solid black",borderRadius:"45px",overflow:"hidden",width:`${30}px`,height:`${30}px`,background:"black"}}></div>
                                }
                            </div>
                        </div>
                    </div>
                    }
                </>
            }
                        
        </div>
    )
}

export default Message