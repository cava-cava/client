import React from 'react';
import TheTimer from '../components/Timer/TheTimer'
import {Link} from "react-router-dom";
import Cards from '../components/Cards/Cards'

const Labs = () => {
    return (
        <div className="Labs">
            <h1>LABS</h1>
            <TheTimer />
            <Cards />
        </div>
    );
}

export default Labs;
