import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Avatar from "../components/Avatar.js";
import PostFromUserPage from "../components/PostFromUserPage.js";
import { getUser, getUserAvatar, redactUserAvatar, redactUserCaption, redactUsername1 } from "../servFunctions/functions";
import { getP2PChat,createP2PChat } from "../servFunctions/p2pChatFunctions";
import { getUserPostsReq } from "../servFunctions/postFunctions";
import { getSubscribers, getSubscribes, subscribeCheck, subscribeReq, unsubscribeReq } from "../servFunctions/subscribeFunctions";
import '../css/UserProfile.css'

const UserProfile=()=>{
    const router=useHistory()
    const {id}=useParams()
    const [userData,setUserData]=useState({
        username:"",
        caption:"",
        avatar:""
    })
    const [isErr,setIsErr]=useState(false)
    const [isOwnProfile,setIsOwnProfile]=useState(false)
    const [redactToggle,setReactToggle]=useState(false)
    const [redactData,setRedactData]=useState({
        username:`${userData.username}`,
        caption:`${userData.caption}`,
        avatar:``
    })
    const [isSubscribed,setIsSubscribed]=useState(false)
    const [subscirbtionId,setSubscriptionId]=useState()
    const [subscribersLength,setSubscribersLength]=useState(0)
    const [subscribesLength,setSubscribesLength]=useState(0)
    const [p2pChatId,setP2pChatId]=useState([])
    const [userPosts,setUserPosts]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [postScrollHeight,setPostScrollHeight]=useState()
    const [gridBoolean,setGidBoolean]=useState('')
    const [newChat,setNewChat]=useState({})
    useEffect(()=>{
        setIsLoading(true)
        getUser(id,setUserData,setIsErr,setRedactData,setIsLoading)
        subscribeCheck(localStorage.getItem('userID'),id,setIsSubscribed,setSubscriptionId)
        getSubscribers(id,setSubscribersLength)
        getSubscribes(id,setSubscribesLength)
        getUserPostsReq(id,setUserPosts,setIsErr,setIsLoading)
        //getP2PChat(localStorage.getItem('userID'),id,setP2pChatId,setIsErr).then(setIsLoading(false))
        if(id==localStorage.getItem('userID')){
            setIsOwnProfile(true)
        }
        
    },[])

  
  

    const formData=new FormData()

    const fileHandler=(e)=>{
        const avatar=e.target.files[0]
        formData.append('avatar',avatar)
    }

    const redactUsername=()=>{
       // formData.append("username",redactData.username)
        //formData.append('caption',redactData.caption)
        //console.log(redactData.avatar)
        if(redactData.username.length>=4){
            redactUsername1(id,redactData.username)
            //formData.delete('caption')
            //formData.delete('avatar')
        }else{
            alert('short nickname')
        }
        
    }


    const toChat=()=>{
        getP2PChat(localStorage.getItem('userID'),id,setP2pChatId,setIsErr)
    }

    useEffect(()=>{
        
        if(p2pChatId.length>0){
            console.log('redirectig')
            router.push(`/p2pchat/${p2pChatId[0]._id}&${id}`)
        }else{
            console.log('creating new')
            if(localStorage.getItem('userID')!=id){
                createP2PChat(localStorage.getItem('userID'),id) 
            }
             
        }
    },[p2pChatId])

    useEffect(()=>{
        if(Object.keys(newChat).length>0){ 
            console.log('redirecting to new')
            router.push(`/p2pchat/${newChat}&${id}`)
        }
    },[newChat])

    const redactCaption=()=>{
        if(redactData.caption.length>1){
            redactUserCaption(id,redactData.caption)
        }
    }

    const redactAvatar=()=>{
        redactUserAvatar(id,formData)
    }

    const subscribe=()=>{
        subscribeReq(localStorage.getItem('userID'),id).then(setIsSubscribed(true)).then(setSubscribersLength(subscribersLength+1))
    }

    const unsubscribe=()=>{
        unsubscribeReq(subscirbtionId).then(setIsSubscribed(false)).then(setSubscribersLength(subscribersLength-1))

    }
    return(
        <div style={{height:'100%'}}>
            {isLoading?
                <>loading</>
                :
                <>
                     <div style={{height:'100%'}}>
                        {isErr?
                            <div>err</div>
                        :
                            <div style={{height:'100%'}}>
                                <div className="UserProfile-firstBlock">
                                    <div>
                                        <Avatar height={110} width={110} avatar={userData.avatar}/><br/>
                                        <p style={{margin:"0px 20px"}}>{userData.caption==undefined||" "?<>no caption</>:<>{userData.caption}</>}</p>
                                    </div>
                                    
                                    <div>
                                        <strong>{userData.username}</strong>
                                        {isOwnProfile? <><button className="whiteBtn" onClick={(e)=>router.push('/redactMyProfile')}> redact profile</button></>:<></>}
                                    </div>
                                    <button className="whiteBtn" onClick={()=>{router.goBack()}}>back</button>
                                    
                                    
                                    <div>
                                    <br/>
                                   
                                    {isOwnProfile?
                                        <div>
                                        </div>
                                    :
                                        <div>
                                            <div>
                                                    {isSubscribed?
                                                        <>
                                                            <div>
                                                                <button className="whiteBtn" onClick={toChat}>to chat</button>|
                                                                <button className="whiteBtn" onClick={unsubscribe}>unsubscribre</button>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <button  className="subscribe_btn" onClick={subscribe}>subscribe</button>
                                                        </>
                                                    }
                                                </div>
                                        </div>
                                    }
                                    </div>
                                </div>
                                
                                <div style={{height:'75%'}}>
                                    <div  className="UserProfile-SecondBlock">
                                        <div>posts:{userPosts.length}</div>
                                        <div>subs:<br/>{subscribersLength}</div>
                                        <div>following:<br/>{subscribesLength}</div>
                                    </div> 
                                    <div style={{ margin:'0px auto',maxWidth:'299px',overflow:'auto',height:"90%"}}>
                                        {userPosts?
                                            <>
                                                {userPosts.map((p)=>
                                                    <div key={p._id}>
                                                        <PostFromUserPage key={p._id} p={p}/>
                                                    </div>
                                                )}
                                            </>
                                            :
                                            <>no posts yet</>
                                        }
                                        
                                    </div> 
                                </div>
                               
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default UserProfile