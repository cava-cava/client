import io from "socket.io-client";
const url: string = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : window.location.toString();
export const socket = io(url);