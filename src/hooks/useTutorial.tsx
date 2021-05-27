import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {FETCH_TUTORIAL_ERROR, FETCH_TUTORIAL_REQUEST, FETCH_TUTORIAL_SUCCESS, Tutorial} from "../store/tutorial/types";
import {ApplicationState} from "../store";

const useTutorial = () => {
    const dispatch = useDispatch();
    const tutorial:Tutorial = useSelector((state: ApplicationState) => state.tutorial.data)

    /**
     * Fetch Tutorial
     */
    const fetchTutorial = async () => {
        dispatch({type: FETCH_TUTORIAL_REQUEST})
        await axios.get('https://happiness-strapi.herokuapp.com/tutorial').then(({data}) => {
            dispatch({type: FETCH_TUTORIAL_SUCCESS, payload: data})
        }).catch(function (error) {
            console.error(error)
            dispatch({type: FETCH_TUTORIAL_ERROR, payload: error.toString()})
        })
    }

    useEffect(() => {
        if (!tutorial || tutorial.videos.length === 0){
            fetchTutorial()
        }
    }, []);
};

export default useTutorial;
