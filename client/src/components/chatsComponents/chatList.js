import React, { useEffect, useState } from "react";
import { getP2PChatByUserId } from "../../servFunctions/p2pChatFunctions";
import ChatListIcon from "./chatListIcon";


const ChatList=()=>{

    const [chats,setChats]=useState([])
    const [isErr,setIsErr]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        getP2PChatByUserId(localStorage.getItem('userID'),setChats,setIsErr,setIsLoading)

    },[])

    return(
        <div style={{height:"45%"}}>
            {isLoading?
                <></>
            :
                <>
                    {isErr?
                        <></>
                    :
                        <>
                        <div style={{margin:"0px 0px",maxWidth:"304px",height:"100%",overflow:"auto"}}>
                                    {chats.length==0?
                                        <strong>no chats yet</strong>
                                    :
                                    <>
                                        {chats.map((p)=>
                                            <div key={p._id}>
                                                <ChatListIcon data={p}/>
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


export default ChatList