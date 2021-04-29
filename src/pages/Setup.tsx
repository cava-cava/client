import React from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import styles from './Setup.module.scss'
import AvatarHeader from "../components/Avatar/AvatarHeader";
import SelectAvatar from "../components/Avatar/SelectAvatar";
import FormUsername from "../components/Form/FormUsername";

const Setup = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);

    return (
        <div className={styles.Setup}>
            <div>
                <div>
                    <AvatarHeader color={"noir"} avatarNumber={user.avatar} />
                    <SelectAvatar color={"noir"} />
                </div>
               <FormUsername name={user.name} showSubmit={true}/>
            </div>
        </div>
    );
}

export default Setup;
