import React, {FunctionComponent} from 'react';
import {User} from "../../server/types/users";

type ListUsersProps = {
    users: User[]
}
const ListUsers: FunctionComponent<ListUsersProps> = ({users}) => {
    return (<ul>
        {users.map(({username}, index) => <li key={index}>{username}</li>)}
    </ul>)
}
export default ListUsers;
