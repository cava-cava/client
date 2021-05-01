import React, {FunctionComponent} from 'react';
import styles from './TitleImg.module.scss'

type TitleImgProps = {
    src: string
}

const TitleImg: FunctionComponent<TitleImgProps> = ({src}) => {
    return (<img className={styles.TitleImg} src={src}/>)
}

export default TitleImg;
