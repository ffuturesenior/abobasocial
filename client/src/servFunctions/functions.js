import axios from 'axios'
import { useContext } from 'react'
import { dispatch } from 'redux-thunk'
import { AdminContext } from '..'
import { setUser } from '../redux/userReducer'

const site_url=`http://localhost:5000/aboba`
//https://abobasocial-server-dbsync.herokuapp.com/aboba

export async function registrate(e,emailWithNoWhitespace,userData){
    e.preventDefault()
    try{
        if(!userData.email||!userData.username||!userData.password){
            return res.status(400).alert("bad request")
        }
        const res= await axios.post(`${site_url}/users/registrate`,{
            username:userData.username,
            email:emailWithNoWhitespace,
            pswd:userData.password,
            //admin:false,
            caption:" ",
            avatar:0

        })
        alert("created")
    }catch(e){
        alert(e.response.data.message)
    }
}

export const login=(userData,emailWithNoWhitespace,)=>{
    
    return async dispatch=>{
        try{
            if(!userData.email||!userData.username||!userData.password){
                return res.status(400).alert("bad request")
            }
            const res= await axios.post(`${site_url}/users/login`,{
                username:userData.username,
                email:emailWithNoWhitespace,
                pswd:userData.password,
                //admin:false,
                caption:" ",
                avatar:" "
            })
            dispatch(setUser(res.data.user))
            localStorage.setItem('userID',res.data.user._id)
            //setIsAdmin(res.data.user.admin)
            //console.log(res.data)
            alert("logined")
        }catch(e){
            alert(e.response.data.message)
        }       
    }

}

export const rehost=()=>{
        return async dispatch=>{
            try{
                const res= await axios.get(`${site_url}/users/auth/${localStorage.getItem('userID')}`)
                dispatch(setUser(res.data.user))
                localStorage.setItem('userID',res.data.user._id)
                //console.log(res.data)
                //alert("logined")
            }catch(e){
                console.log(e)
                
                localStorage.removeItem('userID')
            }       
        }
}


export async function getUser(id,setFunc,setIsErr,setPrevData,setIsLoading){
    if(id!=undefined||id!=null){
        try{
            setIsLoading(true)
            //console.log(` legendary id :${id}`)
            const res= await axios.get(`${site_url}/users/${id}`)
            setFunc(res.data)
            setPrevData({
                username:`${res.data.username}`,
                caption:`${res.data.caption}`
            })
            //alert("logined")
            setIsLoading(false)
        }catch(e){
            setIsErr(true)   
            console.log(e)     
        }
    }    
    
}



export async function  redactUserCaption(id,entryData){
    try{
        //const prevData=await axios.get(`${site_url}/users/${id}`)

        const res= await axios.put(`${site_url}/users/updateCaption/${id}`,{caption:entryData})
        alert("caption redacted")
    }catch(e){
        console.log(e)     
    }
}

export async function  redactUserAvatar(id,sp){
    try{
       // const prevData=await axios.get(`${site_url}/users/${id}`)

        const res= await axios.put(`${site_url}/users/update/${id}`,{avatar:sp})
        alert("avatar redacted")
    }catch(e){
        console.log(e)     
    }
}


export async function  redactUsername1(id,username){
    try{
        const res= await axios.put(`${site_url}/users/updateByName/${id}&:${username}`,{username:username})
        alert("username redacted")
    }catch(e){
        console.log(e)     
    }
}




export async function getUserAvatar(userID,setFunc){
    try{
        const avatar = await axios.get(`${site_url}/avatar/${userID}`)
        setFunc(avatar.data.image)

    }catch(error){
        console.log(error)
    }
}


/*/users/byName/:name*/

export async function getUserByName(name,setFunc){
    try{
        const res = await axios.get(`${site_url}/users/byName/${name}`)
        setFunc(res.data)

    }catch(error){
        console.log(error)
    }
}
