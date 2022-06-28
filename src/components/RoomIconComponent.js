import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRoomByIdReq } from "../servFunctions/roomFunctions";
import Loader from "./Loader";


const RoomIconComponent=({roomId})=>{

    const [roomData,setRoomData]=useState({})
    const [isLoading,setIsLoading]=useState()
    const router=useHistory()
    useEffect(()=>{
        setIsLoading(true)
        getRoomByIdReq(roomId,setRoomData).then(setIsLoading(false))
    },[])

    return(
        <div onClick={()=>router.push(`/room/${roomId}`)}>
            {isLoading?
                <><Loader/></>
            :
                <div style={{display:"flex",alignItems:'center',borderBottom:"1px solid gray"}}>
                    <div style={{padding:"10px"}}>
                        <strong style={{}}>{roomData.name}</strong>
                    </div> 
                </div>
            }
            
        </div>
    )
}

export default RoomIconComponent