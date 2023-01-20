import axios from 'axios'


const site_url=`http://localhost:5000/aboba`


export async function getComments(postId,setFunc,setIsLoading,setIsErr){
    try{
        setIsLoading(true)
        const res=await axios.get(`${site_url}/comments/byPost/${postId}`)
        setFunc(res.data)
        setIsLoading(false)
    }catch(e){
        setIsErr(true)
        console.log(e)
    }
}



export async function deleteCommentReq(id){
    try{
        const res=await axios.delete(`${site_url}/comments/${id}`)
    }catch(e){
        console.log(e)
    }
}



export async function leaveCommentReq(text,postId,sp){
    try{
        
        const res=await axios.post(`${site_url}/comments`,{
            userId:localStorage.getItem('userID'),
            text:text,
            postId:postId,
            specialId:sp
        })
        
    }catch(e){
        console.log(e)
    }
}


