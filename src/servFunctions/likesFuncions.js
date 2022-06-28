import axios from 'axios'
import { useContext } from 'react'

const site_url=`https://abobasocial-server-dbsync.herokuapp.com/aboba`



export async function likePostReq(postId,userId,setLikeId){
    try{
        const res=await axios.post(`${site_url}/likes`,{
            userId:localStorage.getItem('userID'),
            postId:postId
        })
        setLikeId(res.data._id)
    }catch(e){
        console.log(e)
    }
}


export async function getLikes(postId,setFunc,setIsLoading){
    try{
        setIsLoading(true)
        const res= await axios.get(`${site_url}/likes/byPost/${postId}`)
        setFunc(res.data)
        ///console.log(res.data)
        setIsLoading(false)
    }catch(e){
        console.log(e)
    }
}

export async function checkLikeReq(postId,userId,setFunc,setLikeId){
    try{
        const res= await axios.get(`${site_url}/likes/checkLike/${postId}&${userId}`)
        //setLikeId(res.data._id)

        if(res.data.length>=1){
            setFunc(true)
            //console.log(res.data[0]._id)
            setLikeId(res.data[0]._id)
        }
    }catch(e){
        console.log(e)
    }
}

export async function deleteLikeReq(postId,userId){
    try{
        const res= await axios.delete(`${site_url}/likes/${postId}&${userId}`)
    }catch(e){
        console.log(e)
    }
}