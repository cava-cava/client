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
  playing: boolean
};

const SliderTutorialVideo: FunctionComponent<SliderTutorialVideoProps> = ({
  videoProps,
  playing
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const toggleLoading = () => {
    setIsLoading(false)
  };

  return (
    <div className={styles.SliderTutorialVideo}>
    {isLoading && <p>Chargement</p>}
      <ReactPlayer
        onStart={() => toggleLoading()}
        url={videoProps.url}
        playing={playing}
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
