import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useHistory} from "react-router";
import styles from './Tips.module.scss'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {FETCH_TIPS_ERROR, FETCH_TIPS_REQUEST, FETCH_TIPS_SUCCESS} from "../store/tips/types";

const Tips = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const jwt = useSelector((state: ApplicationState) => state.user.data.jwt)
    const tips = useSelector((state: ApplicationState) => state.tips.data)
    const [message, setMessage] = useState('')
    const [sendMessage, setSendMessage] = useState(false)

    /**
     * Fetch Tips
     */
    const fetchTips = async () => {
        dispatch({type: FETCH_TIPS_REQUEST })
        await axios.get('https://happiness-strapi.herokuapp.com/tips').then(({data}) => {
            dispatch({type: FETCH_TIPS_SUCCESS, payload: data})
        }).catch(function (error) {
            dispatch({type: FETCH_TIPS_ERROR, payload: error.toString()})
        })
    }

    useEffect( () => {
        if (!tips || tips.length <= 0) {
            fetchTips()
        }
    }, []);

    /**
     * Send Tips
     */
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        axios.post('https://happiness-strapi.herokuapp.com/tips', {
            message: message,
            published_at: null
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(() => {
            setSendMessage(true);
            setMessage('');
        }).catch((error) => {
            dispatch({type: FETCH_TIPS_ERROR, payload: error.toString()})
        })
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }

    return (
        <div className={styles.Tips}>
            <h1>Tips</h1>
            <button onClick={() => history.goBack()}>Retour</button>
            <div className="TipsList">
                {
                    tips.map((tip) => <div key={tip.id}>{tip.message}</div>)
                }
            </div>
            {
                !sendMessage && (
                    <form className={styles.TipsForm} autoComplete="off" onSubmit={handleSubmit}>
                        <textarea id="tips" name="tips" placeholder="J'adore rire" onChange={handleChange}/>
                        <input type="submit" value="Envoyez"/>
                    </form>
                    )
            }
        </div>
    );
}

export default Tips;
