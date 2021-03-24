import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useHistory} from "react-router";
import ListTips from "../components/Tips/ListTips";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {FETCH_TIPS_ERROR, FETCH_TIPS_REQUEST, FETCH_TIPS_SUCCESS, Tip} from "../store/tips/types";
import axios from "axios";
import styles from "./Tips.module.scss"

const Tips = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const tips:Tip[] = useSelector((state: ApplicationState) => state.tips.data)
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjEzMDcwODI4LCJleHAiOjE2MTU2NjI4Mjh9.podMQsLLLWnnRRPdbViwUyaF2jZlh5SkTYxiVIljxH4';
    const [message, setMessage] = useState('');

    /**
     * Fetch Tips
     */
    const fetchTips = async () => {
        dispatch({type: FETCH_TIPS_REQUEST})
        await axios.get('https://happiness-strapi.herokuapp.com/tips').then(({data}) => {
            dispatch({type: FETCH_TIPS_SUCCESS, payload: data})
        }).catch(function (error) {
            console.error(error)
            dispatch({type: FETCH_TIPS_ERROR, payload: error.toString()})
        })
    }

    /**
     * Send Tips
     */
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const tip:Tip = {
            id: undefined,
            message: message,
            published_at: null
        }
        axios.post('https://happiness-strapi.herokuapp.com/tips', tip, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(() => {
            tips.push(tip)
            setMessage('');
        }).catch((error) => {
            console.error(error);
            dispatch({type: FETCH_TIPS_ERROR, payload: error.toString()});
        })
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }

    useEffect(() => {
        if (!tips || tips.length <= 0) {
            fetchTips()
        }
    }, []);

    return (
        <div className={styles.Tips}>
            <h1>Tips</h1>
            <button onClick={() => history.goBack()}>Retour</button>
            <ListTips tips={tips}/>
            <form className={styles.FormTips} autoComplete="off" onSubmit={handleSubmit}>
                <textarea id="tips" name="tips" value={message} placeholder="J'adore rire" onChange={handleChange}/>
                <input type="submit" value="Envoyez"/>
            </form>
        </div>
    );
}

export default Tips;
