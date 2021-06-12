import {User} from "../../store/user/types";

export function clearProgressBar(users:User[]) {
    users.map(user => user.progressBar = '')
}

