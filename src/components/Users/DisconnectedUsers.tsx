import React, {FunctionComponent} from 'react';
import styles from "./DisconnectedUsers.module.scss";
import CodeHeader from "../Code/CodeHeader";

type DisconnectedUsersProps = {
    roomId: string
}

const DisconnectedUsers: FunctionComponent<DisconnectedUsersProps> = ({roomId}) => {
    return (
        <div className={styles.DisconnectedUsers}>
            <div>
                <CodeHeader roomId={roomId}/>
                <div>Quelqu’un est déconnecté, Veuillez patienter</div>
            </div>
        </div>
    )
}

export default DisconnectedUsers;
