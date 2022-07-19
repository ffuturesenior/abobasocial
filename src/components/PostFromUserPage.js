import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getUser } from "../servFunctions/functions";
import { checkLikeReq, deleteLikeReq, getLikes, likePostReq } from "../servFunctions/likesFuncions";
import Avatar from "./Avatar";



const PostFromUserPage=({p})=>{
    
    const [isLoading,setIsLoading]=useState(true)
    const [isErr,setIsErr]=useState(true)
    const [userData,setUserData]=useState({})
    const [useless,setUseless]=useState()
    const [likes,setLikes]=useState([])
    const [isLiked,setIsLiked]=useState(false)
    const [likeId,setLikeId]=useState('')
    const router=useHistory()
    const [isImgLoaded,setIsImgLoaded]=useState(false)
    const [file,setFile]=useState(p.file.data)
    useEffect(()=>{
        setIsLoading(true)
        if(file){
            setIsImgLoaded(true)
        }
        getLikes(p._id,setLikes,setIsLoading)
        setIsErr(true)
        checkLikeReq(p._id,localStorage.getItem('userID'),setIsLiked,setLikeId)
        getUser(p.userId,setUserData,setIsErr,setUseless).then(
            setIsLoading(false),setIsErr(false)
            //setIsErr(false)
        )
    },[])

    const like=()=>{
        if(!isLiked){
            setLikes([...likes,{postId:p._id,userId:localStorage.getItem('userID')}])
            likePostReq(p._id,localStorage.getItem('userID'),setLikeId).then(()=>setIsLiked(true))
        }else{
            console.log(likeId)
            deleteLikeReq(p._id,localStorage.getItem('userID')).then(()=>setLikes(likes.filter((p)=>{
                if(p.postId!=p._id&&p.userId!=localStorage.getItem('userID')){
                    return p;
                }
            })),
            setIsLiked(false)
            )
        }
    }
    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(p.file.data.data))
    );
    return(
        <div >
            {isLoading?
                <>loading</>
            :
                <>
                    {isErr?
                        <>err</>
                    :
                        <div style={{border:"2px solid black",display:"inline-block"}}>
                            <div style={{display:"flex",justifyContent:'space-between',alignItems:"center"}}>
                                <div onClick={()=>router.push(`/userprofile/${p.userId}`)} style={{display:"flex",alignItems:"center",padding:"7px 5px",borderBottom:"1px solid black",cursor:'pointer'}}>
                                    <Avatar height={30} width={30} avatar={userData.avatar}/><p>{userData.username}</p>
                                </div>
                                <Link  to={`/post/${p._id}&${p.userId}`}>details...</Link>
                            </div>
                            
                            {isImgLoaded?
                                    <> 
                                        <img style={{objectFit:'cover',height:"100%",width:"100%"}}  src={`data:image/png;base64,${base64String}`} width="300"/>
                                    </>
                                    :
                                    <>
                                        404
                                    </>
                                }
                            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"2px 5px"}}><p>{likes.length}</p><p onClick={like} style={{cursor:'pointer',padding:'7px',border:"1px solid black",borderRadius:"10px"}}>{isLiked?<>remove like</>:<>like</>}</p></div>
                            <p style={{padding:"0px 5px 2px"}}>{p.caption}</p>
                        </div>
                    }
                </>}
        </div>
    )

}

export default PostFromUserPage