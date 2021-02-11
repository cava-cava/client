import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {SET_NAME} from "../store/user/types";

const Setup = () => {
    const history = useHistory();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const [name, setName] = useState(user.name);
    const dispatch = useDispatch()

    useEffect(() => {
        if(name) history.push('/rooms')
    }, []);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = (event: FormEvent) => {
        dispatch({type: SET_NAME, payload: name})
        event.preventDefault();
        history.push('/rooms')
    }
    return (
        <div className="setup">
            <h1>Setup</h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" maxLength={12} placeholder="PseudoCool74" value={name} onChange={handleChange}/>
                <input type="submit" value="Démarrez"/>
            </form>
        </div>
    );
}

export default Setup;
