import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteMessage, getMessageByChatID, getMessageByID, redactMessage } from "../servFunctions/messageFunctions";
import { getUser } from "../servFunctions/functions";
import { getParcipiantByUserIdAndChatId } from "../servFunctions/parcipiantFunctions";
import Avatar from "./Avatar";



const Message=({setMessages,messages=[],role,i1,rldPage,isOwnMsg,props,redactCB,deleteCB})=>{
    const [user,setUser]=useState({})
    const [messageData,setMessageData]=useState()
    const [isErr,setIsErr]=useState(true)
    const [isLoading,setIsLoading]=useState(true)
    const [redactToggle,setRedactToggle]=useState(false)
    const [text,setText]=useState('')
    const [flexDirection,setFlexDirection]=useState('')
    const [parcipiantData,setParcipiantData]=useState(role?role:{})
    const [,useless]=useState()
    const formData=new FormData()
    const router=useHistory()
    useEffect(()=>{
        setIsLoading(true)
       // getMessageByID(props._id,setMessageData,setIsErr)
        getUser(props.userId,setUser,setIsErr,useless)
        //getParcipiantByUserIdAndChatId(props.userId,props.chatId,setParcipiantData,setIsErr)
        if(!role){
            getParcipiantByUserIdAndChatId(props.userId,props.chatId,setParcipiantData,setIsErr)
        }
       // getParcipiantByUserIdAndChatId(props.userId,props.chatId,setParcipiantData,setIsErr)
        if(localStorage.getItem('userID')==props.userId){
            setFlexDirection('row')
        }else(
            setFlexDirection('row-reverse')
        )
        setTimeout(()=>{
            setIsLoading(false)
        },500)
        setText(props.text)
    },[])

 
   


    const redactMenu=()=>{
        if(isOwnMsg){
            setRedactToggle(redactToggle?false:true)
        }
    }

    const redact=(e)=>{
        e.stopPropagation()
        redactMessage(text,props._id).then(getMessageByID(props._id,setMessageData,setIsErr)).then( redactCB(props._id,text))
    }


    const removeMsg=()=>{  
        deleteMessage(props._id).then(deleteCB(props._id))
    }

    return(
        <div>
            {isLoading?
                <>
                    <div onClick={redactMenu} style={{display:'inline-block',justifyContent:"space-between",padding:"5px",borderRadius:"5px",margin:"5px",maxWidth:"30%"}}>
                        <div>
                            <div onClick={()=>router.push(`/userprofile/${messageData.userId}`)} style={{cursor:'pointer'}}> 
                                {/*user.username*/}
                            </div>
                            <div style={{background:"#add8e6",padding:"5px",borderRadius:"5px"}}>
                                {props.text}
                                {redactToggle?
                                    <div>
                                       {/*<input value={text} onChange={(e)=>setText(e.target.value)}/>*/}
                                        {/*<button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={redact}>redact</button>*/}
                                        <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={removeMsg}>delete</button>
                                    </div>       
                                :
                                    <div></div>
                                }
                                
                                </div>
                        </div>
                    </div>
                </>
            :
                <>
                    {isErr?
                        <div onClick={redactMenu} style={{display:'inline-block',justifyContent:"space-between",padding:"5px",borderRadius:"5px",margin:"5px",maxWidth:"30%"}}>
                            <div>
                                <div onClick={()=>router.push(`/userprofile/${messageData.userId}`)} style={{cursor:'pointer'}}> 
                                    {/*user.username*/}
                                </div>
                                <div style={{background:"#add8e6",padding:"5px",borderRadius:"5px"}}>
                                    {redactToggle?
                                        <div>
                                            {/*<input value={text} onChange={(e)=>setText(e.target.value)}/>*/}
                                           {/*<button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={redact}>redact</button>*/}
                                            <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={removeMsg}>delete</button>
                                        </div>       
                                    :
                                        <div></div>
                                    }
                                
                                    </div>
                            </div>
                        </div>
                        
                    :
                        
                            
                    <div onDoubleClick={redactMenu} style={{display:'inline-block',justifyContent:"space-between",padding:"5px",borderRadius:"5px",margin:"5px",maxWidth:"100%"}}>
                        <div style={{display:'flex',flexDirection:`${flexDirection}`,alignItems:"top",justifyContent:"space-between"}}>
                            <div>
                                <div onClick={()=>router.push(`/userprofile/${props.userId}`)} style={{cursor:'pointer'}}> 
                                    {user.username}
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
                                                {/*<input value={text} onChange={(e)=>setText(e.target.value)}/>*/}
                                                {/*<button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={redact}>redact</button>*/}
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
                                    <div style={{position:"relative",overflow:"hidden",border:"1px solid black",borderRadius:"45px",width:`${30}px`,height:`${30}px`}}><img style={{position:"absolute",left:"0px",height:"100%",overflow:"hidden",width:"100%",objectFit:"cover"}} src={`https://abobasocial-server-dbsync.herokuapp.com/${user.avatar}`}/></div>
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