import React from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import styles from './Setup.module.scss'
import SelectAvatar from "../components/Avatar/SelectAvatar";
import FormUsername from "../components/Form/FormUsername";
import SliderAvatar from "../components/Avatar/SliderAvatar";

const Setup = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);

    return (
        <div className={styles.Setup}>
            <div>
                <div>
                    <SliderAvatar color={'black'} avatarNumber={user.avatar}/>
                    <SelectAvatar color={"black"} avatarNumber={user.avatar}/>
                </div>
               <FormUsername name={user.name} showSubmit={true}/>
            </div>
        </div>
    );
}

export default Setup;
