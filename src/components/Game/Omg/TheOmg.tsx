import React, {FunctionComponent, useState} from 'react';
import styles from './TheOmg.module.scss'
import TheBooty from "./../TheBooty";
import useRoundEvent from "../../../hooks/useRoundEvent";
import TheTitle from "../../TheTitle";
import {User} from "../../../store/user/types";
import InteractionOmg from "./InteractionOmg";
import {Omg} from "../../../server/types/omg";

type OhMyGodProps = {
    roomId: string,
    userKey: number,
    users: User[],
    omg?: Omg
}

const TheOmg: FunctionComponent<OhMyGodProps> = ({roomId, userKey, users, omg}) => {
    const { win, lose } = useRoundEvent(roomId, userKey);
    const [active, setActive] = useState(false);

    return (
        <div className={styles.TheOmg}>
            <TheTitle title={"OMG"}/>
            { (!win && !lose && omg) && <InteractionOmg type={omg.type} animationBefore={omg.animationBefore.url} animationAfter={omg.animationAfter.url} active={active} setActive={setActive}/>}
            {lose && <p>Tu as perdu...</p>}
            <TheBooty win={win} lose={lose} roomId={roomId} userKey={userKey} users={users.filter(user => user.winEvent)}/>
        </div>
    )
}

export default TheOmg;
