import dotenv from "dotenv";
import { Server } from 'socket.io';
import db from './db.js';

dotenv.config();
function configureSocket(server) {

  const connectedUsers = new Map();
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST"],
      credentials: true
    },
    path: "/socket.io"
  });

  io.on('connection', (socket) => {
    
    socket.on('user_connected', (username) => {
      connectedUsers.set(socket.id, username);
      console.log(`${username} connected succesfully with socket.id: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      const username = connectedUsers.get(socket.id);
      if(username){
        connectedUsers.delete(socket.id);
        console.log(`${username} disconnected`);
      }
    });

    io.engine.on("connection_error", (err) => {
      console.log(err.req);      // the request object
      console.log(err.code);     // the error code, for example 1
      console.log(err.message);  // the error message, for example "Session ID unknown"
console.log(err.context);  // some additional error context
    });

    function notifyUser(username, invitation) {
      const userSocketId = connectedUsers.get(username);
      if(userSocketId){
        io.to(userSocketId).emit('new_invitation', invitation);
      }
    }
  }); 

}

export default configureSocket;
