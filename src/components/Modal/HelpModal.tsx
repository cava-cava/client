import React, {FunctionComponent, useEffect} from 'react';
import TheModal from "./TheModal";
import title from '../../assets/title/regles.png'
import styles from './HelpModal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import axios from "axios";
import {FETCH_RULES_ERROR, FETCH_RULES_REQUEST, FETCH_RULES_SUCCESS, Rules} from "../../store/rules/types";
import HelpModalCards from "./Sub-Modal/HelpModalCards";
import arrow from "../../assets/svg/arrow.svg";

type HelpModalProps = {
    isShowing: boolean
    hide: () => void
}

const HelpModal: FunctionComponent<HelpModalProps> = ({isShowing, hide}) => {
    const dispatch = useDispatch();
    const rules:Rules = useSelector((state: ApplicationState) => state.rules.data)

    /**
     * Fetch Rules
     */
    const fetchRules = async () => {
        dispatch({type: FETCH_RULES_REQUEST})
        await axios.get('https://happiness-strapi.herokuapp.com/rules').then(({data}) => {
            dispatch({type: FETCH_RULES_SUCCESS, payload: data})
        }).catch(function (error) {
            console.error(error)
            dispatch({type: FETCH_RULES_ERROR, payload: error.toString()})
        })
    }

    useEffect(() => {
        if (rules && Object.keys(rules).length === 0) fetchRules()
    }, []);

    return (
        <TheModal
            isShowing={isShowing}
            hide={hide}
            title={title}
        >
            <div className={styles.HelpModal}>
                { (rules && rules.But) &&
                    <div>
                        <h2>Le but :</h2>
                        <p>{rules.But}</p>
                    </div>
                }
                { (rules && rules.Cards) && <HelpModalCards cards={rules.Cards}/> }
                { (rules && rules.Deroulement) &&
                    <div>
                        <h2>Le deroulement :</h2>
                        <div dangerouslySetInnerHTML={{
                            __html: rules.Deroulement
                        }}/>
                    </div>
                }
                <span><img src={arrow}/></span>
            </div>
        </TheModal>
    )
}

export default HelpModal;
