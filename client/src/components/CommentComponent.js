import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteCommentReq } from "../servFunctions/CommentFunctions";
import { getUser } from "../servFunctions/functions";
import Avatar from "./Avatar";


const CommentComponent=({p,deleteCB})=>{

    const [userData,setUserData]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    const [isErr,setIsErr]=useState(false)
    const [uselessVar,setUselessVar]=useState()
    const [,update]=useState()
    const forceUpdate = React.useCallback(() => update({}), []);
    const router=useHistory()
    const isOwnComment=localStorage.getItem('userID')==p.userId
    useState(()=>{
        getUser(p.userId,setUserData,setIsErr,setUselessVar,setIsLoading)
    },[])

    const deleteComment=()=>{
        //window.location.reload()
        deleteCommentReq(p.specialId).then(deleteCB(p.specialId))
    }

    return(
        <div>
            {isLoading?
                <></>
                :
                    <div class="card w-75 mb-3">
                        <div class="card-body">
                            <div onClick={()=>router.push(`/userprofile/${p.userId}`)} style={{display:"flex",alignItems:"center",padding:"7px 5px",cursor:'pointer'}}>
                                <Avatar height={30} width={30} avatar={userData.avatar}/><p></p>
                            </div>
                            <h5 class="card-title">{userData.username}</h5>
                            <p class="card-text">{p.text}</p>
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
                    </div>
            }
            
        </div>
        
    )
}

export default CommentComponent