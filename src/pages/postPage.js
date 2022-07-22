import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import CommentsComponent from "../components/Comments";
import { deleteCommentReq } from "../servFunctions/CommentFunctions";
import { getUser } from "../servFunctions/functions";
import { checkLikeReq, deleteLikeReq, getLikes, likePostReq } from "../servFunctions/likesFuncions";
import { deletePostReq, getPostReq } from "../servFunctions/postFunctions";


const PostPage=()=>{
    const {id,userId}=useParams()
    const [post,setPost]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    const [isErr,setIsErr]=useState(true)
    const [userData,setUserData]=useState({})
    const [useless,setUseless]=useState()
    const [likes,setLikes]=useState([])
    const [isLiked,setIsLiked]=useState(false)
    const [likeId,setLikeId]=useState('')
    const [commentToggle,setCommentToggle]=useState(false)
    const router=useHistory()
    const isOwnPost=localStorage.getItem('userID')==userId
    const [isImgLoaded,setIsImgLoaded]=useState(true)
    const [base64String,setBase64String]=useState('')
    const [binarData,setBinarData]=useState([])
    useEffect(()=>{
        setIsLoading(true)
        getLikes(id,setLikes,setIsLoading)
        setIsErr(true)
        getPostReq(id,setPost,setIsErr,setBase64String)
        checkLikeReq(id,localStorage.getItem('userID'),setIsLiked,setLikeId)
        getUser(userId,setUserData,setIsErr,setUseless).then(
            setIsLoading(false),setIsErr(false),
            //setIsErr(false)
        )
        
    },[])

    useEffect(()=>{
        if(post.file){
          setBase64String(btoa(String.fromCharCode(...new Uint8Array(post.file.data.data))))  
        }
    },[post])
        
    
    const like=()=>{
        if(!isLiked){
            setLikes([...likes,{postId:id,userId:localStorage.getItem('userID')}])
            likePostReq(id,localStorage.getItem('userID'),setLikeId).then(()=>setIsLiked(true))
        }else{
            //console.log(likeId)
            deleteLikeReq(id,localStorage.getItem('userID')).then(()=>setLikes(likes.filter((p)=>{
                if(p.postId!=id&&p.userId!=localStorage.getItem('userID')){
                    return p;
                }
            })),
            setIsLiked(false)
            )
        }
    }

    const commentsBarReducer=()=>{
        commentToggle?setCommentToggle(false):setCommentToggle(true)
    }

    const deleteComment=()=>{
        deleteCommentReq(id).then(router.goBack())
    }

    const deletePost=()=>{
        deletePostReq(id).then(router.push(`/`))
    }


    return(
        <>  
            <div>
                {isOwnPost?
                <>
                    <button style={{padding:"5px",border:"1px solid black",borderRadius:"5px"}} onClick={deletePost}>delete post</button>
                </>
                :
                    <></>
                }
            </div>
            
            <div style={{display:"flex",justifyContent:'center'}}>
                {isLoading?
                    <>loading</>
                :
                    <>
                        {isErr?
                            <>err</>
                        :
                            <div style={{border:"2px solid black",display:"inline-block",position:"absolute",top:"100%"}}>
                                <div style={{display:"flex",justifyContent:'space-between',alignItems:"center",padding:"0px 5px"}}>
                                    <div onClick={()=>router.push(`/userprofile/${userId}`)} style={{display:"flex",alignItems:"center",padding:"7px 0px",cursor:'pointer'}}>
                                        <Avatar width={40} height={40} avatar={userData.avatar}/><p>{userData.username}</p>
                                    </div>
                                    <div onClick={()=>router.goBack()}>back</div>
                                </div>
                                
                                <div style={{padding:"0px 0px",width:"300px",height:"200px"}}>
                                    {isImgLoaded?
                                        <> 
                                            <img style={{objectFit:'cover',height:"100%",width:"100%"}}  src={`data:image/png;base64,${base64String}`} width="300"/>
                                        </>
                                        :
                                        <>
                                            404
                                        </>
                                    }
                                </div>
                                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"2px 5px"}}><p>{likes.length}</p><p onClick={like} style={{cursor:'pointer',padding:'5px',border:"1px solid black",borderRadius:"5px"}}>{isLiked?<>remove like</>:<>like</>}</p></div>
                                <p style={{padding:"0px 5px 2px"}}>{post.caption}</p>
                                <div>
                                    <button style={{border:"1px solid black",padding:'5px',borderRadius:"5px"}} onClick={commentsBarReducer}>{commentToggle?<p>close comments</p>:<>check comments</>}</button>
                                    {commentToggle?
                                        <>
                                            <CommentsComponent postId={id}  userId={userId} toggleCB={setCommentToggle}/>
                                        </>
                                    :
                                        <></>     
                                    }
                                    
                                </div>
                            </div>
                        }
                    </>}
            </div>
        </>
    )
}

export default PostPage