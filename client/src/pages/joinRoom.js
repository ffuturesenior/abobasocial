import React, { useCallback, useEffect, useState } from 'react'
import { getRoomByNameReq } from '../servFunctions/roomFunctions'
import {useHistory} from 'react-router-dom'
import { getUser } from '../servFunctions/functions'
import RoomIconComponent from '../components/RoomIconComponent'
import { createParcipiantReq } from '../servFunctions/parcipiantFunctions'
import { io } from 'socket.io-client'

const JoinRoom=()=>{
    const socket =io('http://localhost:5050')
    const [searchingName,setSearchingName]=useState('')
    const [rooms,setRooms]=useState([])
    const [userData,setUserData]=useState()
    const [isErr,setIsErr]=useState(false)
    const [,useless]=useState()
    const [chatId,setChatId]=useState('0')
    const [isLoading,setIsloading]=useState(false)
    const router=useHistory()
    useEffect(()=>{
        getUser(localStorage.getItem('userID'),setUserData,setIsErr,useless,setIsloading)
    },[])

    useEffect(()=>{
        if(searchingName.length>=4){
           getRoomByNameReq(searchingName,setRooms) 
        }else{
            setRooms([])
        }
    },[searchingName])

    const toRoom=(chatId)=>{
        createParcipiantReq(localStorage.getItem('userID'),chatId,false,false,userData.username).then( router.push(`/room/${chatId}`))
        socket.emit('joinRoomNotification',Date.now(),chatId,userData.username,true)
    }

    return(
        <>
        {isLoading?
            <></>
        :
            <>
            {isErr?
                <></>
            :
                <>
                    joinroom
                    <input placeholder="enter room name" style={{width:"20%",border:"3px solid blue",borderRadius:"9px",padding:"5px",margin:"0px auto"}} value={searchingName} onChange={(e)=>setSearchingName(e.target.value)}/>
                    <div style={{margin:"0px 0px",maxWidth:"304px",height:"100%"}}>
                        <div style={{maxHeight:"250px",overflow:"auto"}}>
                            {rooms.map((p)=>
                                <div key={p._id}>
                                    <RoomIconComponent joinRoomCB={toRoom} roomId={p._id}/>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            }
            </>
        }    
        </>
    )
}

export default JoinRoom