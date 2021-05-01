import React, {FunctionComponent} from 'react';
import {User} from "../../store/user/types";
import styles from "./ListUsers.module.scss"

type ListUsersProps = {
    users: User[]
}
const ListUsers: FunctionComponent<ListUsersProps> = ({users}) => {
    return (<div className={styles.ListUsers}>
        {[...Array(6)].map((x, index) => (
            <div key={index}>
                <div>
                    { users[index] && <img src={`/smiley/${users[index].color.replace('#', '')}/smiley_${users[index].avatar}.png`}/> }
                </div>
                { users[index] && <div>{users[index].name}</div>}
            </div>
        ))}
    </div>)
}
export default ListUsers;
