import {useEffect, useState} from "react";
import {socket} from "../socketClient";
import {User} from "../store/user/types";

const useListUsers = (id:string) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const updateListUsers = (users: []) => {
            setUsers(users)
        }

        socket.on('updateListUsers', updateListUsers);

        return () => {
            socket.off('updateListUsers', updateListUsers);
            setUsers([])
        };
    }, []);

    return users;
};

export default useListUsers;
