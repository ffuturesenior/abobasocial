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
        <div style={{textAlign:"center",flex:'1 1 auto'}}>
            login
            <div>
                         
                {isAuth?
                    <><button className="btn btn-primary" onClick={unlog}>log out</button><br/></>
                :
                    <>
                        {/*<form>
                            <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}} type="text" value={userFormData.username} onChange={(e)=>{setUserFormData({...userFormData,username:e.target.value})}} placeholder="username"/><br/>
                            <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}} type="text"  value={userFormData.email} onChange={(e)=>{setUserFormData({...userFormData,email:e.target.value})}} placeholder="email"/><br/>
                            <input style={{display:"inline-block",border:"2px solid blue",borderRadius:"20px",padding:"15px",margin:"5px 0px"}} type="password"  value={userFormData.password} onChange={(e)=>{setUserFormData({...userFormData,password:e.target.value})}} placeholder="password"/><br/>
                            <button  className="btn btn-primary" onClick={submitForm}>submit</button>
                        </form>*/}
                        <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Username</label>
                            <input type="email" value={userFormData.username} onChange={(e)=>{setUserFormData({...userFormData,username:e.target.value})}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" class="form-text">min4 max 15</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input value={userFormData.email} onChange={(e)=>{setUserFormData({...userFormData,email:e.target.value})}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input onChange={(e)=>{setUserFormData({...userFormData,password:e.target.value})}} type="password" class="form-control" id="exampleInputPassword1"/>
                            <div id="passwordHelp" class="form-text">min4 max 15</div>
                        </div>
                        <button type="submit" onClick={submitForm} class="btn btn-primary">Submit</button>
                        </form>
                    </>
                }
            </div>
        </div>
    )
}

export default Login