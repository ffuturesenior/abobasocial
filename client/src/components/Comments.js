import React, { useEffect, useRef, useState } from "react";
import { getComments, leaveCommentReq } from "../servFunctions/CommentFunctions";
import CommentComponent from "./CommentComponent";


const CommentsComponent=({postId,userId,toggleCB})=>{
    const [comments,setComments]=useState([])
    const [commentsLoading,setCommentLoading]=useState(true)
    const [commentText,setCommentText]=useState('')
    const [newCommentData,setNewCommentData]=useState({})
    const ref=useRef()
    const [isErr,setIsErr]=useState(false)
    useEffect(()=>{
        setCommentLoading(true)
        getComments(postId,setComments,setCommentLoading,setIsErr)
    },[])

    const leaveComment=()=>{
        if(commentText.length>=1){
            const sp=Date.now()*Math.random()
            leaveCommentReq(commentText,postId,sp)
            setComments(prev=>[...prev,{
                text:commentText,
                postId:postId,
                userId:localStorage.getItem('userID'),
                specialId:sp
            }])
            ref.current?.scrollIntoView({behavior:"smooth"})
        }
        
    }

    const deleteCB=(id)=>{
        setComments(comments.filter((p)=>{
            if(p.specialId!=id) return p
        }))
    }


    return(
        <div>
            {commentsLoading?
                <>
                    loading
                </>
            :
                <>
                {isErr?
                    <></>
                :
                    <>
                    {comments.length==0?<>no comments yet</>:<></>}
                        <div style={{margin:"0px auto",maxWidth:"304px",height:"20%"}}>
                            <div style={{maxHeight:"100px",overflow:"auto"}}>
                                {comments.map((p)=>
                                    <div ref={ref} key={p.specialId}>
                                        <CommentComponent p={p} deleteCB={deleteCB}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    
                        <div>
                            <input style={{border:"1px solid black",margin:"2px"}} placeholder="enter comment" value={commentText} onChange={(e)=>setCommentText(e.target.value)}/>
                            <button style={{border:"1px solid black",padding:'5px',borderRadius:"5px"}} onClick={leaveComment}>leave comment</button>
                        </div>
                    </>
                }
                
                </>
            }
        </div>
    )
}

export default CommentsComponent