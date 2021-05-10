import React, {FunctionComponent} from 'react';
import {User} from "../../store/user/types";
import styles from "./ListUsers.module.scss"

type ListUsersProps = {
    users: User[],
    arrayLength?: number
    showName?: boolean
}
const ListUsers: FunctionComponent<ListUsersProps> = ({users, arrayLength=6, showName = true}) => {
    return (<div className={styles.ListUsers}>
        {[...Array(arrayLength)].map((x, index) => (
            <div key={index}>
                <div>
                    <div>
                        { users[index] && <img src={`/smiley/${users[index].color.replace('#', '')}/smiley_${users[index].avatar}.png`}/> }
                    </div>
                </div>
                { (showName && users[index]) && <div>{users[index].name}</div>}
            </div>
        ))}
    </div>)
}
export default ListUsers;
