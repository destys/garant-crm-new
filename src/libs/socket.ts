import { io } from "socket.io-client";
const socket = io("https://snurinoothe.beget.app/"); // Укажите URL вашего Strapi сервера
export default socket;
