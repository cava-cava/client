import React, {FormEvent, FunctionComponent} from 'react';
import InputText from "./InputText";
import {SET_NAME} from "../../store/user/types";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import styles from './FormUsername.module.scss'

type FormUsernameProps = {
    name: string,
    showSubmit: boolean
}

const FormUsername: FunctionComponent<FormUsernameProps> = ({name, showSubmit}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (name) {
            history.push('/rooms')
        }
    }

    const setName = (name:string) => {
        dispatch({type: SET_NAME, payload: name})
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.FormUsername}>
            <InputText id={"name"} name={"name"} maxLength={12} placeholder="PseudoCoo1" value={name} setValue={setName}/>
            {showSubmit && <input type="submit" value="Suivant"/>}
        </form>
    )
}

export default FormUsername;
