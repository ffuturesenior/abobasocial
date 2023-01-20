import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParcipiantComponent from "../components/ParcipiantComponent";
import { getParcipiantByUserIdAndChatId, get10ParcipiantByChatId,getParcipiantByName } from "../servFunctions/parcipiantFunctions";
import UserSearchBarComponent from '../components/UserSearchBarComponent'
import ParcipiantSearchBarComponent from "../components/ParcipiantSearchBarComponent";
import {io} from 'socket.io-client'

const RoomData=()=>{
    const socket=io('http://localhost:5050/')
    const {id}=useParams()
    const [parcipiants,setParcipiants]=useState([])
    const [userData,setUserData]=useState({})
    const [isErr,setIsErr]=useState(false)
    const [searchingNick,setSearchedNick]=useState('')
    const [findedParcipiants,setFindedParcipiants]=useState([])
    const [isLoading,setIsloading]=useState(true)
    useEffect(()=>{
        
        get10ParcipiantByChatId(id,setParcipiants,setIsErr)
        getParcipiantByUserIdAndChatId(localStorage.getItem('userID'),id,setUserData,setIsErr,setIsloading) 
    },[])  

    useEffect(()=>{
        if(searchingNick.length>=4){
            getParcipiantByName(searchingNick,setFindedParcipiants,id)
        }else{
            setFindedParcipiants([])
        }
    },[searchingNick])

    const deleteParcipiantCB=(i,username)=>{
        socket.emit('delelteParcipiant',i,id)
        socket.emit('joinRoomNotification',Date.now(),id,username,false)
        setParcipiants(parcipiants.filter((p)=>{
            if(p._id!=i) return p
        }))
    }



    return(
        <div>
            {isLoading?
                <></>
            :
                <>
                    {isErr?
                        <></>    
                    :
                        <div>
                            <div>
                                <input style={{width:"20%",border:"3px solid blue",borderRadius:"9px",padding:"5px",margin:"0px auto"}} value={searchingNick} onChange={(e)=>setSearchedNick(e.target.value)}/><br/>
                                <div style={{margin:"0px auto",maxWidth:"100%",height:"80%"}}>
                                    <div style={{height:"40vw",overflow:"auto"}}>
                                        {searchingNick.length>=4?
                                            <>
                                                {findedParcipiants.map((p)=>
                                                    <div  key={p._id}> 
                                                        <ParcipiantSearchBarComponent deleteCB={deleteParcipiantCB} data={p} userIsAdmin={userData.isAdmin} userIsOwner={userData.isOwner} id={p.userId}/>
                                                    </div>
                                                )} 
                                            </>
                                        :
                                            <>
                                            {parcipiants.map((p)=>
                                                <div key={p._id}>
                                                    <ParcipiantComponent data={p} userIsOwner={userData.isOwner} userIsAdmin={userData.isAdmin}  deleteCB={deleteParcipiantCB}/>
                                                </div>
                                            )}
                                            </>
                                        }
        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    }
                </>
            }
            
            
        </div>
    )
}

export default RoomData