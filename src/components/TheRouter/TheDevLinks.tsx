import React, {FunctionComponent} from 'react';
import { Link } from 'react-router-dom';
import styles from './TheDevLinks.module.scss'

const TheDevLinks: FunctionComponent = () => {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? (
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
