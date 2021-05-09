import React, {FormEvent, FunctionComponent, useEffect, useState} from 'react';
import styles from "./FormTips.module.scss";
import InputText from "./InputText";
import {ADD_TIPS_SUCCESS, FETCH_TIPS_ERROR, FETCH_TIPS_REQUEST, SET_JWT_TIPS, Tip} from "../../store/tips/types";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";

const FormTips: FunctionComponent = () => {
    const dispatch = useDispatch();
    const jwt = useSelector((state: ApplicationState) => state.tips.jwt);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(!jwt) fetchJwtTips()
    }, []);

    /**
     * Get JWT
     */
    const fetchJwtTips = async () => {
        dispatch({type: FETCH_TIPS_REQUEST})
        await axios.post('https://happiness-strapi.herokuapp.com/auth/local', {
            identifier: 'Happiness',
            password: 'Happiness',
        }).then(({data}) => {
            dispatch({type: SET_JWT_TIPS, payload: data.jwt})
        })
            .catch(function (error) {
                console.error(error)
                dispatch({type: FETCH_TIPS_ERROR, payload: error.toString()})
            })
    }

    /**
     * Send Tips
     */
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!message && message.length === 0) return
        const tip: Tip = {
            id: undefined,
            message: message,
            published_at: null
        }
        axios.post('https://happiness-strapi.herokuapp.com/tips', tip, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(() => {
            dispatch({type: ADD_TIPS_SUCCESS, payload: tip})
            setMessage('');
        }).catch((error) => {
            console.error(error);
            dispatch({type: FETCH_TIPS_ERROR, payload: error.toString()});
        })
    }

    return (
        <form className={`${styles.FormTips} ${message.length > 0 && styles.FormTipsActive}`} autoComplete="off" onSubmit={handleSubmit}>
            <div>
                <InputText id={"tips"} name={"tips"} value={message} setValue={setMessage} hasError={false}/>
                <input type="submit" value=""/>
            </div>
        </form>
    )
}

export default FormTips;
