import React,{useState,useRef,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getUser } from "../servFunctions/functions";
import { getMessageByChatID,postMessage, readMessageReq } from "../servFunctions/messageFunctions";
import Message from "../components/Message";
import { getRoomByIdReq } from "../servFunctions/roomFunctions";
import {io} from 'socket.io-client'
import { getParcipiantByUserIdAndChatId, getParcipiantsByChatId } from "../servFunctions/parcipiantFunctions";
import {useInView} from 'react-intersection-observer'
import Loader from "../components/Loader";

const Room=()=>{
    const socket=io('https://abobasocial-socket-sync.herokuapp.com')
    const {id}=useParams()
    const [roomData,setRoomData]=useState()
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
    const [parcipiantData,setParcipiantData]=useState()
    const [ss,useless]=useState()
    const formData=new FormData()
    const router=useHistory()
    const loadZone=useRef()
    const scrollRef=useRef()
    const bottomRef=useRef()
    const [isLastMsgSeen,setIsLastMsgSeen]=useState({boolean:false,times:0})
    const [message,setMessage]=useState({
        chatID:id,
        userId:localStorage.getItem('userID'),
        text:""
    })
    const [notifications,setNotifications]=useState([])
    const [notificationActive,setNotificationActive]=useState(false)
    useEffect(()=>{
        setIsLoading(true)
        getUser(localStorage.getItem('userID'),setUserData,setIsErr,useless)
        getParcipiantByUserIdAndChatId(localStorage.getItem('userID'),id,setParcipiantData,setIsErr)
        getRoomByIdReq(id,setRoomData)
        getParcipiantsByChatId(id,setParcipiants)
       // getMessageLengthByChatID(id,setMessagelength,setIsErr)
        getMessageByChatID(id,setMessages,setIsErr,1000000,setIsMessages)
        //getMessageByChatID(id,setMessages,setIsErr,maxCount)
        setIsErr(true)
        socket.emit('joinRoom',id)
        setIsErr(false)
        setTimeout(()=>{setIsLoading(false)},2000)
        //console.log(messages.length)
      //  readMessageReq(id,setIsLastMsgSeen,isLastMsgSeen.times)
        //console.log(id)
    },[id])

   
    
       
    socket.on('getMsg',({_id,userId,chatId,text})=>{
        setLastMsg({_id:_id,userId:userId,chatId:chatId,text:text,iamges:" "})
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
        setIsLastMsgSeen({boolean:false,times:0})
    })

    
    useEffect(()=>{
        //console.log(lastMsg)
        setMessages(prev=>[...prev,lastMsg])
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    },[lastMsg])

   /* socket.on('getRedactetMsg',({i,text})=>{
        getMessageByChatID(id,setMessages,setIsErr,1000000)
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    })*/
    
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

   /* const [lastMsgZone,inView,entry]=useInView({
        threshold:0,
        onChange:(inView,entry)=>{setIsLastMsgSeen({boolean:inView,times:isLastMsgSeen.times+1})}
        
    })
    useEffect(()=>{
        console.log('in wiew field')
        console.log(isLastMsgSeen.times)
        console.log(isLastMsgSeen.times==1)
        if(isLastMsgSeen.boolean==true&&isLastMsgSeen.times<=2){
            console.log('script started')
            socket.emit('setLastMsgSeen',id,localStorage.getItem('userID'))
            setIsLastMsgSeen({boolean:false,times:isLastMsgSeen.times+1})
        }
    },[inView])*/

   /*socket.on('recieveLastMsgSeen',(userId)=>{
        console.log(`user id :${userId}`)
        console.log(`user id 2: ${localStorage.getItem('userID')}`)
        console.log(userId!=localStorage.getItem('userID'))
        console.log('recieved sygnal')
        if(userId==localStorage.getItem('userID')){ 
            console.log('dont seen')
            setIsLastMsgSeen({boolean:false,times:isLastMsgSeen.times+1})
        }
        if(userId!=localStorage.getItem('userID')){
            console.log(' seen')
            readMessageReq(id,localStorage.getItem('userID'),setIsLastMsgSeen,isLastMsgSeen.times)
            setIsLastMsgSeen({boolean:true,times:isLastMsgSeen.times+1})
        }
    })*/

    socket.on('recieveNotification',(id,username,action)=>{
        setNotifications(prev=>[...prev,{id:id,username:username,action:action}])
    })

    const clearNotification=(id)=>{
        setNotifications(notifications.filter((p)=>{
            if(id!=p.id) return p
        }))
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
                    <div>
                        <div style={{position:"absolute",height:"200px",overflow:"auto",maxWidth:"100px"}}>
                            {notifications.map((p)=>
                                <div onDoubleClick={()=>clearNotification(p.id)} key={p.id} style={{background:"grey",height:"50px",width:"100px"}}>
                                    {p.username}{p.action?<p> added to group</p>:<p> leaved group</p>}
                                </div>    
                            )}  
                        </div>
                        
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
                                    
                                    {messages.map((p,i)=>
                                        <div ref={scrollRef} key={p._id?p._id:i}>
                                            {p.userId==localStorage.getItem('userID')?
                                                <div style={{textAlign:"right"}}>
                                                    <Message setMessages={setMessages} role={parcipiantData} messages={messages} i1={i} isOwnMsg={true} props={p} deleteCB={deleteMsg}/>
                                                    {/*p.readed?
                                                        <>seen</>
                                                    :
                                                        <>{isLastMsgSeen.boolean?<p>seen</p>:<p>sended</p>}</>
                                                    */}
                                                    
                                                </div>
                                            :
                                                <div style={{textAlign:"left"}}>
                                                    <Message setMessages={setMessages}    messages={messages} i1={i} rldPage={rld} isOwnMsg={false} props={p} redactCB={redactMsg} deleteCB={deleteMsg}/>
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
                    </div>
                    }
                </>
            }
        </div>
    )
}

export default Room