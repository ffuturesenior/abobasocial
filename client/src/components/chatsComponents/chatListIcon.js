import React, { useEffect, useState } from 'react'
//import { isMobile } from 'react-device-detect';
import { useHistory, useParams } from 'react-router-dom';
import {  getUser } from '../../servFunctions/functions';
//import Loader from './loader';
import { getMessageLengthByChatID } from '../../servFunctions/messageFunctions';
import Avatar from '../Avatar';


const ChatListIcon=({/*setActiveChat,setOpponent,*/data})=>{
    const userIdStrIndex=data.spId.indexOf(localStorage.getItem('userID'))
    let opponentId;
    const router=useHistory()
    if(userIdStrIndex==0){
        opponentId=data.spId.slice(24,48)
    }
    if(userIdStrIndex==24){
        opponentId=data.spId.slice(0,24)
    }
    const [opponentData,setOpponentData]=useState({})
    const [isErr,setIsErr]=useState(true)
    const [isLoading,setIsLoading]=useState(false)
    const [msgLength,setMsglength]=useState(0);
    const [,uselessSet]=useState()
    useEffect(()=>{
        setIsErr(true)
        setIsLoading(true)
        //console.log(`opponentId${opponentId}`)
        getUser(opponentId,setOpponentData,setIsErr,uselessSet,setIsLoading)
        getMessageLengthByChatID(data._id,setMsglength,setIsErr)
        setTimeout(()=>{setIsLoading(false)},1000)
       
    },[])

    

    
    
    const toChat=()=>{
       //if(isMobile){
            router.push(`/p2pchat/${data._id}&${opponentId}`)
        //}else{
          //  setActiveChat(data._id)
           // setOpponent(opponentId)
        //}
    }
    
    
    return(
        <div>
            {isLoading?
                <>{/*<Loader/>*/}</>
            :
                <>
                {isErr?
                    <div></div>
                :
                <>
                    {msgLength==0?
                        <div></div>
                    :
                        <div style={{display:"flex",alignItems:'center',borderBottom:"1px solid gray",padding:"5px"}} onClick={toChat}>
                            <Avatar height={50} width={50} avatar={opponentData.avatar}/>
                            <p style={{fontSize:"20px"}}>{opponentData.username}</p>
                        </div>
                    }
                </>
                }
                </>
            }
        </div>
    )
}

export default ChatListIcon