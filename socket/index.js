import { Server } from "socket.io";
import dotenv from 'dotenv/config'
import cors from 'cors'

const PORT=process.env.PORT||5050
const io = new Server(PORT,{cors: {
    origin: "*",
      
}});




io.on("connection", (socket) => {
  
    var socketID=socket.id
    socket.emit('userConnected',{socketID})
    socket.on('sendMsg',(specialId,userId,text,chatId)=>{
    //  console.log(`msg text:${text}`)
      if(chatId==""){
          //console.log('msg func 1')
          socket.broadcast.emit('getMsg',{
            specialId,
            userId,
            chatId,
            text
        })
      }else{
        //console.log(`msg func2`)
          socket.to(chatId).emit('getMsg',{
            specialId,
            userId,
            chatId,
            text
        })
      }
  })


  socket.on('deleteMsg',(room,i)=>{
    socket.to(room).emit('getDeletedMsg',i)
  })  


  socket.on('joinRoom',(room)=>{
    //console.log(`room id:${room}`)
    socket.join(room)
    io.to(socket.id).emit('activeRoom',room)
  })

  socket.on('startedWriting',(username,roomId,userId)=>{
   socket.to(roomId).emit('recieveNewWriters',username,userId)
  })

  socket.on('stoppedWriting',(username,roomId,userId)=>{
    socket.to(roomId).emit('recieveCanceledWriters',username,userId)
  })

  socket.on('setLastMsgSeen',(roomId,userId)=>{
    socket.to(roomId).emit('recieveLastMsgSeen',userId)
  })


  socket.on('delelteParcipiant',(userId,roomId)=>{
    socket.to(roomId).emit('recieveDeletedParcipiant',userId)
  })
  //promoteUser
  socket.on('promoteUser',(userId,roomId)=>{
    socket.to(roomId).emit('recievePromotedUser',userId)
  })

  socket.on('disableAdminUser',(userId,roomId)=>{
    socket.to(roomId).emit('receiveDisableAdminUser',userId)
  })
  
});
