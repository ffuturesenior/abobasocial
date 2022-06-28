import React,{useCallback, useContext, useState} from "react";
import { login } from "../servFunctions/functions";
import {useDispatch} from 'react-redux'
import { logout } from "../redux/userReducer";
import { useSelector } from "react-redux";

const Login=()=>{
 
    const [userFormData,setUserFormData]=useState({
        username:"",
        email:"",
        password:"",
        
    })
    const isAuth=useSelector(state=>state.user.isAuth)
    const dispatch=useDispatch()
    const submitForm=(e)=>{
        e.preventDefault()
        const emailWithNoWhitespace = userFormData.email.replace(/\s/g, '')
        dispatch(login(userFormData,emailWithNoWhitespace))
    }
    const unlog=()=>{
        dispatch(logout())
        localStorage.removeItem('userID')
    }

    return(
        <div style={{textAlign:"center"}}>
            login
            <div>
                <form>
                    <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}} type="text" value={userFormData.username} onChange={(e)=>{setUserFormData({...userFormData,username:e.target.value})}} placeholder="username"/><br/>
                    <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}} type="text"  value={userFormData.email} onChange={(e)=>{setUserFormData({...userFormData,email:e.target.value})}} placeholder="email"/><br/>
                    <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}} type="password"  value={userFormData.password} onChange={(e)=>{setUserFormData({...userFormData,password:e.target.value})}} placeholder="password"/><br/>
                    <button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={submitForm}>submit</button>
                </form>              
                {isAuth?
                    <><button style={{display:"inline-block",border:"1px solid black",borderRadius:"10px",padding:"5px",margin:"5px 0px"}} onClick={unlog}>log out</button><br/></>
                :
                    <></>
                }
            </div>
        </div>
    )
}

export default Login