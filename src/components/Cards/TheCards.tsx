import React, {FunctionComponent, useEffect, useState} from 'react';
import axios from 'axios'
import styles from './TheCards.module.scss'
import 'swiper/swiper.scss';
import { Card } from '../../server/types/card';

interface TheCardsProps extends Card {
    cards?: string,
}



const TheCards: FunctionComponent<TheCardsProps> = ({Description}) => {

    return (
        <div className='Card'>
            {Description}
        </div>
    )
}

export default TheCards;
