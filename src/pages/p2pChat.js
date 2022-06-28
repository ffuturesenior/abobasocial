import React,{useState,useRef,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getUser } from "../servFunctions/functions";
import { getMessageByChatID,postMessage } from "../servFunctions/messageFunctions";
import Message from "../components/Message";
import {io} from 'socket.io-client'
import Loader from "../components/Loader";


const P2pChat=()=>{
    const socket=io('https://abobasocial-socket-sync.herokuapp.com/')
    const {id,opponent}=useParams()
    const [messages,setMessages]=useState([])
    const [lastMsgId,setLastMsgId]=useState("21d1d1d")
    const [lastMsg,setLastMsg]=useState({})
    const [messagesLength,setMessagelength]=useState(0);
    const [opponentData,setOpponentData]=useState({})
    const [isErr,setIsErr]=useState(true)
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
        getUser(localStorage.getItem('userID'),setUserData,setIsErr,useless)
        getUser(opponent,setOpponentData,setIsErr)
       // getMessageLengthByChatID(id,setMessagelength,setIsErr)
        getMessageByChatID(id,setMessages,setIsErr,1000000,setIsMessages)
        //getMessageByChatID(id,setMessages,setIsErr,maxCount)
        setIsErr(true)
        socket.emit('joinRoom',id)
        setIsErr(false)
        setTimeout(()=>{setIsLoading(false)},2000)
        //console.log(messages.length)
        //console.log(id)
    },[opponent,id])

   
    
       
    socket.on('getMsg',({_id,userId,chatId,text})=>{
        setLastMsg({_id:_id,userId:userId,chatID:chatId,text:text,iamges:" "})
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    })

    
    useEffect(()=>{
        //console.log(lastMsg)
        setMessages(prev=>[...prev,lastMsg])
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    },[lastMsg])

    socket.on('getRedactetMsg',({i,text})=>{
        getMessageByChatID(id,setMessages,setIsErr,1000000)
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    })
    
    socket.on('getDeletedMsg',(i)=>{
        //console.log(i.i)        
        //console.log(messages)
        const hui=messages.filter((p)=>{
            if(p._id!==i.i) return p
        })
        setMessages(hui)
        //console.log(messages)
        getMessageByChatID(id,setMessages,setIsErr,100000,setIsMessages)
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    })

    const redactMsg=(i,text)=>{
      socket.emit('redactMsg',i,text,id)
    }
   
    const deleteMsg=(msgid)=>{
       socket.emit('deleteMsg',id,msgid)
    }

    

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[isLoading])
    
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

    


    
    const sendMessage=()=>{
        if(message.text.length>=1){
            formData.append('userId',localStorage.getItem('userID'))
            formData.append('chatId',id)
            formData.append('text',message.text)
            formData.append('readed',false)
            postMessage(formData,setMessages,messages,setLastMsgId).then(()=>{ 
                socket.emit('sendMsg',lastMsgId,localStorage.getItem('userID'),message.text,id)
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
                                        <div ref={scrollRef} key={p._id}>
                                            {p.userId==opponent?
                                                <div style={{textAlign:"left"}}>
                                                    <Message setMessages={setMessages} messages={messages} i1={i} isOwnMsg={false} props={p} deleteCB={deleteMsg}/>
                                                </div>
                                            :
                                                <div style={{textAlign:"right"}}>
                                                    <Message setMessages={setMessages} messages={messages} i1={i} rldPage={rld} isOwnMsg={true} props={p} redactCB={redactMsg} deleteCB={deleteMsg}/>
                                                </div>
                                            }
                                        </div>
                                    )}
                                    <div ref={bottomRef}></div>
                                </div>
                                <div style={{display:'flex',alignItems:"center",justifyContent:'center',textAlign:"center",padding:"10px 0px"}}>
                                    <textarea style={{border:"2px solid blue",borderRadius:"10px",resize:'none'}} value={message.text} onChange={(e)=>setMessage({...message,text:e.target.value})}/>
                                    <button style={{background:"blue",padding:"5px",borderRadius:"10px"}} onClick={sendMessage}>otpravitb</button>
                                    
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