import React, {FunctionComponent} from 'react';
import {User} from "../../store/user/types";

type ListUsersProps = {
    users: User[]
}
const ListUsers: FunctionComponent<ListUsersProps> = ({users}) => {
    return (<ul>
        {users.map(({name, color}, index) => <li key={index} style={{color: color}}>{name}</li>)}
    </ul>)
}
export default ListUsers;
