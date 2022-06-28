import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "./Avatar";


const UserSearchBarComponent=({p})=>{

    const router=useHistory()
    //console.log(p)

    return(
        <>
            <div style={{display:"flex",justifyContent:'space-between',alignItems:"center",borderBottom:"1px solid grey"}}>
                <div onClick={()=>router.push(`/userprofile/${p._id}`)} style={{display:"flex",alignItems:"center",padding:"7px 5px",cursor:'pointer'}}>
                    <Avatar height={40} width={40} avatar={p.avatar}/><p>{p.username}</p>
                </div>
            </div>
        </>
    )
}

export default UserSearchBarComponent