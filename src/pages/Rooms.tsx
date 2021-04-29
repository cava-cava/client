import React from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import styles from "./Rooms.module.scss"
import useRedirect from "../hooks/useRedirect";
import useLeaveRoom from "../hooks/useLeaveRoom";
import AvatarHeader from "../components/Avatar/AvatarHeader";
import FormUsername from "../components/Form/FormUsername";
import { Link } from 'react-router-dom';
import CreateRoom from "../components/Form/CreateRoom";
import FormJoinRoom from "../components/Form/FormJoinRoom";
import SettingsHeader from "../components/Game/Header/SettingsHeader";

const Rooms = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    useRedirect();
    useLeaveRoom();

    return (
        <div className={styles.Rooms}>
            <div>
                <Link to={"/setup"}>
                    <AvatarHeader color={"noir"} avatarNumber={user.avatar} />
                </Link>
                <FormUsername name={user.name} showSubmit={false}/>
                <FormJoinRoom username={user.name} avatar={user.avatar} />
                <CreateRoom username={user.name} avatar={user.avatar}/>
            </div>

            <SettingsHeader />
        </div>
    );
}

export default Rooms;
