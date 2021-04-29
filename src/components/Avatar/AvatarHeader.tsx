import React, {FunctionComponent} from 'react';
import styles from './AvatarHeader.module.scss'

type AvatarHeaderProps = {
    color: string,
    avatarNumber: string,
}


const AvatarHeader: FunctionComponent<AvatarHeaderProps> = ({color, avatarNumber}) => {
    return (
        <div className={styles.AvatarHeader}>
            <img src={`/smiley/${color}/smiley_${avatarNumber}.png`}/>
        </div>
    )
}

export default AvatarHeader;
