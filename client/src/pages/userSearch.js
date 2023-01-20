import React,{useEffect,useState} from "react";
import { getUserByName } from "../servFunctions/functions";
import UserSearchBarComponent from "../components/UserSearchBarComponent";


const UserSearch=()=>{

    const [findedUsers,setFindedUsers]=useState([])
    const [searchingNick,setSearchedNick]=useState('')

    
    useEffect(()=>{
        if(searchingNick.length>=4){
            getUserByName(searchingNick,setFindedUsers)
        }else{
            setFindedUsers([])
        }
    },[searchingNick])


    return(
        <div>
            <div style={{maxWidth:"304px",margin:"0px auto",position:'relative',zIndex:"1px"}}>
                <input style={{width:"80%",border:"3px solid blue",borderRadius:"9px",padding:"5px",margin:"0px auto"}} value={searchingNick} onChange={(e)=>setSearchedNick(e.target.value)}/>
                <div style={{margin:"0px auto",maxWidth:"304px",height:"20%"}}>
                    <div aria-labelledby="dropdownMenuLink" style={{maxHeight:"300px",overflow:"auto"}}>
                        {findedUsers.map((p)=>
                            <div  key={p._id}> 
                                <UserSearchBarComponent p={p}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSearch