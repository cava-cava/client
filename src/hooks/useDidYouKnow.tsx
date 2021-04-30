import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {FETCH_KNOWS_ERROR, FETCH_KNOWS_REQUEST, FETCH_KNOWS_SUCCESS, Know} from "../store/knows/types";
import {shuffle} from "../mixins/shuffle";
import {ApplicationState} from "../store";

const DidYouKnow = () => {
    const dispatch = useDispatch();
    const knows:Know[] = useSelector((state: ApplicationState) => state.knows.data)

    /**
     * Fetch Knows
     */
    const fetchKnows = async () => {
        dispatch({type: FETCH_KNOWS_REQUEST})
        await axios.get('https://happiness-strapi.herokuapp.com/did-you-knows').then(({data}) => {
            dispatch({type: FETCH_KNOWS_SUCCESS, payload: shuffle(data)})
        }).catch(function (error) {
            console.error(error)
            dispatch({type: FETCH_KNOWS_ERROR, payload: error.toString()})
        })
    }

    useEffect(() => {
        if (!knows || knows.length <= 0) {
            fetchKnows()
        } else dispatch({type: FETCH_KNOWS_SUCCESS, payload: shuffle(knows)})
    }, []);
};

export default DidYouKnow;
