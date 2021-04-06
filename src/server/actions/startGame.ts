import {Room} from "../types/rooms";
import {Server} from "socket.io";
import axios from "axios";
import {shuffle} from "../../mixins/shuffle";
import {initIdOMG} from "./initOMG";
import {checkpoint} from "./checkpoint";
import {getPlayer} from "./getPlayer";

/**
 * Get fired to start Game in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export async function startGame(room: Room, io:Server) {
    if(room.game.isStart) return;

    //Initialize cards for the game
    await axios.get('https://happiness-strapi.herokuapp.com/cards').then(({data}) => {
        room.game.cards = shuffle(data)
    })

    //Initialize guesses for the game
    await axios.get('https://happiness-strapi.herokuapp.com/guesses').then(({data}) => {
        room.game.guesses = shuffle(data)
    })

    if(room.game.guesses && room.game.guesses.length > 0) room.game.idGuesses = 0

    //Init Key of users
    room.users.map((user,index) => room.users[index].key = index)

    //Initialize OMG for the game
    room.game.idOMG = initIdOMG(room)

    room.game.isStart = true
    io.to(room.id).emit('redirect', `/game/${room.id}`);
    checkpoint(room, io)
    getPlayer(room, io)
}
