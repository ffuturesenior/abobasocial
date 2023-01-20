import axios from 'axios'
import { useContext } from 'react'

const site_url=`http://localhost:5000/aboba`


//https://abobasocial-server-dbsync.herokuapp.com/aboba


export async function createPostReq(caption,sp,string){
    try{
        const res= await axios.post(`${site_url}/posts`,{
            userId:localStorage.getItem('userID'),
            caption:caption,
            specialId:sp,
            date:Date.now()
        })
        const res1=await axios.post(`${site_url}/file/`,{
            data:string,
            specialId:sp
        })
    }catch(e){
        console.log(e)     
    }
}

export async function getPostsReq(setFunc,setIsErr,setIsLoading){
    try{
        setIsLoading(true)
        const res= await axios.get(`${site_url}/posts`)
        setFunc(res.data)
        setIsLoading(false)
    }catch(e){
        setIsErr(true)
        console.log(e)     
    }
}


export async function getPostReq(id,setFunc,setIsErr,setIsLoading){
    try{
        setIsLoading(true)
        const res= await axios.get(`${site_url}/posts/${id}`)
        setFunc(res.data)
       
        //setString(btoa(String.fromCharCode(...new Uint8Array(res.file.data.data))))
        setIsLoading(false)
    }catch(e){
        setIsErr(true)
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

export async function getUserPostsReq(id,setFunc,setIsErr,setIsLoading){
    try{
        setIsLoading(true)
        const res= await axios.get(`${site_url}/posts/byUserId/${id}`)
        setFunc(res.data)
        setIsLoading(false)
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