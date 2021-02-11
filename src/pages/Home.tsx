import React, {useEffect} from 'react';
import {useHistory} from "react-router";

const Home = () => {
    const history = useHistory();
    useEffect(() => {
       setTimeout(()=>{history.push('/setup')}, 5000)
    });
    return (
    <div className="home">
        <h1>HomePage</h1>
    </div>
  );
}

export default Home;
