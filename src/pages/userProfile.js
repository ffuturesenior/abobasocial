import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Avatar from "../components/Avatar.js";
import PostFromUserPage from "../components/PostFromUserPage.js";
import { getUser, getUserAvatar, redactUserAvatar, redactUserCaption, redactUsername1 } from "../servFunctions/functions";
import { getP2PChat,createP2PChat } from "../servFunctions/p2pChatFunctions";
import { getUserPostsReq } from "../servFunctions/postFunctions";
import { getSubscribers, getSubscribes, subscribeCheck, subscribeReq, unsubscribeReq } from "../servFunctions/subscribeFunctions";


const UserProfile=()=>{
    const router=useHistory()
    const {id}=useParams()
    const [userData,setUserData]=useState({
        username:"",
        caption:"",
        avatar:""
    })
    const [isErr,setIsErr]=useState(true)
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
    useEffect(()=>{
        setIsLoading(true)
        getUser(id,setUserData,setIsErr,setRedactData)
        subscribeCheck(localStorage.getItem('userID'),id,setIsSubscribed,setSubscriptionId)
        getSubscribers(id,setSubscribersLength)
        getSubscribes(id,setSubscribesLength)
        getUserPostsReq(id,setUserPosts,setIsErr)
        getP2PChat(localStorage.getItem('userID'),id,setP2pChatId,setIsErr).then(setIsLoading(false))
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
        setIsLoading(true)
        getP2PChat(localStorage.getItem('userID'),id,setP2pChatId,setIsErr)
        if(p2pChatId.length>=1){
            router.push(`/p2pchat/${p2pChatId[0]._id}&${id}`)
        }
        if(p2pChatId.length==0){
            setIsLoading(true)
            createP2PChat(localStorage.getItem('userID'),id)
            setTimeout(()=>{
                getP2PChat(localStorage.getItem('userID'),id,setP2pChatId,setIsErr)
                setTimeout(()=>{
                    router.push(`/p2pchat/${p2pChatId[0]._id}&${id}`)
                },[2000])
                setIsLoading(false)
            },[2000])
           // getP2PChat(localStorage.getItem('userID'),id,setP2PChatId,setIsErr).then(console.log(p2pChatId[0]._id))
            //setIsLoading(false)
           // router.push(`/p2pchat/${p2pChatId[0]._id}&${id}`)
        }
    }

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
        <>
            {isLoading?
                <>loading</>
                :
                <>
                     <div style={{padding:"10px",maxWidth:"900px",margin:"0px auto"}}>
                        {isErr?
                            <div>err</div>
                        :
                            <div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <strong style={{fontSize:"25px"}}>{userData.username}</strong>
                                    <div style={{display:"flex"}}>
                                        <p style={{margin:"0px 5px",textAlign:"center"}}>subs:<br/>{subscribersLength}</p>
                                        <p style={{margin:"0px 5px",textAlign:'center'}}>following:<br/>{subscribesLength}</p>
                                    </div>
                                    <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={()=>{router.goBack()}}>back</button>
                                </div>
                                
                                <Avatar height={100} width={100} avatar={userData.avatar}/>
                                <br/>
                                <br/>
                                <p style={{fontSize:"20px"}}>{userData.caption==undefined?<></>:<>{userData.caption}</>}</p>
                                <div>
                                {isOwnProfile?
                                    <div>
                                        <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={(e)=>router.push('/redactMyProfile')}> redact profile</button>
                                        {/*redactToggle?
                                            <div>
                                                {/*<input style={{border:"1px solid black"}} value={redactData.username} onChange={(e)=>{setRedactData({...redactData,username:e.target.value})}}/><button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={redactUsername}>change name</button><br/>}
                                                <input style={{border:"1px solid black"}} value={redactData.caption} onChange={(e)=>{setRedactData({...redactData,caption:e.target.value})}}/><button onClick={redactCaption}>change caption</button><br/>
                                                <input style={{border:"1px solid black"}} type="file"  onChange={fileHandler}/>
                                                <button style={{border:"1px solid black",borderRadius:"5px",padding:"5px"}} onClick={redactAvatar}> put</button>
                                            </div>
                                        :
                                            <></>
                                        */}
                                    </div>
                                :
                                    <div>
                                        <div>
                                                {isSubscribed?
                                                    <>
                                                        <div style={{display:'flex'}}>
                                                            <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"0px 5px"}} onClick={toChat}>to chat</button>
                                                            <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"0px 5px"}} onClick={unsubscribe}>unsubscribre</button>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"0px 5px"}} onClick={subscribe}>subscribe</button>
                                                    </>
                                                }
                                            </div>
                                    </div>
                                }
                                </div>

                                <div style={{height:"50%"}}>
                                    <div style={{maxHeight:"320px",display:"grid",justifyContent:'center',overflow:"auto",gridTemplateColumns:"repeat(auto-fit,290px)",gridTemplateRows:"repeat(auto-fit,300)"}}>
                                        {userPosts?
                                            <>
                                            {userPosts.map((p)=>
                                                <div style={{width:"290px",margin:"0px auto"}}>
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
        </>
    )
}

export default UserProfile