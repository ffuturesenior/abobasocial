import React, { useEffect, useState } from "react";
import { getFileReq } from "../servFunctions/FileFunctions";
import Loader from "./Loader";
import img from '../static/b478a67b9f6bcd4841762c352f9e494e.jpeg'

const Avatar=({avatar,height,width})=>{
    const src='../static/b478a67b9f6bcd4841762c352f9e494e.jpeg'
    const [isLoading,setIsLoading]=useState(true)
    const [isError,setIsError]=useState(false)
    const [file,setFile]=useState({})
    useEffect(()=>{
        if(avatar==undefined||avatar==0){
            setIsLoading(false)
        }else{
            getFileReq(avatar,setFile,setIsLoading)
        }
    },[])



    return(
        <div>
            {isLoading?
                <Loader/>
            :
                <>
                    {avatar==0?
                    <>
                        <div style={{position:"relative",left:"0px",overflow:"hidden",border:"1px solid black",borderRadius:"90px",width:`${width}px`,height:`${height}px`}}>
                            <img style={{position:"absolute",left:"0px",height:"100%",width:"100%",objectFit:"cover"}}  src={require("../static/b478a67b9f6bcd4841762c352f9e494e.jpeg")} width="300"/>
                        </div>
                    </>
                        
                    :
                        <div style={{position:"relative",left:"0px",overflow:"hidden",border:"1px solid black",borderRadius:"90px",width:`${width}px`,height:`${height}px`}}>
                            <img style={{position:"absolute",left:"0px",height:"100%",width:"100%",objectFit:"cover"}}  src={file.data} width="300"/>
                        </div>
                    }
                </>
            }
            
        </div>
    )
}

export default Avatar