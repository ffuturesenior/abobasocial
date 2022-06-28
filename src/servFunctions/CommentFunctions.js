import axios from 'axios'
import { useContext } from 'react'

const site_url=`https://abobasocial-server-dbsync.herokuapp.com/aboba`


export async function getComments(postId,setFunc){
    try{
        const res=await axios.get(`${site_url}/comments/byPost/${postId}`)
        setFunc(res.data)
    }catch(e){
        console.log(e)
    }
}



export async function deleteCommentReq(id){
    try{
        const res=await axios.delete(`${site_url}/comments/${id}`)
    }catch(e){
        console.log(e)
    }
}



export async function leaveCommentReq(text,postId,setLastId){
    try{
        const dateVar=Date.now()
        const res=await axios.post(`${site_url}/comments`,{
            userId:localStorage.getItem('userID'),
            text:text,
            postId:postId,
            spacialId:dateVar
        })
        setLastId(dateVar)
        return text
    }catch(e){
        console.log(e)
    }
}


