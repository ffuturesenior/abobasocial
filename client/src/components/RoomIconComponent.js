import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRoomByIdReq } from "../servFunctions/roomFunctions";
import Loader from "./Loader";


const RoomIconComponent=({roomId,joinRoomCB})=>{

    const [roomData,setRoomData]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    const [isErr,setIsErr]=useState()
    const router=useHistory()
    useEffect(()=>{
        setIsLoading(true)
        getRoomByIdReq(roomId,setRoomData,setIsErr,setIsLoading)
    },[])

    const toRoom=()=>{
         joinRoomCB(roomId)

    }
   
    return(
        <div >
            {isLoading?
                <><Loader/></>
            :
                <div onClick={toRoom} style={{display:"flex",alignItems:'center',borderBottom:"1px solid gray"}}>
                    <div style={{padding:"10px"}}>
                        <strong style={{}}>{roomData.name}</strong>
                    </div> 
                </div>
            }
            
        </div>
    )
}

export default RoomIconComponent