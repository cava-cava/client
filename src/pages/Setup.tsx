import React, {FormEvent, useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {SET_NAME} from "../store/user/types";
import styles from './Setup.module.scss'
import InputText from "../components/Form/InputText";

const Setup = () => {
    const history = useHistory();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState('1')
    const dispatch = useDispatch();

    useEffect(() => {
        if(name) history.push('/rooms')
    }, []);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(name) {
            dispatch({type: SET_NAME, payload: name})
            history.push('/rooms')
        }
    }

    return (
        <div className={styles.Setup}>
            <div>
                <div>
                    <div>
                        <img src={`/smiley/noir/smiley_${avatar}.png`}/>
                    </div>
                    <div>
                        <button onClick={() => setAvatar('1')}><img src={`/smiley/noir/smiley_1.png`}/></button>
                        <button onClick={() => setAvatar('2')}><img src={`/smiley/noir/smiley_2.png`}/></button>
                        <button onClick={() => setAvatar('3')}><img src={`/smiley/noir/smiley_3.png`}/></button>
                        <button onClick={() => setAvatar('4')}><img src={`/smiley/noir/smiley_4.png`}/></button>
                    </div>
                    <div>
                        <button onClick={() => setAvatar('5')}><img src={`/smiley/noir/smiley_5.png`}/></button>
                        <button onClick={() => setAvatar('6')}><img src={`/smiley/noir/smiley_6.png`}/></button>
                    </div>
                </div>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <InputText id={"name"} name={"name"} maxLength={12} placeholder="PseudoCoo1" value={name} setValue={setName} />
                    <input type="submit" value="Suivant"/>
                </form>
            </div>
        </div>
    );
}

export default Setup;
