import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRoomByParcipiant } from "../../servFunctions/roomFunctions";
import RoomIconComponent from "../RoomIconComponent";



const RoomList=()=>{
    const [isErr,setIsErr]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [rooms,setRooms]=useState([])
    const router=useHistory()
    useEffect(()=>{
        getRoomByParcipiant(localStorage.getItem('userID'),setRooms,setIsLoading,setIsErr)
    },[])

    const toRoom=(chatId)=>{
        router.push(`/room/${chatId}`)
   }
    return(
        <div style={{height:"45%"}}>
            {isLoading?
                <>
                </>
            :
                <>
                    {isErr?
                        <></>
                    :
                        <>
                            <div style={{margin:"0px 0px",maxWidth:"304px",height:"100%",overflow:"auto"}}>
                                        {rooms.length==0?
                                            <strong>no rooms yet</strong>
                                        :
                                        <>
                                            {rooms.map((p)=>
                                                <div key={p._id}>
                                                    <RoomIconComponent joinRoomCB={toRoom} roomId={p.chatId}/>
                                                </div>
                                            )}
                                        </>
                                    }
                            </div>   
                        </>
                    }                
                </>
            }
            
        </div>
    )
}


export default RoomList