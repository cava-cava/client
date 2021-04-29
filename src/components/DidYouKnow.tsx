import React, {FunctionComponent, useEffect, useState} from 'react';
import {FETCH_KNOWS_ERROR, FETCH_KNOWS_REQUEST, FETCH_KNOWS_SUCCESS, Know} from "../store/knows/types";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {shuffle} from "../mixins/shuffle";
import TitleImg from "./TitleImg";
import title from "../assets/title/saviez-vous.png"
import styles from './DidYouKnow.module.scss'

const DidYouKnow: FunctionComponent = () => {
    const dispatch = useDispatch();
    const knows:Know[] = useSelector((state: ApplicationState) => state.knows.data)

    /**
     * Fetch Knows
     */
    const fetchKnows = async () => {
        dispatch({type: FETCH_KNOWS_REQUEST})
        await axios.get('https://happiness-strapi.herokuapp.com/did-you-knows').then(({data}) => {
            dispatch({type: FETCH_KNOWS_SUCCESS, payload: shuffle(data)})
        }).catch(function (error) {
            console.error(error)
            dispatch({type: FETCH_KNOWS_ERROR, payload: error.toString()})
        })
    }

    useEffect(() => {
        if (!knows || knows.length <= 0) {
            fetchKnows()
        }
    }, []);

    return (knows && knows[0]?.text) ? (
        <div className={styles.DidYouKnow}>
            <TitleImg src={title} />
            <p>{knows[0]?.text}</p>
        </div>
    ) : null
}

export default DidYouKnow;
