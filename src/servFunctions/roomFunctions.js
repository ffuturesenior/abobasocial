import axios from 'axios'
import { useContext } from 'react'

const site_url=`https://abobasocial-server-dbsync.herokuapp.com/aboba`

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

export async function getRoomByIdReq(id,setFunc){
    try {
        const res=await axios.get(`${site_url}/chat/${id}`)
        setFunc(res.data)
    } catch (e) {
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

export async function getRoomByParcipiant(id,setFunc){
    try {
        const res=await axios.get(`${site_url}/parcipiants/byParcipiantId/${id}`)
        setFunc(res.data)
    } catch (e) {
        console.log(e)
    }
}