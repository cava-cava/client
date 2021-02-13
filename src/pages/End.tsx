import React from 'react';
import {Link} from "react-router-dom";

const End = () => {
    return (
        <div className="End">
            <h1>End Game</h1>
            <div>
                <p>
                    Tu es le meilleur, gg
                </p>
            </div>
            <div className="EndButtons">
                <Link to="/rooms">Rejouez</Link>
                <Link to="/tips">Tips</Link>
            </div>
        </div>
    );
}

export default End;
