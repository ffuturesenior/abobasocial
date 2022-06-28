import React from "react";


const Avatar=({avatar,height,width})=>{
    return(
        <div>
            {avatar!=" "?
                <div style={{position:"relative",border:"1px solid black",borderRadius:"45px",width:`${width}px`,height:`${height}px`}}><img style={{position:"absolute",height:"100%",width:"100%",objectFit:"cover"}} src={`https://abobasocial-server-dbsync.herokuapp.com/${avatar}`}/></div>
            :
                <div style={{border:"1px solid black",borderRadius:"45px",overflow:"hidden",width:`${width}px`,height:`${height}px`,background:"black"}}></div>
            }
        </div>
    )
}

export default Avatar