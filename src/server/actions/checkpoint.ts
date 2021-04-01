import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {User} from "../../store/user/types";
import {checkGameOver} from "./gameOver";

/**
 * checkpoint for update users and my user in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function checkpoint(room: Room, io:Server) {
    //Update Ladder
    const usersClone =  [...room.users] // clone array users
    usersClone.sort((a, b) => (a.points < b.points) ? 1 : -1)
    let positionLadder = 1
    let prevUser:User;

    usersClone.map((user) => {
        if(prevUser && prevUser.points > user.points) ++positionLadder
        user.ladder = positionLadder
        prevUser = user
        io.to(user.id).emit('checkpoint', user)
    })
    io.to(room.id).emit('updateListUsers', room.users);
    checkGameOver(room, io)
}
