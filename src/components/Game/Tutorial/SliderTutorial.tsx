import React, {FunctionComponent} from 'react';
import styles from "./SliderTutorial.module.scss"
import Slider from "react-slick";
import tuto1 from '../../../assets/mp4/tuto/tuto1.mp4'
import tuto2 from '../../../assets/mp4/tuto/tuto2.mp4'
import tuto3 from '../../../assets/mp4/tuto/tuto3.mp4'
import tuto4 from '../../../assets/mp4/tuto/tuto4.mp4'
import tuto5 from '../../../assets/mp4/tuto/tuto5.mp4'
import tuto6 from '../../../assets/mp4/tuto/tuto6.mp4'
import tuto7 from '../../../assets/mp4/tuto/tuto7.mp4'
import LeftArrow from "../../Arrow/LeftArrow";
import RightArrow from "../../Arrow/RightArrow";

const SliderTutorial: FunctionComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <RightArrow classname={styles.SliderTutorialArrowRight}/>,
        prevArrow: <LeftArrow classname={styles.SliderTutorialArrowLeft}/>
    };

    return(
        <Slider {...settings} className={styles.SliderTutorial}>
            <div>
                <video src={tuto1} autoPlay={true} loop={false} muted={true} controls={false}/>
            </div>
            <div>
                <video src={tuto2} autoPlay={true} loop={false} muted={true} controls={false}/>
            </div>
            <div>
                <video src={tuto3} autoPlay={true} loop={false} muted={true} controls={false}/>
            </div>
            <div>
                <video src={tuto4} autoPlay={true} loop={false} muted={true} controls={false}/>
            </div>
            <div>
                <video src={tuto5} autoPlay={true} loop={false} muted={true} controls={false}/>
            </div>
            <div>
                <video src={tuto6} autoPlay={true} loop={false} muted={true} controls={false}/>
            </div>
            <div>
                <video src={tuto7} autoPlay={true} loop={false} muted={true} controls={false}/>
            </div>
        </Slider>
    )
}

export default SliderTutorial;
