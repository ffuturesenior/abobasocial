import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import CommentsComponent from "../components/Comments";
import { deleteCommentReq } from "../servFunctions/CommentFunctions";
import { getFileReq } from "../servFunctions/FileFunctions";
import { getUser } from "../servFunctions/functions";
import { checkLikeReq, deleteLikeReq, getLikes, likePostReq } from "../servFunctions/likesFuncions";
import { deletePostReq, getPostReq } from "../servFunctions/postFunctions";


const PostPage=()=>{
    const {id,userId,specialId}=useParams()
    const [post,setPost]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    const [isErr,setIsErr]=useState(false)
    const [userData,setUserData]=useState({})
    const [useless,setUseless]=useState()
    const [likes,setLikes]=useState([])
    const [isLiked,setIsLiked]=useState(false)
    const [likeId,setLikeId]=useState('')
    const [commentToggle,setCommentToggle]=useState(false)
    const router=useHistory()
    const isOwnPost=localStorage.getItem('userID')==userId
    const [isImgLoading,setIsImgLoading]=useState(true)
    const [base64String,setString]=useState()

    useEffect(()=>{
        setIsLoading(true)
        getUser(userId,setUserData,setIsErr,setUseless,setIsLoading)
        getPostReq(id,setPost,setIsErr,setIsLoading)
        getFileReq(specialId,setString,setIsImgLoading)
        getLikes(id,setLikes,setIsLoading,setIsErr)
        checkLikeReq(id,localStorage.getItem('userID'),setIsLiked,setLikeId)
        //setIsErr(false)
    },[])

  
    
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


    const deleteComment=()=>{
        deleteCommentReq(id)
    }

    const deletePost=()=>{
        deletePostReq(id).then(router.push(`/`))
    }


    return(
        <>  
            <div>
                {isOwnPost?
                <>
                    <button type="button" onClick={deletePost} class="btn btn-danger">delete post</button>

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
                            <div style={{border:"2px solid black",display:"inline-block",position:"absolute"}}>
                                <div style={{display:"flex",justifyContent:'space-between',alignItems:"center",padding:"0px 5px"}}>
                                    <div onClick={()=>router.push(`/userprofile/${userId}`)} style={{display:"flex",alignItems:"center",padding:"7px 0px",cursor:'pointer'}}>
                                        <Avatar width={40} height={40} avatar={userData.avatar}/><p>{userData.username}</p>
                                    </div>
                                    <div onClick={()=>router.goBack()}>back</div>
                                </div>
                                <div style={{padding:"0px 0px",width:"300px",height:"200px"}}>
                                    {isImgLoading?
                                        <> 
                                            404 
                                        </>
                                        :
                                        <>
                                           <img style={{objectFit:'fill',height:"100%",width:"100%"}}  src={`${base64String.data}`} width="300"/>
                                        </>
                                    }
                                </div>
                               
                                {commentToggle?
                                    <>
                                    <div>
                                        <u onClick={()=>setCommentToggle(!commentToggle)} >{commentToggle?'close comments':'open comments'}</u>
                                        <CommentsComponent postId={id}  userId={userId} toggleCB={setCommentToggle}/>                
                                    </div>
                                    </>
                                :
                                    <>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"2px 5px"}}><p>{likes.length}</p><p onClick={like} style={{cursor:'pointer',padding:'5px',border:"1px solid black",borderRadius:"5px"}}>{isLiked?<>remove like</>:<>like</>}</p></div>
                                        <p style={{padding:"1px 0px"}}>{post.caption}</p>
                                        <u onClick={()=>setCommentToggle(!commentToggle)} >{commentToggle?'close comments':'open comments'}</u>
                                    </>
                                }                                
                                
                            </div>
                        }
                    </>}
            </div>
        </>
    )
}

export default PostPage