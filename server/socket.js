import env from "dotenv";
import { Server } from 'socket.io';
import db from './db.js';

function configureSocket(server) {

  const connectedUsers = new Map();

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('connect_user', async (user_id) => {
      connectedUsers.set(user_id, socket.id);
      console.log(`connect_user ${user_id}`);

      try {
        const pending_invitations = (await db.query('SELECT * FROM user_invitations WHERE user_id = $1 AND inv_read = FALSE', [user_id])).rows;

        if(pending_invitations){
          pending_invitations.forEach((invitation) => {
            socket.emit('invitationNotification', {
              invitation_id: invitation.invitation_id 
            }); 
          });
        }
      } catch (error) {
        console.error(`Error fetching the pending notificaitons for the user: ${user_id} with socket: ${socket.id}\nError: ${error}`)
      }
    });

    socket.on('send_invitation', async ({to_id, project_id, inviter_id, rol_id}) => {
      
      try {
        await db.query("INSERT INTO user_invitations(user_id, project_id, inviter, rol_id, accepted) VALUES ($1, $2, $3, $4)", [to_id, project_id, inviter_id, rol_id, 'P']);
        const new_invitationId = (await db.query("SELECT invitation_id FROM user_invitations WHERE user_id = $1 AND project_id = $2 AND inviter = $3", 
                                  [to_id, project_id, inviter_id])).rows[0];

        if(!new_invitationId){
          throw new Error('error fetching the new invitation ID');
        }
        
        const to_socketId = connectedUsers.get(to_id);
        if(to_socketId && new_invitationId){ 
          socket.emit('invitationNotification', {
            invitation_id: new_invitationId, 
          }); 
        }
      } catch (error) {
        console.error(`Error storing invitation: ${error}`)
      }
    });

    socket.on('acceptingInvitation', async ({invitation_id}) => {
      try {
        const [user_id, username, project_name, inviter_id, inviter_username] = (await db.query
          ("SELECT user_id, username, project_name, inviter_id, inviter_username FROM invitations WHERE invitation_id = $1", [invitation_id])).rows[0];
        const inviterSocketId = connectedUsers.get(inviter_id);
        await db.query('UPDATE user_invitations SET accepted = $1 WHERE invitation_id = $2', ['A', invitation_id]);
        
        if(inviterSocketId){
          io.to(inviterSocketId).emit('acceptedNotification', {
            message: `${to_id} user accepted the invitation`
          });
        }else{

        }
      
      } catch (error) {
        console.error(`Error accepting the invitation for the user: ${to_id}\nError: ${error}`);
      }
    });

    socket.on('declineInvitation', async ({invitation_id}) => {
      try {
        const [user_id, username, project_name, inviter_id, inviter_username] = (await db.query
          ("SELECT user_id, username, project_name, inviter_id, inviter_username FROM invitations WHERE invitation_id = $1", [invitation_id])).rows[0];
        const inviterSocketId = connectedUsers.get(inviter_id);
        await db.query('UPDATE user_invitations SET accepted = $1 WHERE invitation_id = $2', ['D', invitation_id]); 
     
        if(inviterSocketId){
          io.to(inviterSocketId).emit('declinedNotification', {
            message: `${username} decline your invitation for ${project_name}`
          })
        }

      } catch (error) {
        console.error(`Error declining the invitation for the user: ${to_id}\nError: ${error}`);
      }
    });

    socket.on('disconnect', () => {
      connectedUsers.forEach((id, userId) => {
        if (id === socket.id) {
          usuariosConectados.delete(userId);
          console.log(`Usuario desconectado: ${userId}`);
        }
      });
    });
  })
}

export default configureSocket;
