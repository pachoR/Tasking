import env from "dotenv";
import { Server } from 'socket.io';
import db from './db.js';

function configureSocket(server) {

  const connectedUsers = new Map();

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('connect_user', async (user_id) => {
      connectedUsers.set(user_id, socket.id);
      console.log(`connect_user ${user_id}`);

      try {
        const pending_invitations = (await db.query('SELECT * FROM user_invitations WHERE user_id = $1', [user_id])).rows;

        if(pending_invitations){
          pending_invitations.forEach((invitation) => {
            socket.emit('invitationNotification', {
              user_id: invitation.user_id,
              project_id: invitation.project_id,
              inviter: invitation.inviter,
              rol_id: invitation.rol_id,
              accepted: invitation.accepted
            }); 
          });
        }
      } catch (error) {
        console.error(`Error fetching the pending notificaitons for the user: ${user_id} with socket: ${socket.id}\nError: ${error}`)
      }
    });

    socket.on('send_invitation', async ({to_id, project_id, inviter_id, rol_id}) => {
      
      try {
        await db.query("INSERT INTO user_invitations(user_id, project_id, inviter, accepted) VALUES ($1, $2, $3, $4, 'P')", [to_id, project_id, inviter_id, rol_id]);
        
        const to_socketId = connectedUsers.get(to_id);
        if(to_socketId){ 
          socket.emit('invitationNotification', {
            user_id: invitation.user_id,
            project_id: invitation.project_id,
            inviter: invitation.inviter,
            rol_id: invitation.rol_id,
            accepted: invitation.accepted
          }); 
        }

      } catch (error) {
        console.error(`Error storing invitation: ${error}`)
      }
    });

    socket.on('acceptingInvitation', async ({to_id, project_id, inviter_id, rol_id, accepted}) => {
      try {
        const inviterSocketId = connectedUsers.get(inviter_id); 
        await db.query('UPDATE user_invitations SET accepted = $1 WHERE user_id = $2 AND project_id = $3 AND inviter = $4', ['P', to_id, project_id, inviter_id]);
        
        if(inviterSocketId){
          io.to(inviterSocketId).emit('acceptInvitation', {
             
          });
        }
        
        
      } catch (error) {
        console.error(`Error accepting the invitation for the user: ${to_id}\nError: ${error}`);
      }
    });

  })
}

export default configureSocket;
