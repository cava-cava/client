import React, {FunctionComponent} from 'react';
import styles from './SliderAvatar.module.scss'
import {useDispatch} from "react-redux";
import {SET_AVATAR} from "../../store/user/types";
import AvatarHeader from "./AvatarHeader";
import LeftArrow from "../Arrow/LeftArrow";
import RightArrow from "../Arrow/RightArrow";

type SliderAvatarProps = {
    color: string
    avatarNumber: string
}

const SliderAvatar: FunctionComponent<SliderAvatarProps> = ({color, avatarNumber}) => {
    const dispatch = useDispatch();

    const setAvatar = (value:number) => {
        let number = parseInt(avatarNumber) + value
        if(number <= 0) number = 6
        else if(number >= 7) number = 1
        dispatch({type: SET_AVATAR, payload: number.toString()})
    }

    return (
        <div className={styles.SliderAvatar}>
            <LeftArrow onClick={() => setAvatar(-1)}/>
            <AvatarHeader color={color} avatarNumber={avatarNumber} />
            <RightArrow onClick={() => setAvatar(+1)}/>
        </div>
    )
}

export default SliderAvatar;
