import React, {FunctionComponent} from 'react';
import {User} from "../../store/user/types";

type ListUsersProps = {
    users: User[]
}
const ListUsers: FunctionComponent<ListUsersProps> = ({users}) => {
    return (<ul>
        {users.map(({name}, index) => <li key={index}>{name}</li>)}
    </ul>)
}
export default ListUsers;
