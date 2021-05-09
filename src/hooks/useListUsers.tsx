import {useEffect, useState} from "react";
import {socket} from "../socketClient";
import {User} from "../store/user/types";

const useListUsers = (id:string, eventSocketOn:string = 'updateListUsers', eventSocketEmit:string = 'getListUsersInRoom') => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const updateListUsers = (users: []) => {
            setUsers(users)
        }

        socket.on(eventSocketOn, updateListUsers);

        socket.emit(eventSocketEmit, id);

        return () => {
            socket.off(eventSocketOn, updateListUsers);
            setUsers([])
        };
    }, []);

    return users;
};

export default useListUsers;
