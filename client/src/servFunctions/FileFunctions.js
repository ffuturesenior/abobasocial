import axios from 'axios'


const site_url=`http://localhost:5000/aboba`

export async function createFileReq(sp,string){
    try{
        const res=await axios.post(`${site_url}/file/`,{
            data:string,
            specialId:sp
        })
    }catch(e){
        console.log(e)
    }
}

export async function getFileReq(id,setFunc,setIsLoading){
    try{
        setIsLoading(true)
        const res=await axios.get(`${site_url}/file/${id}`)
        setFunc(res.data)
        setIsLoading(false)
    }catch(e){
        console.log(e)
    }
}
