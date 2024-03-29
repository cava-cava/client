import React, {FunctionComponent} from 'react';
import styles from "./DisconnectedUsers.module.scss";
import CodeHeader from "../Code/CodeHeader";
import WaitingUsers from "./WaitingUsers";
import {User} from "../../store/user/types";
import TheTitle from "../TheTitle";
import { Link } from 'react-router-dom';

type DisconnectedUsersProps = {
    roomId: string
    users: User[]
}

const DisconnectedUsers: FunctionComponent<DisconnectedUsersProps> = ({roomId, users}) => {
    return (
        <div className={styles.DisconnectedUsers}>
            <div>
                <div>
                    <TheTitle title={"Deconnexion"}/>
                    <CodeHeader roomId={roomId}/>
                    <WaitingUsers text="Une ou plusieurs personnes sont déconnectées, Veuillez patienter..." users={users}/>
                    <Link to="/rooms" className={styles.DisconnectedUsersButton}>Quitter</Link>
                </div>
            </div>
        </div>
    )
}

export default DisconnectedUsers;
