import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ChatListIcon from "../components/chatListIcon";
import Loader from "../components/Loader";
import RoomIconComponent from "../components/RoomIconComponent";
import { getP2PChatByUserId } from "../servFunctions/p2pChatFunctions";
import { getRoomByParcipiant } from "../servFunctions/roomFunctions";


const Chats=()=>{
    const router=useHistory()
    const [chats,setChats]=useState([])
    const [isErr,setIsErr]=useState(true)
    const [rooms,setRooms]=useState([])
    useEffect(()=>{
        setIsErr(true)
        getP2PChatByUserId(localStorage.getItem('userID'),setChats,setIsErr)
        getRoomByParcipiant(localStorage.getItem('userID'),setRooms)
    },[])


    const toRoom=(chatId)=>{
         router.push(`/room/${chatId}`)
    }

    return(
        <div>
            
            
            
            {isErr?
                <>
                    <Loader/>
                </>
            :
                <><Link to={`/createroom`}>create room</Link>
                <br/>
                <Link to={'/joinroom'}>join room</Link>
                <br/>
                <div>Chats</div>
                <div style={{margin:"0px 0px",maxWidth:"304px",height:"100%"}}>
                    <div style={{maxHeight:"200px",overflow:"auto"}}>
                        {chats.map((p)=>
                            <div key={p._id}>
                                <ChatListIcon data={p}/>
                            </div>
                        )}
                    </div>
                </div>
                <div>rooms</div>
                <div style={{margin:"0px 0px",maxWidth:"304px",height:"100%"}}>
                    <div style={{maxHeight:"500px",overflow:"auto"}}>
                        {rooms.map((p)=>
                            <div key={p._id}>
                                <RoomIconComponent joinRoomCB={toRoom} roomId={p.chatId}/>
                            </div>
                        )}
                    </div>
                </div>
                </>
            }
            
        </div>
    )
}

export default Chats