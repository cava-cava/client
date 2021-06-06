import {Room} from "../types/rooms";
import {getMaxValue} from "./getMaxValue";

export const gameOver = (room: Room) => {
    room.users.map(user => {
        room.users.map(user => user.playingGame = false)
        user.gameOver = []
        // if winner
        if (user.ladder === 1) user.gameOver.push('winner')
        // if loser
        else if (user.ladder === room.users.length) user.gameOver.push('loser')

    })
    // if bonus max
    getMaxValue(room, 'bonus')
    // if malus max
    getMaxValue(room, 'malus')
    // if useJoker max
    getMaxValue(room, 'useJoker')
    // if useJokerForOther max
    getMaxValue(room, 'useJokerForOther')
    // if useJokerForMe max
    getMaxValue(room, 'useJokerForMe')
    // if useDirt max
    getMaxValue(room, 'useDirt')
    // if guessWon max
    getMaxValue(room, 'guessWon')
    // if guessLost max
    getMaxValue(room, 'guessLost')
    // if omgWon max
    getMaxValue(room, 'omgWon')
}
