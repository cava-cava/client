import {User} from "../../store/user/types";

/**
 * Get fired for sendPointsUser in game room
 * @param user
 * @param points
 */
export function sendPointsUser(user:User, points: number) {
    user.points+= points;
    if(user.points < 0) user.points = 0
}
