import React from 'react';
import {Link} from "react-router-dom";
import styles from './End.module.scss'

const End = () => {
    return (
        <div className={styles.End}>
            <div>
                <h1>Jujuonelove</h1>
                <span>1er</span>
            </div>
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
