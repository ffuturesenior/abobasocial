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
                    <div className="mb-3">
                        <label  className="form-label">Username</label>
                        <input type="email" value={userFormData.username} onChange={(e)=>{setUserFormData({...userFormData,username:e.target.value})}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">min4 max 15</div>
                    </div>
                    <div className="mb-3">
                            <label  className="form-label">Email address</label>
                            <input value={userFormData.email} onChange={(e)=>{setUserFormData({...userFormData,email:e.target.value})}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input onChange={(e)=>{setUserFormData({...userFormData,password:e.target.value})}} type="password" className="form-control" id="exampleInputPassword1"/>
                        <div id="passwordHelp" className="form-text">min4 max 15</div>
                    </div>
                    <button type="submit" onClick={reg} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Registration