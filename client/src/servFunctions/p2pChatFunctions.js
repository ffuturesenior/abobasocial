import axios from 'axios'
import { useContext } from 'react'

const site_url=`http://localhost:5000/aboba`


export async function getP2PChat(user1ID,user2ID,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/p2pchats/getbyusers/${user1ID}&${user2ID}`)
        setFunc(res.data)
        //console.log(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
        //setIsErr(true)
    }
}



export async function createP2PChat(user1ID,user2ID,setNewChat){
    try{
        const res = await axios.post(`${site_url}/p2pchats`,{
            name:" ",
            spId:`${user1ID}${user2ID}`
        })
        setNewChat(res.data)
    }catch(error){
        console.log(error)
    }
}

export async function getP2PChatByUserId(userID,setFunc,setIsErr,setIsLoading){
    try{
        setIsLoading(true)
        const res = await axios.get(`${site_url}/p2pchats/getbyuserId/${userID}`)
        setFunc(res.data)
        setIsLoading(false)
    }catch(error){
        console.log(error)
        setIsErr(true)
    }
}