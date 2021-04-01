import React from 'react';
import {Link} from "react-router-dom";
import styles from './End.module.scss'
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import UserHeader from "../components/Game/Header/UserHeader";

const End = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);

    return (
        <div className={styles.End}>
            <UserHeader user={user} roomId={''}/>
            <div>
                <h2>Le plus heureux/se</h2>
                <p>
                    Bravo ! Tu as gagné !
                    Mais ne te mets pas la pression
                    pour être le meilleur. Penses à toi
                    et ce que tu as réellement envie !
                    Comme disait Platon, connais-toi
                    toi-même pour être heureux.
                </p>
            </div>
            <div className={styles.EndButtons}>
                <Link to="/rooms">Rejouez</Link>
                <Link to="/tips">Tips</Link>
            </div>
        </div>
    );
}

export default End;
