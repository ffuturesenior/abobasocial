import axios from 'axios'
import { useContext } from 'react'

const site_url=`http://localhost:5000/aboba`


//https://abobasocial-server-dbsync.herokuapp.com/aboba
export async function subscribeReq(id,otherUserId){
    try{
        const res= await axios.post(`${site_url}/subscribes`,{
            from:id,
            to:otherUserId
        })
    }catch(e){
        console.log(e)     
    }
}

/*/subscribes/check/:id&:otherUserId*/
export async function subscribeCheck(id,otherUserId,setFunc,setSubscriptionId){
    try{
        const res= await axios.get(`${site_url}/subscribes/check/${id}&${otherUserId}`)
        setFunc(res.data)
        setSubscriptionId(res.data._id)
        //setFunc(res.data)
    }catch(e){
        console.log(e)     
    }
}

/*/subscribes/getSubscribers/:id */
export async function getSubscribers(id,setFunc){
    try{
        const res= await axios.get(`${site_url}/subscribes/getSubscribers/${id}`)
        setFunc(res.data.length)
        //console.log(res.data)
    }catch(e){
        console.log(e)     
    }
}

/*/subscribes/:id*/


export async function unsubscribeReq(id){
    try{
        const res= await axios.delete(`${site_url}/subscribes/${id}`)
    }catch(e){
        console.log(e)     
    }
}


/*/subscribes/getSubscribes/:id */

export async function getSubscribes(id,setFunc){
    try{
        const res= await axios.get(`${site_url}/subscribes/getSubscribes/${id}`)
        setFunc(res.data.length)
        //console.log(res.data)
    }catch(e){
        console.log(e)     
    }
}