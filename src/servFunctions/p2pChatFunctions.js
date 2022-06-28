import axios from 'axios'
import { useContext } from 'react'

const site_url=`https://abobasocial-server-dbsync.herokuapp.com/aboba`


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



export async function createP2PChat(user1ID,user2ID){
    try{
        const res = await axios.post(`${site_url}/p2pchats`,{
            name:" ",
            spId:`${user1ID}${user2ID}`
        })
    }catch(error){
        console.log(error)
    }
}

export async function getP2PChatByUserId(userID,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/p2pchats/getbyuserId/${userID}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
       // setIsErr(true)
    }
}