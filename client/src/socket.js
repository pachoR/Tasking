import { io } from 'socket.io-client';
const SOCKET_URL = "http://localhost:3000";

export const socket = io(SOCKET_URL, {
  path: "/socket.io",
  transports: ['polling'],
  withCredentials: true,
  reconnectionAttempts: 5, 
  reconnectionDelay: 3000, 
});
