import axios from 'axios'
import { useContext } from 'react'

const site_url=`https://abobasocial-server-dbsync.herokuapp.com/aboba`


//https://abobasocial-server-dbsync.herokuapp.com/aboba


export async function createPostReq(formData){
    try{
        const res= await axios.post(`${site_url}/posts`,formData)
    }catch(e){
        console.log(e)     
    }
}

export async function getPostsReq(setFunc,setIsErr){
    try{
        setIsErr(true)
        const res= await axios.get(`${site_url}/posts`)
        setFunc(res.data)
        setIsErr(false)
    }catch(e){
        setIsErr(true)
        console.log(e)     
    }
}


export async function getPostReq(id,setFunc){
    try{
        const res= await axios.get(`${site_url}/posts/${id}`)
        setFunc(res.data)
    }catch(e){
        console.log(e)     
    }
}

/*/posts/fromFollowedAccaunts/:id*/


export async function getFollowedUsersId(id,setFunc){
    try{
        const resid= await axios.get(`${site_url}/posts/fromFollowedId/${id}`)
        setFunc(resid.data)
        
    }catch(e){
        console.log(e)     
    }
}

/*/posts/getFollowedUserPosts/:id*/


export async function getFollowedUsersPosts(id,idArr,setFunc){
    try{
        const res= await axios.post(`${site_url}/posts/getFollowedUserPosts/${id}`,{idArr})
        setFunc(res.data)
        
    }catch(e){
        console.log(e)     
    }
}


//posts/byUserId/:id

export async function getUserPostsReq(id,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res= await axios.get(`${site_url}/posts/byUserId/${id}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(e){
        setIsErr(true)
        console.log(e)     
    }
}

export async function deletePostReq(id){
    try{
        const res= await axios.delete(`${site_url}/posts/${id}`)
    }catch(e){
        console.log(e)     
    }
}