import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../servFunctions/functions";
import { chageParcipiantRoleReq, deleteParcipiantReq,getParcipiantByUserIdAndChatId } from "../servFunctions/parcipiantFunctions";
import Avatar from "./Avatar";
import {io} from 'socket.io-client'

const ParcipiantComponent=({data,userIsOwner,userIsAdmin,deleteCB})=>{
    const socket=io('https://abobasocial-socket-sync.herokuapp.com')
    const [isErr,setIsErr]=useState(true)
    const [userData,setUserData]=useState()
    const [myData,setMyData]=useState([])
    const [,useless]=useState()
    const [isOwner,setIsOwner]=useState(data.isOwner)
    const [isAdmin,setIsAdmin]=useState(data.isAdmin)
    const [display,setDisplay]=useState(false)
    const router=useHistory()
    useEffect(()=>{
       // getParcipiantByUserIdAndChatId(localStorage.getItem('userID'),data.chatId,setMyData)  
        getUser(data.userId,setUserData,setIsErr,useless)
        getParcipiantByUserIdAndChatId(localStorage.getItem('userID'),data.chatId,setMyData) 
        //console.log(myData)
        setDisplay(true)
    },[])

    const kick=()=>{
        socket.emit('delelteParcipiant',data.userId,data.chatId)
        deleteParcipiantReq(data._id).then(setDisplay(false))
        deleteCB(data._id)
    }
    
    const promote=()=>{   
        socket.emit('promoteUser',data.userId,data.chatId)
        chageParcipiantRoleReq(data._id,true).then(setIsAdmin(true))
    }

    const disbaleAdmin=()=>{
         socket.emit('disableAdminUser',data.userId,data.chatId)
        chageParcipiantRoleReq(data._id,false).then(setIsAdmin(false))
    }


    return(
        <div style={{display:`${display}`}}>
            {isErr?
                <>err</>
            :
                <div> 
                   <div  style={{display:"flex",justifyContent:"space-between",alignItems:'center',borderBottom:"1px solid gray",padding:"5px"}}>
                        <div onClick={()=>router.push(`/userprofile/${data.userId}`)}style={{display:"flex",alignItems:"center"}}>
                            <div style={{position:"relative",width:"40px",height:"40px",borderRadius:"45px",overflow:"hidden"}}>
                                <Avatar width={40} height={40} avatar={userData.avatar}/>
                            </div>
                            <div style={{fontSize:"20px"}}>{userData.username}</div>                        
                        </div>
                        <div>
                            {isOwner?
                                <p>
                                    owner
                                </p>
                            :
                                <p>{isAdmin?<p>admin</p>:<>parcipiant</>}</p>
                            }
                            {data.userId==localStorage.getItem('userID')?<>me</>:
                                <div>
                                    {isOwner?
                                    <div>
                                        
                                    </div>
                                        :
                                    <div>
                                        {isAdmin?
                                            <div>
                                                
                                                {userIsOwner?
                                                    <div>
                                                        <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={kick}>kick</button><br/>
                                                        <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={disbaleAdmin}>disable admin</button>
                                                    </div>
                                                :
                                                    <></>
                                                }
                                            </div>
                                        :
                                            <div>
                                                <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={kick}>kick</button><br/>
                                                <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={promote}>promote</button>
                                            </div>
                                        }
                                    </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>                    
                </div>
            }
        </div>
    )
}

export default ParcipiantComponent