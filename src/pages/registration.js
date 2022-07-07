import React, { useState,useContext } from "react";
import { registrate } from "../servFunctions/functions";
import { login } from "../servFunctions/functions";
import {useDispatch} from 'react-redux'
import { useSelector } from "react-redux";

const Registration=()=>{
    const isAuth=useSelector(state=>state.user.isAuth)
    const [userFormData,setUserFormData]=useState({
        username:"",
        email:"",
        password:""
    })
    
    const dispatch=useDispatch()
    const reg=(e)=>{
        e.preventDefault()
        const emailWithNoWhitespace = userFormData.email.replace(/\s/g, '')
        registrate(e,emailWithNoWhitespace,userFormData).then(()=>{
            if(!isAuth){
                dispatch(login(userFormData,emailWithNoWhitespace))
            }
        })
    }


    return(
        <div style={{textAlign:"center"}}>
            Registration

            <div>
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
                <button type="submit" onClick={reg} class="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default Registration