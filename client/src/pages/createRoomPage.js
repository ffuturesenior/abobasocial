import React, { useEffect, useState } from "react";
import { createParcipiantReq } from "../servFunctions/parcipiantFunctions";
import { createRoomReq, getRoomByNameReq } from "../servFunctions/roomFunctions";
import { useHistory } from "react-router-dom";
import {getUser} from "../servFunctions/functions";
import Loader from "../components/Loader";

const CreateRoomPage=()=>{
    const router=useHistory()
    const [newName,setNewName]=useState('')
    const [newChatData,setNewChatData]=useState({})
    const [newChatIdData,setNewChatIdData]=useState({})
    const [isLoading,setIsloading]=useState(false)
    const [userData,setUserData]=useState()
    const [isErr,setIsErr]=useState(true)
    const [,useless]=useState()
    
    useEffect(()=>{
        getUser(localStorage.getItem('userID'),setUserData,setIsErr,useless,setIsloading)
    },[])

    const createRoom=()=>{
        if(newName.length>=4){
            setIsloading(false)
            createRoomReq(newName,setNewChatData)
        }
    }
    

    useEffect(()=>{
        if(newName.length>=4){
            getRoomByNameReq(newName,setNewChatIdData)//).then(createParcipiantReq(localStorage.getItem('userID'),newChatIdData).then(router.push(`/room/${newChatData}`))).then(router.push(`/room/${newChatIdData}`))
        }
    },[newChatData])

    useEffect(()=>{
        if(newName.length>=4){
            //console.log(`new chat id data:${newChatIdData}`)
            createParcipiantReq(localStorage.getItem('userID'),newChatIdData[0]._id,true,true,userData.username).then(router.push(`/room/${newChatIdData[0]._id}`))
        }                           
    },[newChatIdData])
    
    return(
        <div>
            {isLoading?
                <>
                </>
            :
                <>
                {isErr?
                    <><Loader/></>
                :
                    <>
                        <input placeholder="enter room name" style={{width:"20%",border:"3px solid blue",borderRadius:"9px",padding:"5px",margin:"0px auto"}} value={newName} onChange={(e)=>setNewName(e.target.value)}/>
                        <button style={{padding:"5px",border:"1px solid black",borderRadius:"10px"}} onClick={createRoom}>create room</button>
                    </>
                }
                </>
            }
        </div>
    )
}

export default CreateRoomPage