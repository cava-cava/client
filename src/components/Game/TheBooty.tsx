import React, {FunctionComponent, useState} from 'react';
import styles from './TheBooty.module.scss'
import {colors} from "../../mixins/color";
import {socket} from "../../socketClient";

type TheBootyProps = {
    win: boolean
    lose: boolean
    roomId: string
    userKey: number
    showHappiness?: boolean
}

const TheBooty: FunctionComponent<TheBootyProps> = ({win, lose, roomId, userKey, showHappiness = true}) => {
    const [hasBooty, setHasBooty] = useState(false)

    const callback = () => {
        setHasBooty(true)
        socket.emit('endRoundEvent', roomId, userKey)
    }

    const happinessClick = () => {
        console.color(`+3% bonheur`, colors.blue);
        socket.emit('sendPointsUser', roomId, userKey, 3)
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
                        {showHappiness && <button role="button" onClick={happinessClick}>+3% de bonheur</button>}
                        <button role="button" onClick={jokerClick}>1 carte Oh ça va</button>
                        <button role="button" onClick={dirtClick}>1 carte Cheh</button>
                    </div>
                </div>
            }
            {(win && !lose) && hasBooty && <p>En attente des autres joueurs ...</p>}
            {(!win && lose) && <p>Tu as perdu ...</p>}
        </div>
    ) : null
}

export default TheBooty;
