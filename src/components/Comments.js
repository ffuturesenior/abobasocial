import React, { useEffect, useState } from "react";
import { getComments, leaveCommentReq } from "../servFunctions/CommentFunctions";
import CommentComponent from "./CommentComponent";


const CommentsComponent=({postId,userId,toggleCB})=>{
    const [comments,setComments]=useState([])
    const [commentsLoading,setCommentLoading]=useState(true)
    const [commentText,setCommentText]=useState('')
    const [newCommentData,setNewCommentData]=useState({})
    const [,update]=useState({})
    const forceUpdate = React.useCallback(() => update({}), []);
    const [lastSpecialId,setLastSpecialId]=useState('')
    useEffect(()=>{
        setCommentLoading(true)
        getComments(postId,setComments).then(setCommentLoading(false))
    },[])

    const leaveComment=()=>{
        if(commentText.length>=1){
            leaveCommentReq(commentText,postId,setLastSpecialId)
            setNewCommentData({
                text:commentText,
                postId:postId,
                userId:userId,
                specialId:lastSpecialId
            })
            setCommentText('')
        }
    }

    useEffect(()=>{
      //  toggleCB(false)
       // toggleCB(true)
        
        setComments(prev=>[...prev,newCommentData])
        //setTimeout(()=>{ toggleCB(true)},[500])
       
    },[newCommentData])


    const deleteCB=(id)=>{
        setComments(comments.filter((p)=>{
            if(p._id!=id) return p
        }))
        setCommentLoading(true)
        getComments(postId,setComments).then(setCommentLoading(false))
    }


    return(
        <div>
            {commentsLoading?
                <>
                    loading
                </>
            :
                <>
                {comments.length==0?<>no comments yet</>:<></>}
                <div style={{margin:"0px auto",maxWidth:"304px",height:"15%"}}>
                    <div style={{maxHeight:"100px",overflow:"auto"}}>
                        {comments.map((p)=>
                            <div key={`${p.specialId}${p._id?p._id:p.specialId}`}>
                                <CommentComponent deleteCB={deleteCB} p={p}/>
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
        </div>
    )
}

export default CommentsComponent