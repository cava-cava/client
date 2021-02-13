import React, {FunctionComponent, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {ApplicationState} from "../../store";
import styles from "./ListTips.module.scss";
import axios from "axios";
import {FETCH_TIPS_ERROR, FETCH_TIPS_REQUEST, FETCH_TIPS_SUCCESS} from "../../store/tips/types";
import CardTips from "./CardTips";

const ListTips: FunctionComponent = () => {
    const dispatch = useDispatch();
    const tips = useSelector((state: ApplicationState) => state.tips.data)

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

    useEffect(() => {
        if (!tips || tips.length <= 0) {
            fetchTips()
        }
    }, []);

    return (
        <div className={styles.ListTips}>
            {tips.map((tip) => <CardTips key={tip.id} message={tip.message}/>)}
        </div>)
}

export default ListTips;
