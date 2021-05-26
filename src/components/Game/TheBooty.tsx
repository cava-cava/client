import React, {FunctionComponent, useState} from 'react';
import styles from './TheBooty.module.scss'
import {colors} from "../../mixins/color";
import {socket} from "../../socketClient";
import WaitingUsers from "../Users/WaitingUsers";
import {User} from "../../store/user/types";

type TheBootyProps = {
    win: boolean
    lose: boolean
    roomId: string
    userKey: number
    users: User[]
    showHappiness?: boolean
}

const TheBooty: FunctionComponent<TheBootyProps> = ({win, lose, roomId, userKey, users,showHappiness = true}) => {
    const [hasBooty, setHasBooty] = useState(false)

    const callback = () => {
        setHasBooty(true)
        socket.emit('endRoundEvent', roomId, userKey)
    }

    const happinessClick = () => {
        console.color(`+10% bonheur`, colors.blue);
        socket.emit('sendPointsUser', roomId, userKey, 10)
        callback()
    }

    const jokerClick = () => {
        console.color(`1 carte joker`, colors.green);
        socket.emit('addJoker', roomId, userKey)
        callback()
    }

    const dirtClick = () => {
        console.color(`1 carte crasse`, colors.red);
        socket.emit('addDirt', roomId, userKey)
        callback()
    }

    return (win || lose) ? (
        <div className={styles.TheBooty}>
            {((win && !lose) && !hasBooty) &&
                <div>
                    <p>
                    Bravo ! Tu as gagné !<br/>
                    Tu peux choisir ta récompense.
                    </p>
                    <div className={styles.TheBootyButtons}>
                        {showHappiness && <button role="button" onClick={happinessClick}>+10% de bonheur</button>}
                        <button role="button" onClick={jokerClick}>1 carte Oh ça va</button>
                        <button role="button" onClick={dirtClick}>1 carte Cheh</button>
                    </div>
                </div>
            }
            {((!win && lose) || hasBooty) && <WaitingUsers users={users} text={"En attente des autres joueurs ..."}/>}
        </div>
    ) : null
}

export default TheBooty;
