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
    room.game.isLoading = true
    io.to(room.id).emit('loading', room.game.isLoading);
    //Initialize cards for the game
    await axios.get('https://happiness-strapi.herokuapp.com/cards').then(({data}) => {
        room.game.cards = shuffle(data)
    })
    if(room.game.cards && room.game.cards.length > 0) room.game.cardGame.id = 0

    //Initialize guesses for the game
    await axios.get('https://happiness-strapi.herokuapp.com/guesses').then(({data}) => {
        room.game.guesses = shuffle(data)
    })
    if(room.game.guesses && room.game.guesses.length > 0) room.game.guessEvent.id = 0

    //Initialize OMG for the game
    await axios.get('https://happiness-strapi.herokuapp.com/omgs').then(({data}) => {
        room.game.omgs = shuffle(data)
    })
    if(room.game.omgs && room.game.omgs.length > 0) room.game.omgEvent.id = 0
    room.game.omgEvent.idTrigger = initIdOMG(room)

    //Init Key of users
    room.users.map((user,index) => room.users[index].key = index)

    room.game.isLoading = false
    room.game.isStart = true
    io.to(room.id).emit('loading', room.game.isLoading);
    io.to(room.id).emit('redirect', `/game/${room.id}`);
    checkpoint(room, io)
    getPlayer(room, io)
}
