import React, {FunctionComponent} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styles from './TheDevLinks.module.scss'

const TheDevLinks: FunctionComponent = () => {
    const location = useLocation();
    return (location.hash === "#debug" || !process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? (
            <nav className={styles.TheDevLinks}>
                <Link to='/debug/cards'>Cards</Link>
                -
                <Link to='/debug/omg'>OMG</Link>
                -
                <Link to='/debug/test'>Test</Link>
                -
                <Link to='/rooms'>Rooms</Link>
            </nav>
    ) : null
}

export default TheDevLinks;
