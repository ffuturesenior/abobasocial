import React,{useState,useRef,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getUser } from "../servFunctions/functions";
import { getMessageByChatID,getMoreMessages,postMessage, readMessageReq } from "../servFunctions/messageFunctions";
import Message from "../components/Message";
import { getRoomByIdReq } from "../servFunctions/roomFunctions";
import {io} from 'socket.io-client'
import { getParcipiantByUserIdAndChatId, getParcipiantsByChatId } from "../servFunctions/parcipiantFunctions";

import Loader from "../components/Loader";

const Room=()=>{
    const socket=io('http://localhost:5050')
    const {id}=useParams()
    const [roomData,setRoomData]=useState({name:""})
    const [messages,setMessages]=useState([])
    const [specialId,setSpecialId]=useState(0)
    const [lastMsg,setLastMsg]=useState({})
    const [messagesLength,setMessagelength]=useState(0);
    const [opponentData,setOpponentData]=useState({})
    const [isErr,setIsErr]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [isMessages,setIsMessages]=useState(false)
    const [userData,setUserData]=useState({})
    const [parcipiants,setParcipiants]=useState([])
    const [parcipiantData,setParcipiantData]=useState()
    const [ss,useless]=useState()
    const formData=new FormData()
    const router=useHistory()
    const scrollRef=useRef()

    const [message,setMessage]=useState({
        chatID:id,
        userId:localStorage.getItem('userID'),
        text:""
    })
    const [notifications,setNotifications]=useState([])
    const [notificationActive,setNotificationActive]=useState(false)
    const [maxCount,setMaxCount]=useState(1000000000)
    useEffect(()=>{
        setIsLoading(true)
        getMessageByChatID(id,setMessages,setIsErr,maxCount,setIsLoading)
        getUser(localStorage.getItem('userID'),setUserData,setIsErr,useless,setIsLoading)
        getParcipiantByUserIdAndChatId(localStorage.getItem('userID'),id,setParcipiantData,setIsErr,setIsLoading)
        getRoomByIdReq(id,setRoomData,setIsErr,setIsLoading)
        getParcipiantsByChatId(id,setParcipiants,setIsErr,setIsLoading)
        
        socket.emit('joinRoom',id)
    },[])


    socket.on('getMsg',({specialId,userId,chatId,text})=>{
        setLastMsg({specialId:specialId,userId:userId,chatId:chatId,text:text})
    })

    
    useEffect(()=>{
        setMessages(prev=>[...prev,lastMsg])
        setTimeout(()=>{
            scrollRef.current?.scrollIntoView({behavior:"smooth"})
        },[400])
    },[lastMsg])

    const deleteMsg=(spId)=>{
        socket.emit('deleteMsg',id,spId)
    }

    socket.on('getDeletedMsg',(i)=>{       
        setSpecialId(i) 
    })
    
    useEffect(()=>{
        const arr=messages.filter((p)=>{
            if(p.specialId!=specialId) return p
        })
        setMessages(arr)
    },[specialId])
   

    const [writers,setWriters]=useState([])
    const [isWriting,setIsWriting]=useState(false)
    useEffect(()=>{
        if(message.text.length==1&&isWriting==false){
            setIsWriting(true)
            socket.emit('startedWriting',userData.username,id,userData._id)
        }
        if(message.text.length==0){
            setIsWriting(false)
            socket.emit('stoppedWriting',userData.username,id,userData._id)
        }
    },[message.text])


    socket.on('recieveNewWriters',(username,userId)=>{
        setWriters(prev=>[...prev,{username:username,_id:userId}])
    })
    //recieveCanceledWriters
    socket.on('recieveCanceledWriters',(username,userId)=>{
        setWriters(writers.filter((p)=>{
            if(writers._id!=userId) return p
        }))
    })


    socket.on('recieveDeletedParcipiant',(id)=>{
        if(localStorage.getItem('userID')==id){
            router.push('/')
        }
    })

    socket.on('recievePromotedUser',(userId)=>{
       getParcipiantByUserIdAndChatId(userId,id,setParcipiantData,setIsErr)
    })

    socket.on('receiveDisableAdminUser',(userId)=>{
        getParcipiantByUserIdAndChatId(userId,id,setParcipiantData,setIsErr)
    })

    const sendMessage=()=>{
        if(message.text.length>=1){
            const sp=Date.now()*Math.random()
            formData.append('userId',localStorage.getItem('userID'))
            formData.append('chatId',id)
            formData.append('text',message.text)
            formData.append('specialId',sp)
            postMessage(formData,setMessages,messages).then(()=>{ 
                socket.emit('sendMsg',sp,localStorage.getItem('userID'),message.text,id)
                setMessage({...message,text:""})
            })
        }
    }

    const rld=()=>{
        setIsErr(true)
        getMessageByChatID(id,setMessages,setIsErr,maxCount)
        setTimeout(()=>{setIsErr(false)},2000)
    }



    return(
        <div style={{position:"relative",zIndex:"0"}}>
           
            {isLoading?
                <>
                    <Loader/>
                </>
            :
                <>
                    {isErr?
                        <div>
                            err
                            <button style={{background:"grey",padding:"5px",borderRadius:"10px"}} onClick={rld}>reload</button>
                        </div>
                    :
                    <div>
                            <div  style={{textAlign:"center",padding:"10px 0px",height:"62px"}}><strong onClick={()=>router.push(`/roomdata/${id}`)}>{roomData.name}<br/>parcipiants:{parcipiants.length}</strong>
                            {writers.length>0?
                                <div style={{display:'flex',margin:"0px auto",maxWidth:"300px",textAlign:"center"}}>
                                        {writers.map((p,i)=>
                                            <p>{i+1>3?<></>:<>{p.username}{i+1!=3?<>,</>:<></>}</>}</p>
                                        )}<p>:writing</p>
                                </div>
                                :
                                <>
                                                                        
                                </>
                            }
                            </div>
                                
                                                                

                            <div style={{maxHeight:"100%"}}>
                                <div style={{height:"400px",overflow:"auto",position:"relative",top:"0%"}}>
                                    {messages.map(p=>
                                        <div ref={scrollRef} key={`${p.specialId}`}>
                                            {p.userId==localStorage.getItem('userID')?
                                                <div style={{textAlign:"right"}}>
                                                    <Message setMessages={setMessages} role={parcipiantData} messages={messages} isOwnMsg={true} props={p} deleteCB={deleteMsg}/>
                                                </div>
                                            :
                                                <div style={{textAlign:"left"}}>
                                                    <Message setMessages={setMessages}    messages={messages}  rldPage={rld} isOwnMsg={false} props={p} deleteCB={deleteMsg}/>
                                                </div>
                                            }
                                        </div>
                                    )}
                                    
                                </div>
                                <div class="input-group mb-3">
                                    <input value={message.text} onChange={(e)=>setMessage({...message,text:e.target.value})} type="text" class="form-control" placeholder="type text" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                    <button onClick={sendMessage}class="btn btn-outline-secondary" type="button" id="button-addon2">send</button>
                                </div>
                            </div>
                    </div>
                    }
                </>
            }
        </div>
    )
}

export default Room