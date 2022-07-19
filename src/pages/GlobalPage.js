import React, { useEffect,useState } from "react";
import Loader from "../components/Loader";
import Post from "../components/Post";
import UserSearchBarComponent from "../components/UserSearchBarComponent";
import { getUserByName } from "../servFunctions/functions";
import { getPostsReq } from "../servFunctions/postFunctions";


const GlobalPage=()=>{
    const [posts,setPosts]=useState([])
    const [findedUsers,setFindedUsers]=useState([])
    const [searchingNick,setSearchedNick]=useState('')
    const [isLoading,setIsLoading]=useState(true)
    const [isErr,setIsErr]=useState(true)
    const [postScrollHeight,setPostScrollHeight]=useState()
    useEffect(()=>{
        getPostsReq(setPosts,setIsErr).then(setIsLoading(false))
    },[])

    //var postScrollHeight;

    useEffect(()=>{
        console.log(window.innerHeight)
        var intViewportHeight = window.innerHeight;
        setPostScrollHeight(intViewportHeight*0.75)
    },[window.innerHeight])

    useEffect(()=>{
        if(searchingNick.length>=4){
            getUserByName(searchingNick,setFindedUsers)
        }else{
            setFindedUsers([])
        }
    },[searchingNick])

    return(
        <div style={{maxHeight:"100%",overflow:"hidden"}}>
            {isLoading?
                <><Loader/></>
            :
                <>
                    {isErr?
                        <></>
                    :
                        <>
                             <div  style={{maxWidth:"304px",margin:"0px auto",position:'relative',zIndex:"1px"}}>
                                <input style={{width:"80%",border:"3px solid blue",borderRadius:"9px",padding:"5px",margin:"0px auto"}} value={searchingNick} onChange={(e)=>setSearchedNick(e.target.value)}/>
                                <div style={{margin:"0px auto",maxWidth:"304px",height:"10%"}}>
                                <div aria-labelledby="dropdownMenuLink" style={{maxHeight:"60px",overflow:"auto"}}>
                                    {findedUsers.map((p)=>
                                        <div  key={p._id}> 
                                            <UserSearchBarComponent p={p}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                            </div>
                            <div style={{margin:"0px auto",maxWidth:"304px",height:"80%",position:'relative',zIndex:"0px"}}>
                                <div style={{maxHeight:`${postScrollHeight}px`,overflow:"auto"}}>
                                    {posts.map((p)=>
                                        <div  key={p._id} style={{margin:"2px 0px"}}>
                                            <Post  p={p}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </div>
        
    )
}

export default GlobalPage;