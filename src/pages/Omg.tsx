import React from 'react';
import TheTitle from "../components/TheTitle";
import {useControls} from "leva";
import illustration from "../assets/png/illuOMG.png";
import click from "../assets/svg/appuyer.svg";

const Omg = () => {
    const [{omgWin}, set] = useControls(() => ({omgWin: false}))

    return (
        <div>
            <TheTitle title={omgWin ? "Win" : "Lose"}/>
            <div>
                <img src={illustration}/>
                <div>
                    <img src={click}/>
                    <span>Appuyer</span>
                </div>
            </div>
        </div>
    );
}

export default Omg;
