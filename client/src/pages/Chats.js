import React from "react";
import { Link } from "react-router-dom";
import ChatList from "../components/chatsComponents/chatList";
import RoomList from "../components/chatsComponents/roomList";
import Loader from "../components/Loader";


const Chats=()=>{
   

    return(
        <div style={{height:'99%'}}>
                    <Link to={`/createroom`}>create room</Link>
                    <br/>
                    <Link to={'/joinroom'}>join room</Link>
                    <br/>
                    <div>Chats</div>
                    <ChatList/>
                    <div>rooms</div>
                    <RoomList/>
        </div>
    )
}

export default Chats