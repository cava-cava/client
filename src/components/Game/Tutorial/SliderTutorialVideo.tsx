import React, { FunctionComponent, useState } from "react";
import styles from "./SliderTutorialVideo.module.scss";
import Slider from "react-slick";
import LeftArrow from "../../Arrow/LeftArrow";
import RightArrow from "../../Arrow/RightArrow";
import useTutorial from "../../../hooks/useTutorial";
import { Tutorial } from "../../../store/tutorial/types";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import ReactPlayer from "react-player";
import { FileStrapi } from "../../../server/types/fileStrapi";

type SliderTutorialVideoProps = {
  videoProps: FileStrapi;
};

const SliderTutorialVideo: FunctionComponent<SliderTutorialVideoProps> = ({
  videoProps,
}) => {
  const tutorial: Tutorial = useSelector(
    (state: ApplicationState) => state.tutorial.data
  );    

  const [isLoading, setIsLoading] = useState(true)

  useTutorial();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <RightArrow classname={styles.SliderTutorialArrowRight} />,
    prevArrow: <LeftArrow classname={styles.SliderTutorialArrowLeft} />,
  };

  const toggleLoading = () => {
    setIsLoading(false)
  };

  return (
    <div className={styles.SliderTutorialVideo}>
    {isLoading && <p>Chargement</p>}
      <ReactPlayer
        onStart={() => toggleLoading()}
        url={videoProps.url}
        playing={true}
        loop={false}
        muted={true}
        controls={false}
        playsinline={true}
        width={"95%"}
        height="auto"
        style={{opacity: isLoading ? 0 : 1}}
      />
    </div>
  );
};

export default SliderTutorialVideo;
