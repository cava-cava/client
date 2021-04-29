import React, {useEffect} from 'react';
import {useHistory} from "react-router";
import styles from './Home.module.scss'

const Home = () => {
    const history = useHistory();
    useEffect(() => {
       setTimeout(()=>{history.push('/setup')}, 5000)
    });
    return (
    <div className={styles.Home}/>
  );
}

export default Home;
