import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './TheOmg.module.scss'
import TheBooty from "./../TheBooty";
import useRoundEvent from "../../../hooks/useRoundEvent";
import TheTitle from "../../TheTitle";
import {User} from "../../../store/user/types";
import InteractionOmg from "./InteractionOmg";
import {Omg} from "../../../server/types/omg";
import {socket} from "../../../socketClient";
import MessageGame from "../MessageGame";

type OhMyGodProps = {
    roomId: string,
    userKey: number,
    users: User[],
    omg?: Omg
}

const TheOmg: FunctionComponent<OhMyGodProps> = ({roomId, userKey, users, omg}) => {
    const {win, lose} = useRoundEvent(roomId, userKey);
    const [active, setActive] = useState(false);
    const [canDoInteraction, setCanDoInteraction] = useState(true)

    useEffect(() => {
        const winOmg = () => {
            setCanDoInteraction(false)
        }

        socket.emit('checkWinOmg', roomId, userKey);
        socket.on('winOmg', winOmg);
        return () => {
            socket.off('winOmg', winOmg);
        }
    }, [])

    return (
        <div className={styles.TheOmg}>
            <TheTitle title={"OMG"}/>
            {!win && <MessageGame/>}
            {(!win && !lose && omg) &&
                    <InteractionOmg roomId={roomId} userKey={userKey} type={omg.type}
                                    animationBefore={omg.animationBefore.url}
                                    animationAfter={omg.animationAfter.url} active={active} setActive={setActive}
                                    canDoInteraction={canDoInteraction}/>
            }
            <TheBooty win={win} lose={lose} roomId={roomId} userKey={userKey}
                      users={users.filter(user => user.winEvent)}/>
        </div>
    )
}

export default TheOmg;
