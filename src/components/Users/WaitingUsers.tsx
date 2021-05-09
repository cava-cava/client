import React, {FunctionComponent} from 'react';
import {User} from "../../store/user/types";
import ListUsers from "./ListUsers";

type WaitingUsersProps = {
    text?: string,
    users: User[]
}

const WaitingUsers: FunctionComponent<WaitingUsersProps> = ({text, users}) => {
    return (
        <div>
            { text && <div>{text}</div> }
            <ListUsers users={users} arrayLength={users.length}/>
        </div>
    )
}

export default WaitingUsers;
