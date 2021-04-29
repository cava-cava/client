import React, {FunctionComponent} from 'react';
import styles from './SelectAvatar.module.scss'
import {useDispatch} from "react-redux";
import {SET_AVATAR} from "../../store/user/types";

type SelectAvatarProps = {
    color: string
}

const SelectAvatar: FunctionComponent<SelectAvatarProps> = ({color}) => {
    const dispatch = useDispatch();

    const setAvatar = (value: string) => {
        dispatch({type: SET_AVATAR, payload: value})
    }

    return (
        <div className={styles.SelectAvatar}>
            <div>
                <button onClick={() => setAvatar('1')}><img src={`/smiley/${color}/smiley_1.png`}/></button>
                <button onClick={() => setAvatar('2')}><img src={`/smiley/${color}/smiley_2.png`}/></button>
                <button onClick={() => setAvatar('3')}><img src={`/smiley/${color}/smiley_3.png`}/></button>
                <button onClick={() => setAvatar('4')}><img src={`/smiley/${color}/smiley_4.png`}/></button>
            </div>
            <div>
                <button onClick={() => setAvatar('5')}><img src={`/smiley/${color}/smiley_5.png`}/></button>
                <button onClick={() => setAvatar('6')}><img src={`/smiley/${color}/smiley_6.png`}/></button>
            </div>
        </div>
    )
}

export default SelectAvatar;
