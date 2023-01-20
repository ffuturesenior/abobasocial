const SET_USER="SET_USER"
const LOGOUT="LOGOUT"

const defaultState={
    currentUser:{

    },
    isAuth:false
}


export default function userReducer(state=defaultState,action){
    switch(action.type){
        case SET_USER:
            return{
                ...state,
                currentUser:action.payload.user,
                isAuth:true,
                isAdmin:action.payload.admin
            }
        case LOGOUT:
            //localStorage.removeItem('token'),
            localStorage.removeItem('userID')
            return{
                ...state,
                currentUser:{},
                isAuth:false,
                
            }
        default:
            return state
    }
}


export const setUser= user=>({type:SET_USER,payload:user})
export const logout= ()=>({type:LOGOUT})