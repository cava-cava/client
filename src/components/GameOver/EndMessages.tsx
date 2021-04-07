import React, {FunctionComponent, useEffect, useState} from "react";
import styles from './EndMessages.module.scss'
import {
    FETCH_MESSAGES_ERROR,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    Message
} from "../../store/messages/types";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";

const EndMessages: FunctionComponent = () => {
    const dispatch = useDispatch();
    const messages: Message[] = useSelector((state: ApplicationState) => state.messages.data)
    const [gameOvers, setGameOvers] = useState<Message[]>([])
    /**
     * Fetch Messages
     */
    const fetchMessages = async () => {
        dispatch({type: FETCH_MESSAGES_REQUEST})
        await axios.get('https://happiness-strapi.herokuapp.com/game-overs').then(({data}) => {
            dispatch({
                type: FETCH_MESSAGES_SUCCESS,
                payload: data.sort((a: Message, b: Message) => (a.position > b.position) ? 1 : -1)
            })
        }).catch(function (error) {
            console.error(error)
            dispatch({type: FETCH_MESSAGES_ERROR, payload: error.toString()})
        })
    }

    useEffect(() => {
        if (!messages || messages.length <= 0) {
            fetchMessages()
        }
        setGameOvers(messages)
        return () => {
            setGameOvers([])
        }
    }, []);
    return (
        <div className={styles.EndMessages}>
            {gameOvers.map((gameOver, index) =><div>
                { index === 0 ? <h1>{gameOver.title}</h1> : <h2>{gameOver.title}</h2> }
                <p>{gameOver.description}</p>
            </div>)}
        </div>
    )
}

export default EndMessages;
