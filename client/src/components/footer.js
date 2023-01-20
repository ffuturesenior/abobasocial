import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const Footer=()=>{
    const isAuth=useSelector(state=>state.user.isAuth)
    const id=localStorage.getItem('userID')
    const router = useHistory()
   
    return(
        <div>
            <div style={{background:"black",padding:"20px 100px",display:"flex",justifyContent:'center',alignItems:"center"}}>
                    {isAuth?
                    <>
                        <NavLink to={`/`}><p style={{color:"white",margin:"0px 5px"}}>chats</p></NavLink>
                        {/*<NavLink to='/chats'><p style={{color:"white",margin:"0px 5px"}}>chats</p></NavLink>*/}
                        <NavLink to='/globalpage'><p style={{color:"white",margin:"0px 5px"}}>globalpage</p></NavLink>
                        <NavLink to='/createPostPage'><p style={{color:"white",margin:"0px 5px"}}>createPost</p></NavLink>
                        <NavLink to={`/userprofile/${id}`}><p style={{color:"white",margin:"0px 5px"}}>mYprofile</p></NavLink>
                    </>
                    :
                        <>
                           
                        </>
                    }
            </div>
        </div>
    )

}

export default Footer