import axios from 'axios'
import { useContext } from 'react'

const site_url=`http://localhost:5000/aboba`

export async function createRoomReq(name,setFunc){
    try {
        const res=await axios.post(`${site_url}/chat`,{
            name:name
        })
        setFunc(res.data)
    } catch (e) {
        console.log(e)
    }
}

export async function getRoomByIdReq(id,setFunc,setIsErr,setIsLoading){
    try {
        setIsLoading(true)
        const res=await axios.get(`${site_url}/chat/${id}`)
        setFunc(res.data)
        setIsLoading(false)
    } catch (e) {
        setIsErr(true)
        console.log(e)
    }
}

/*/chat/getByName/:name*/

export async function getRoomByNameReq(name,setFunc){
    try {
        const res=await axios.get(`${site_url}/chat/getByName/${name}`)
        setFunc(res.data)
    } catch (e) {
        console.log(e)
    }
}

export async function getRoomByParcipiant(id,setFunc,setIsLoading,setIsErr){
    try {
        setIsLoading(true)
        const res=await axios.get(`${site_url}/parcipiants/byParcipiantId/${id}`)
        setFunc(res.data)
        setIsLoading(false)
    } catch (e) {
        setIsErr(true)
        console.log(e)
    }
}