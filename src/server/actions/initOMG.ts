import {Room} from "../types/rooms";
import {getRandomInt} from "../../mixins/getRandomInt";

/**
 * Initialize and generate next id OMG for the game
 * @param room
 */
export function initIdOMG(room: Room) {
    return room.game.round + getRandomInt(room.users.length, room.users.length*2)
}
