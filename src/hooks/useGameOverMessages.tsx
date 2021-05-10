import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {FETCH_MESSAGES_ERROR, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, Message} from "../store/messages/types";

const useGameOverMessages = () => {
    const dispatch = useDispatch();
    const messages: Message[] = useSelector((state: ApplicationState) => state.messages.data)

    /**
     * Fetch End Messages
     */
    const fetchMessages = async () => {
        dispatch({type: FETCH_MESSAGES_REQUEST})
        await axios.get('https://happiness-strapi.herokuapp.com/game-overs').then(({data}) => {
            dispatch({
                type: FETCH_MESSAGES_SUCCESS,
                payload: data.sort((a: Message, b: Message) => (a.position > b.position) ? 1 : -1)
            })
        }).catch(function (error) {
            console.error(error)
            dispatch({type: FETCH_MESSAGES_ERROR, payload: error.toString()})
        })
    }

    useEffect(() => {
        if (!messages || messages.length <= 0) {
            fetchMessages()
        }
    }, []);
};

export default useGameOverMessages;
