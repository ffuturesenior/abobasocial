import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteCommentReq } from "../servFunctions/CommentFunctions";
import { getUser } from "../servFunctions/functions";
import Avatar from "./Avatar";


const CommentComponent=({p,deleteCB})=>{

    const [userData,setUserData]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    const [uselessVar,setUselessVar]=useState()
    const [,update]=useState()
    const forceUpdate = React.useCallback(() => update({}), []);
    const router=useHistory()
    const isOwnComment=localStorage.getItem('userID')==p.userId
    useState(()=>{
        getUser(p.userId,setUserData,setIsLoading,setUselessVar)
    },[])

    const deleteComment=()=>{
        //window.location.reload()
        deleteCommentReq(p._id).then(deleteCB(p._id))
    }

    return(
        <div>
            {isLoading?
                <></>
                :
                <div>
                    <div style={{display:"flex",justifyContent:'space-between',alignItems:"center"}}>
                        <div onClick={()=>router.push(`/userprofile/${p.userId}`)} style={{display:"flex",alignItems:"center",padding:"7px 5px",cursor:'pointer'}}>
                            <Avatar height={30} width={30} avatar={userData.avatar}/><p>{userData.username}</p>
                        </div>
                    </div>
                    <p style={{borderBottom:"1px solid black"}}>{p.text}</p>
                    {isOwnComment?
                        <>
                        <button style={{padding:"4px",border:"1px solid black",borderRadius:"10px"}} onClick={deleteComment}>
                            delete comment
                        </button>
                        </>
                    :
                        <></>
                    }
                    
                </div>
            }
            
        </div>
        
    )
}

export default CommentComponent