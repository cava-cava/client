import React from 'react';
import TheTimer from '../components/Timer/TheTimer'
import {Link} from "react-router-dom";
import Cards from '../components/Cards/Cards'
import UserHeader from "../components/Game/Header/UserHeader";

const Labs = () => {
    return (
        <div className="Labs">
            <h1>LABS</h1>
            <UserHeader username={'jujuonelobe'}/>
            <Cards />
        </div>
    );
}

export default Labs;
