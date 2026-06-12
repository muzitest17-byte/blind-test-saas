/// <reference types="vite/client" />
import { io } from 'socket.io-client';

// En prod : pointe vers le backend Railway
// En dev  : vide = Vite proxy vers localhost:3002
const BACKEND = import.meta.env.VITE_BACKEND_URL ?? '';

export const socket = io(BACKEND, {
  autoConnect: false,
  transports: ['websocket', 'polling'],
});
