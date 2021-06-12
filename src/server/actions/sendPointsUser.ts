import {User} from "../../store/user/types";
import {progressBar} from "./progressBar";

/**
 * Get fired for sendPointsUser in game room
 * @param user
 * @param points
 */
export function sendPointsUser(user:User, points: number) {
    user.points+= points;
    let progressPoints = points
    if(user.points < 0) {
        progressPoints += (-user.points)
        user.points = 0
    }
    progressBar(user, `${progressPoints >= 0 ? '+' : ''}${progressPoints}%`)
}
