import {Room} from "../types/rooms";
import {StatisticsGameKeys} from "../types/statisticsGameKeys";

export const getMaxValue = (room: Room, key: StatisticsGameKeys) => {
    const maxKey: number[] = []
    room.users.reduce((prev, current) => {
        if (prev.statisticsGame[key] > current.statisticsGame[key]) {
            return prev
        } else {
            if (prev.statisticsGame[key] !== current.statisticsGame[key]) maxKey.length = 0
            maxKey.push(current.key)
            return current
        }
    })
    maxKey.map(userKey => {
        if(room.users[userKey].statisticsGame[key] <= 0) return;
        room.users[userKey].gameOver.push(key)
    })
}
