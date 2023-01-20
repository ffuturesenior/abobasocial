import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getFileReq } from "../servFunctions/FileFunctions";
import { getUser } from "../servFunctions/functions";
import { checkLikeReq, deleteLikeReq, getLikes, likePostReq } from "../servFunctions/likesFuncions";
import Avatar from "./Avatar";
import { byteparser } from "./byteParser";



const Post=({p})=>{


    const router=useHistory()

    const [isLoading,setIsLoading]=useState(true)
    const [base64String,setString]=useState()

    useEffect(()=>{
        getFileReq(p.specialId,setString,setIsLoading)
    },[])

    return(
        <div className='UserPostBlock'>  
        {isLoading?
            <></>
        :
            <img onClick={()=>router.push(`/post/${p._id}&${p.userId}&${p.specialId}`)}  className='userImage' src={base64String.data} width="300px"/>
        }                
        </div>
    )

}

export default Post