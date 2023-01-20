import axios from 'axios'
import { useContext } from 'react'

const site_url=`http://localhost:5000/aboba`


//https://abobasocial-server-dbsync.herokuapp.com/aboba
export async function createParcipiantReq(userId,chatId,isAdmin,isOwner,username){
    try{
        const res=await axios.post(`${site_url}/parcipiants`,{
            userId:userId,
            chatId:chatId,
            isAdmin:isAdmin,
            isOwner:isOwner,
            username:username
        })
    }catch(e){

    }
}

///parcipiants/getParcipiantsByChatId/:id


export async function getParcipiantsByChatId(id,setFunc,setIsErr,setIsLoading){
    try{
        setIsLoading(true)
        const res=await axios.get(`${site_url}/parcipiants/getParcipiantsByChatId/${id}`)
        setFunc(res.data)
        setIsLoading(false)
    }catch(e){
        setIsErr(true)
    }
}

export async function deleteParcipiantReq(id){
    try{
        const res=await axios.delete(`${site_url}/parcipiants/${id}`)
    }catch(e){

    }
}


export async function chageParcipiantRoleReq(id,isAdmin){
    try{
        const res=await axios.put(`${site_url}/parcipiants/${id}`,{
            isAdmin:isAdmin
        })
    }catch(e){

    }
}

///parcipiants/getParcipiantByChatIdAndUserId/:userId&:chatId

export async function getParcipiantByUserIdAndChatId(userId,chatId,setFunc,setIsErr,setIsLoading){
    try{
        setIsLoading(true)
        const res=await axios.get(`${site_url}/parcipiants/getParcipiantByChatIdAndUserId/${userId}&${chatId}`)
        setFunc(res.data)
        setIsLoading(false)
    }catch(e){
        setIsErr(true)
    }
}

//parcipiants/get10ParcipiantsByChatId/:id


export async function get10ParcipiantByChatId(chatId,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res=await axios.get(`${site_url}/parcipiants/get10ParcipiantsByChatId/${chatId}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(e){
    }
}

//getParcipiantByName

export async function getParcipiantByName(nick,setFunc,setIsErr){
    try{
        const res=await axios.get(`${site_url}/parcipiants/getParcipiantByName/${nick}`)
        setFunc(res.data)
    }catch(e){
    }
}
//getParcipiantByName

