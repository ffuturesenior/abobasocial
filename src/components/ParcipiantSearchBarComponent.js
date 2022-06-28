import React, { useEffect, useState } from "react";
import { getUser } from "../servFunctions/functions";
import { useHistory } from "react-router-dom";
import { deleteParcipiantReq,chageParcipiantRoleReq } from "../servFunctions/parcipiantFunctions";
import Avatar from "./Avatar";

const ParcipiantSearchBarComponent=({data,id,userIsOwner,userIsAdmin,deleteCB})=>{

    const router=useHistory()
    const [p,setP]=useState({})
    const [isErr,setIsErr]=useState(true)
    const [,useless]=useState()
    const [isLoading,setIsLoading]=useState(true)
    const [isOwner,setIsOwner]=useState(data.isOwner)
    const [isAdmin,setIsAdmin]=useState(data.isAdmin)
    const [display,setDisplay]=useState(false)
    useEffect(()=>{
        setIsLoading(true)
        setIsErr(true)
        getUser(id,setP,setIsErr,useless).then(setIsLoading(false))
    },[])

    const kick=()=>{
        deleteParcipiantReq(data._id).then(setDisplay(false))
        deleteCB(data._id)
    }
    
    const promote=()=>{
        chageParcipiantRoleReq(data._id,true).then(setIsAdmin(true))
    }

    const disbaleAdmin=()=>{
        chageParcipiantRoleReq(data._id,false).then(setIsAdmin(false))
    }

    return(
        <div>
            {isLoading?
                <>loading</>
            :
                <>
                    {isErr?
                        <>err</>
                    :
                        <>
                            <div style={{display:"flex",justifyContent:'space-between',alignItems:"center",borderBottom:"1px solid grey"}}>
                                <div onClick={()=>router.push(`/userprofile/${id}`)} style={{display:"flex",alignItems:"center",padding:"7px 5px",cursor:'pointer'}}>
                                    <Avatar width={40} height={40} avatar={p.avatar}/><p>{p.username}</p>
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
                        </>
                    }
                </>
            }
        </div>
    )
}

export default ParcipiantSearchBarComponent