import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {RouteParams} from "../types/params";
import DidYouKnow from "../components/DidYouKnow";
import ListUsers from "../components/Users/ListUsers";
import {socket} from "../socketClient";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import useRedirect from "../hooks/useRedirect";
import useListUsers from "../hooks/useListUsers";
import styles from './Room.module.scss'
import SettingsHeader from "../components/Game/Header/SettingsHeader";
import IconClose from "../components/IconClose";
import StartGame from "../components/Form/StartGame";
import CodeHeader from "../components/Code/CodeHeader";

const Room = () => {
    const {id}: RouteParams = useParams();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const users = useListUsers(id);
    const [loading, setLoading] = useState<boolean>(false)

    useRedirect();

    useEffect(() => {
        const loadingEmit = (loading: boolean) => {
            setLoading(loading)
        }

        socket.on('loading', loadingEmit);
        return () => {
            socket.off('loading', loadingEmit);
            setLoading(false);
        };
    }, [])

    return (
        <div className={styles.Room}>
            <div>
                <CodeHeader roomId={id} />
                <DidYouKnow/>
                <ListUsers users={users}/>
                <StartGame roomId={id} isHost={(users.length > 0 && users[0].id === user.id)} loading={loading} usersLength={users.length}/>
            </div>

            <div>
                <SettingsHeader />
                {!loading && <Link to="/rooms"><IconClose/></Link>}
            </div>

        </div>
    );
}

export default Room;
