import {Room, Rooms} from "../types/rooms";
import {nanoid} from "nanoid";
import {shuffle} from "../../mixins/shuffle";

/**
 * Create and generate nanoid for connect a socket to a room
 * @param rooms An Array of room
 */
export function createRoom(rooms: Rooms) {
    let room: Room = {
        id: nanoid(5),
        sockets: [],
        users: [],
        usersDisconnected: [],
        colors: shuffle(['#006EFF', '#ED3780', '#00F090', '#8733EA', '#FC8A28', '#FFF500']),
        game: {
            points: 100,
            round: 0,
            playerGame: {
                id: 0
            },
            cardGame: {
                id: -1,
                showAlternative: false
            },
            guessEvent: {
                id: -1,
                answers: [],
                trigger: false,
                idStep: -1
            },
            omgEvent: {
                id: -1,
                trigger: false,
                idTrigger: 0,
                idStep: -1
            },
            isStart: false,
            isGameOver: false,
            isLoading: false
        },
        timer: {
            seconds: 0,
            isRunning: false
        }
    }
    while (rooms[room.id] || !room?.id) {
        room.id = nanoid(5);
    }
    return room
}
