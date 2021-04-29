import React, {FormEvent, FunctionComponent, useState} from 'react';
import InputText from "./InputText";
import {SET_NAME} from "../../store/user/types";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import styles from './FormUsername.module.scss'
import ErrorMessage from "./ErrorMessage";

type FormUsernameProps = {
    name: string,
    showSubmit: boolean
    maxLength?: number
}

const FormUsername: FunctionComponent<FormUsernameProps> = ({name, showSubmit, maxLength= 12}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (name) {
            history.push('/rooms')
        }else setError('Entrez un pseudo')
    }

    const keypressEvent = () => {
        if(!maxLength) return
        if(name.length >= maxLength) {
            if(showError) setError(`Maximum ${maxLength} caractères`)
            else setShowError(true)
        } else {
            if(error && error.length > 0) setError(``)
            if(showError) setShowError(false)
        }
    }

    const setName = (name:string) => {
        dispatch({type: SET_NAME, payload: name})
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit} onKeyUp={keypressEvent} className={styles.FormUsername}>
            <InputText id={"name"} name={"name"} maxLength={maxLength} placeholder="PseudoCoo1" value={name} setValue={setName} hasError={!!(error && error.length > 0)}/>
            <ErrorMessage error={error} />
            {showSubmit && <input type="submit" value="Suivant"/>}
        </form>
    )
}

export default FormUsername;
