import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './End.module.scss'
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import TheTitle from "../components/TheTitle";
import useListUsers from "../hooks/useListUsers";
import {RouteParams} from "../types/params";
import {useParams} from "react-router";

const End = () => {
    const {id}: RouteParams = useParams();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const users = useListUsers(id);
    const winners = users.filter((user) => user.ladder === 1)
    const [animation, setAnimation] = useState(false)
    const idRef = useRef<any>();

    useEffect(() => {
        const id = setTimeout(() => {setAnimation(true)}, 1000);
        if (null !== idRef.current) {
            idRef.current = id;
        }
        return () => {
            clearTimeout(idRef.current)
        };
    }, []);

    return (
        <div className={styles.End}>
            <div>
                <TheTitle title={user.ladder === 1 ? "Gagner" : "Perdu"}/>
                {winners.length > 0 &&
                    <>
                        <div className={styles.EndWinner}>
                            <p>Bravo ! Au gagnant !</p>
                            {winners.map((winner, indexWinner)=> <p key={indexWinner}>{winner.name}</p>)}
                        </div>
                        <div className={styles.EndProgress}>
                            <div style={{width: animation ? '100%' : '0%'}}>
                                {winners.map((avatar, indexAvatar)=>
                                    <div key={indexAvatar}>
                                        <img src={`/smiley/${avatar.color.replace('#', '')}/smiley_${avatar.avatar}.png`}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                }
            </div>
            <Link to="/messages">Votre message</Link>
        </div>
    );
}

export default End;
