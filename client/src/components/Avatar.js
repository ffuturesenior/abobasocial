import React from "react";


const Avatar=({avatar,height,width})=>{
    var base64String;
    //console.log(avatar)
    if(!avatar||avatar==" "){
    }else{
        base64String = btoa(
            String.fromCharCode(...new Uint8Array(avatar.data.data))
        );
    }
        return(
        <div>
            {!avatar||avatar==" "?
                <div style={{border:"1px solid black",borderRadius:"90px",overflow:"hidden",width:`${width}px`,height:`${height}px`,background:"black"}}></div>   
            :
                <div style={{position:"relative",left:"0px",overflow:"hidden",border:"1px solid black",borderRadius:"90px",width:`${width}px`,height:`${height}px`}}>
                    <img style={{position:"absolute",left:"0px",height:"100%",width:"100%",objectFit:"cover"}}  src={base64String} width="300"/>
                </div>
            }
        </div>
    )
}

export default Avatar