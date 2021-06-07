import React, {FunctionComponent} from 'react';
import styles from "./SliderTutorial.module.scss"
import Slider from "react-slick";
import LeftArrow from "../../Arrow/LeftArrow";
import RightArrow from "../../Arrow/RightArrow";
import useTutorial from "../../../hooks/useTutorial";
import {Tutorial} from "../../../store/tutorial/types";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import ReactPlayer from "react-player";
import SliderTutorialVideo from '../Tutorial/SliderTutorialVideo'

const SliderTutorial: FunctionComponent = () => {
    const tutorial: Tutorial = useSelector((state: ApplicationState) => state.tutorial.data)

    useTutorial();

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <RightArrow classname={styles.SliderTutorialArrowRight}/>,
        prevArrow: <LeftArrow classname={styles.SliderTutorialArrowLeft}/>
    };

    return (
        <Slider {...settings} className={styles.SliderTutorial}>
            {
                tutorial.videos.map((video, index) =>
                    <SliderTutorialVideo key={index} videoProps={video}  />
                )
            }
        </Slider>
    )
}

export default SliderTutorial;
