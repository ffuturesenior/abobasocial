import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const Header=()=>{
    const isAuth=useSelector(state=>state.user.isAuth)
    const id=localStorage.getItem('userID')
    const router = useHistory()
    return(
        <div style={{background:"black"}}>
            <div style={{padding:"10px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                    <NavLink to='/'><p style={{fontSize:"20px",color:"white"}}>ABOBA</p></NavLink>
                </div>
                <div style={{display:'flex',justifyContent:"space-between"}}>
                    {isAuth?
                    <>
                        {/*<NavLink to={`/userprofile/${id}`}><p style={{color:"white",margin:"0px 5px"}}>MyProfile</p></NavLink>*/}
                        <NavLink to='/registration'><p style={{color:"white",margin:"0px 5px"}}>Registration</p></NavLink>
                        <NavLink to='/login'><p style={{color:"white",margin:"0px 5px"}}>Login</p></NavLink>
                    </>
                    :
                        <>
                            <NavLink to='/registration'><p style={{color:"white",margin:"0px 5px"}}>Registration</p></NavLink>
                            <NavLink to='/login'><p style={{color:"white",margin:"0px 5px"}}>Login</p></NavLink>
                        </>
                    }
                </div>
            </div>
        </div>
    )

}

export default Header