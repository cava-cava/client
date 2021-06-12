import React, {FunctionComponent, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styles from './TheDevLinks.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {SET_DEBUG_SETTINGS} from "../../store/settings/types";

const TheDevLinks: FunctionComponent = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const debug = useSelector((state: ApplicationState) => state.settings.data.debug);

    useEffect(() => {
        if(location.hash === "#debug") dispatch({type: SET_DEBUG_SETTINGS, payload: true})
    }, [])

    return ( debug || !process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? (
            <nav className={styles.TheDevLinks}>
                <Link to='/debug/cards'>Cards</Link>
                -
                <Link to='/debug/omg'>OMG</Link>
                -
                <Link to='/debug/test'>Test</Link>
            </nav>
    ) : null
}

export default TheDevLinks;
