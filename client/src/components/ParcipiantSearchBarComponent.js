import React, { useEffect, useState } from "react";
import { getUser } from "../servFunctions/functions";
import { useHistory } from "react-router-dom";
import { deleteParcipiantReq,chageParcipiantRoleReq } from "../servFunctions/parcipiantFunctions";
import Avatar from "./Avatar";
import {io} from 'socket.io-client'


const ParcipiantSearchBarComponent=({data,id,userIsOwner,userIsAdmin,deleteCB})=>{
    const socket=io('http://localhost:5050')
    const router=useHistory()
    
   
    const [,useless]=useState()
  
    const [isOwner,setIsOwner]=useState(data.isOwner)
    const [isAdmin,setIsAdmin]=useState(data.isAdmin)
    const [display,setDisplay]=useState(false)
   

    const kick=()=>{
        socket.emit('delelteParcipiant',data.userId,data.chatId)
        deleteParcipiantReq(data._id)
        deleteCB(data._id,data.username)
    }
    
    const promote=()=>{   
        socket.emit('promoteUser',data.userId,data.chatId)
        chageParcipiantRoleReq(data._id,true)
    }

    const disbaleAdmin=()=>{
        socket.emit('disableAdminUser',data.userId,data.chatId)
        chageParcipiantRoleReq(data._id,false)
    }
    return(
        <div>
           
                            <div class="card w-75 mb-3">
                                <div class="card-body">
                                    <div onClick={()=>router.push(`/userprofile/${data.userId}`)}style={{display:"flex",alignItems:"center"}}>
                                        <div style={{position:"relative",width:"40px",height:"40px",borderRadius:"45px",overflow:"hidden"}}>
                                            <Avatar width={40} height={40} avatar={data.avatar}/>
                                        </div>
                                        <div style={{fontSize:"20px"}}>{data.username}</div>                        
                                    </div>
                                    <p class="card-text">
                                        {isOwner?
                                            <p>
                                                owner
                                            </p>
                                        :
                                            <p>{isAdmin?<p>admin</p>:<>parcipiant</>}</p>
                                        }
                                    </p>
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
                                                                        <button type="button" class="btn btn-danger" onClick={kick}>kick</button>
                                                                        <button type="button" class="btn btn-success" onClick={disbaleAdmin}>disable admin</button>
                                                                    </div>
                                                                :
                                                                    <></>
                                                                }
                                                            </div>
                                                        :
                                                            <div>
                                                                {userIsAdmin?
                                                                    <>
                                                                        <button type="button" class="btn btn-danger" onClick={kick}>kick</button>
                                                                        <button type="button" class="btn btn-success" onClick={promote}>promote</button>
                                                                    </>
                                                                :
                                                                    <></>
                                                                }
                                                                
                                                            </div>
                                                        }
                                                    </div>
                                                    }
                                                </div>
                                            }
                                </div>
                            </div>
                        
        </div>
    )
}

export default ParcipiantSearchBarComponent