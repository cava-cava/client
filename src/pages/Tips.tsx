import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import ListTips from "../components/Tips/ListTips";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {FETCH_TIPS_ERROR, FETCH_TIPS_REQUEST, FETCH_TIPS_SUCCESS, Tip} from "../store/tips/types";
import axios from "axios";
import styles from "./Tips.module.scss"
import useLeaveRoom from "../hooks/useLeaveRoom";
import title from '../assets/title/tips.png'
import TitleImg from "../components/TitleImg";
import FormTips from "../components/Form/FormTips";
import IconClose from "../components/IconClose";

const Tips = () => {
    const dispatch = useDispatch();
    const tips:Tip[] = useSelector((state: ApplicationState) => state.tips.data)

    useLeaveRoom();

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
        <div className={styles.Tips}>
            <div>
                <TitleImg src={title} />
                <div>
                    <p>
                        Ici tu peux t’exprimer en apportant
                        des conseils pour déculpabiliser
                        sur la pression du bonheur !
                    </p>
                    <ListTips tips={tips}/>
                </div>
                <FormTips />
            </div>
            <div>
                <Link to="/end"><IconClose/></Link>
            </div>
        </div>
    );
}

export default Tips;
