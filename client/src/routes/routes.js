import Login from '../pages/login'
import registration from '../pages/registration'
import Registration from '../pages/registration'
import UserProfile from '../pages/userProfile'
import Admin from '../pages/admin'
import GlobalPage from '../pages/GlobalPage'
import Chats from '../pages/Chats'
import Room from '../pages/Room'
import CreatePostPage from '../pages/CreatePostPage'
import PostPage from '../pages/postPage'
import P2pChat from '../pages/p2pChat'
import CreateRoomPage from '../pages/createRoomPage'
import JoinRoom from '../pages/joinRoom'
import RoomData from '../pages/roomData'
import RedactProfilePage from '../pages/RedactProfile'
import UserSearch from '../pages/userSearch'

export const publicRoutes=[
    {path:'/login',Component:Login},
    {path:'/registration',Component:Registration}
]


export const userRoutes=[
    {path:'/login',Component:Login},
    {path:'/registration',Component:Registration},
    {path:'/userprofile/:id',Component:UserProfile},
    {path:'/globalpage',Component:GlobalPage},
    {path:'/',Component:Chats},
    {path:'/p2pChat/:id&:opponent',Component:P2pChat},
    {path:'/room/:id',Component:Room},
    {path:'/createPostPage',Component:CreatePostPage},
    {path:'/post/:id&:userId&:specialId',Component:PostPage},
    {path:'/createRoom',Component:CreateRoomPage},
    {path:"/joinroom",Component:JoinRoom},
    {path:'/roomdata/:id',Component:RoomData},
    {path:"/redactMyProfile",Component:RedactProfilePage},
    {path:"/usersearch",Component:UserSearch}
]




