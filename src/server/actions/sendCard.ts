import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {sendPointsUser} from "./sendPointsUser";
import {checkpoint} from "./checkpoint";
import {startTimer} from "./startTimer";
import {Card} from "../types/card";

/**
 * Send Card
 * @param playerKey
 * @param card
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function sendCard(playerKey: number, card:Card ,room: Room, io:Server, isAlternative=false) {
    sendPointsUser(room.users[playerKey], card.Points)
    checkpoint(room, io)
    io.to(room.id).emit('pickedCard', card, isAlternative)
    startTimer(room, io, 5)
}
