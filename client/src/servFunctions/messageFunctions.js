import axios from 'axios'
import { useContext } from 'react'

const site_url=`http://localhost:5000/aboba`

//https://abobasocial-server-dbsync.herokuapp.com/aboba

export async function getMessageByID(msgId,setFunc,setIsErr){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/messages/${msgId}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
        //setIsErr(true)
    }
}

export async function getMessageByChatID(chatID,setFunc,setIsErr,maxCount,setIsLoading){
    try{
        setIsLoading(true)
        const res = await axios.get(`${site_url}/messages/getbychatid/${chatID}&${maxCount}`)
        setFunc(res.data)
        setIsLoading(false)
    }catch(error){
        console.log(error)
        setIsErr(true)
    }
}

export async function getMoreMessages(chatID,setFunc,maxCount,minCount){
    try{
        const res = await axios.get(`${site_url}/messages/getMore/${chatID}&${maxCount}&${minCount}`)
        setFunc(res.data)
    }catch(error){
        console.log(error)
    }
}


export async function getMessageLengthByChatID(chatID,setFunc,setIsErr,maxCount){
    try{
        setIsErr(true)
        const res = await axios.get(`${site_url}/messages/getbychatid/${chatID}`)
        setFunc(res.data)
        setIsErr(false)
    }catch(error){
        console.log(error)
       // setIsErr(true)
    }
}

export async function postMessage(inputedData,setFunc,variable){
    try{
        const res = await axios.post(`${site_url}/messages`,inputedData)
        //setFunc([...variable,res.data])
        //console.log(res.data._id)
    }catch(error){
        console.log(error)
    }
}


export async function redactMessage(inputedData,id){
    try{
        const res = await axios.put(`${site_url}/messages/update/${id}`,{
            text:inputedData
        })
    }catch(error){
        console.log(error)
    }
}




export async function deleteMessage(id){
    try{
        const res = await axios.delete(`${site_url}/messages/${id}`)
    }catch(error){
        console.log(error)
    }
}


export async function readMessageReq(id,userId,setFunc,count){
    try{
        const res = await axios.put(`${site_url}/messages/setReaded/${id}&${userId}`)
        setFunc({boolean:true,count:count})
    }catch(error){
        console.log(error)
    }
}
