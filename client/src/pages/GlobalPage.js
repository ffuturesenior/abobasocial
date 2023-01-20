import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
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
    const [isErr,setIsErr]=useState(false)
    const [postScrollHeight,setPostScrollHeight]=useState()
    useEffect(()=>{
        getPostsReq(setPosts,setIsErr,setIsLoading)
    },[])

    //var postScrollHeight;

    useEffect(()=>{
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
                            <div style={{textAlign:'center'}}>
                                <Link to='/usersearch'>user search</Link>
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