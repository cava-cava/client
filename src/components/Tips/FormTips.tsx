import React, {ChangeEvent, FormEvent, FunctionComponent, useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {ApplicationState} from "../../store";
import styles from "./FormTips.module.scss";
import axios from "axios";
import {FETCH_TIPS_ERROR} from "../../store/tips/types";

const FormTips: FunctionComponent = () => {
    const dispatch = useDispatch();
    const jwt = useSelector((state: ApplicationState) => state.user.data.jwt);
    const [message, setMessage] = useState('');

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
            setMessage('');
        }).catch((error) => {
            console.error(error);
            dispatch({type: FETCH_TIPS_ERROR, payload: error.toString()});
        })
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }

    return (
        <form className={styles.FormTips} autoComplete="off" onSubmit={handleSubmit}>
            <textarea id="tips" name="tips" value={message} placeholder="J'adore rire" onChange={handleChange}/>
            <input type="submit" value="Envoyez"/>
        </form>)
}

export default FormTips;
