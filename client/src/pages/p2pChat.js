import React,{useState,useRef,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getUser } from "../servFunctions/functions";
import { getMessageByChatID,postMessage } from "../servFunctions/messageFunctions";
import Message from "../components/Message";
import {io} from 'socket.io-client'
import Loader from "../components/Loader";


const P2pChat=()=>{
    const socket=io('http://localhost:5050')
    const {id,opponent}=useParams()
    const [messages,setMessages]=useState([])
    const [lastMsgId,setLastMsgId]=useState("21d1d1d")
    const [lastMsg,setLastMsg]=useState({})
    const [specialId,setSpecialId]=useState(0)
    const [messagesLength,setMessagelength]=useState(0);
    const [opponentData,setOpponentData]=useState({})
    const [isErr,setIsErr]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [isMessages,setIsMessages]=useState(false)
    const [userData,setUserData]=useState({})
    const [parcipiants,setParcipiants]=useState([])
    const [,useless]=useState()
    const [message,setMessage]=useState({
        chatID:id,
        userId:localStorage.getItem('userID'),
        text:""
    })
    const formData=new FormData()
    const router=useHistory()
    const loadZone=useRef()
    const scrollRef=useRef()
    const bottomRef=useRef()
    useEffect(()=>{
        setIsLoading(true)
        getUser(localStorage.getItem('userID'),setUserData,setIsErr,useless,setIsLoading)
        getUser(opponent,setOpponentData,setIsErr,useless,setIsLoading)
        getMessageByChatID(id,setMessages,setIsErr,1000000,setIsMessages,setIsLoading)
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
    socket.on('recieveCanceledWriters',(username,userId)=>{
        setWriters(writers.filter((p)=>{
            if(writers._id!=userId) return p
        }))
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
        getMessageByChatID(id,setMessages,setIsErr,1000000)
        setTimeout(()=>{setIsErr(false)},2000)
    }

    return(
        <div>
           
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
                    
                      <>
                            <div onClick={()=>router.push(`/userprofile/${opponent}`)} style={{textAlign:"center",padding:"10px 0px",height:"45px"}}><strong>{opponentData.username}</strong>
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
                                    
                                    {messages.map((p,i)=>
                                        <div ref={scrollRef} key={p.specialId}>
                                            {p.userId==opponent?
                                                <div style={{textAlign:"left"}}>
                                                    <Message setMessages={setMessages} messages={messages} i1={i} isOwnMsg={false} props={p} deleteCB={deleteMsg}/>
                                                </div>
                                            :
                                                <div style={{textAlign:"right"}}>
                                                    <Message setMessages={setMessages} messages={messages} i1={i} rldPage={rld} isOwnMsg={true} props={p} deleteCB={deleteMsg}/>
                                                </div>
                                            }
                                        </div>
                                    )}
                                    <div></div>
                                </div>
                                <div class="input-group mb-3">
                                    <input value={message.text} onChange={(e)=>setMessage({...message,text:e.target.value})} type="text" class="form-control" placeholder="type text" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                    <button onClick={sendMessage}class="btn btn-outline-secondary" type="button" id="button-addon2">send</button>
                                </div>
                            </div>
                    </>
                    }
                </>
            }
        </div>
    )
}

export default P2pChat