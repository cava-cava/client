import React, {FunctionComponent, useEffect, useState} from 'react';
import axios from 'axios'
import styles from './TheCards.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

type CardsProps = {
    cards?: []
}

const Cards: FunctionComponent<CardsProps> = ({}) => {
    const [cards, setCards] = useState([])

    useEffect(() => {
    axios.get('http://localhost:1337/cards')
    .then(response => {
        console.log(response.data)
        setCards(response.data)
    })
    }, [])



    return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1.2}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      centeredSlides={true}
    //   className={'swiper-lol'}
      className={styles.swiper}
    //   autoHeight={true}
    >
    {cards.map((card:any) => {
        return (
        <SwiperSlide className={styles.Card}>
            <div className={styles.cardWrapper}>
                {card.Description}
                <br />
                <div className={styles.points}>{card.Points} points</div>
            </div>
        </SwiperSlide>
        )
    })}
    </Swiper>
    )
}

export default Cards;
