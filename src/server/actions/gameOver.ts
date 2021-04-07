import {Room} from "../types/rooms";
import {Server} from "socket.io";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function checkGameOver(room: Room, io:Server) {
    room.users.map(user => {
        if(user.points >= room.game.points) {
            gameOver(room)
            io.to(room.id).emit('redirect', `/end`);
        }
    })
}

const gameOver = (room: Room) => {
    // if winner
    const winner = room.users.filter(user => user.ladder === 1)
    winner[0].gameOver.push('winner')
    // if loser
    const loser = room.users.filter(user => user.ladder === room.users.length)
    loser[0].gameOver.push('loser')
    // if bonus max
    // if malus max
    // if useJoker max
    // if useJokerForOther max
    // if useJokerForMe max
    // if useDirt max
    // if useGuessWon max
    // if useOmgWon max

}
