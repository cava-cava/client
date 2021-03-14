import { useAddToHomeScreenPrompt } from "../../hooks/useAddToHomescreenPrompt";
import {FunctionComponent, useEffect, useState} from "react";
import styles from './AndroidPrompt.module.scss'

type AndroidPrompt = {
    body: string,
    addHomeButtonLabel:string,
    closePrompt: string
}

export const AndroidPrompt:FunctionComponent<AndroidPrompt> = ({body,addHomeButtonLabel,closePrompt}) => {
    const [prompt, promptToInstall] = useAddToHomeScreenPrompt();
    const [isVisible, setVisibleState] = useState(false);

    const hide = () => setVisibleState(false);

    useEffect(
        () => {
            if (prompt) {
                setVisibleState(true);
            }
        },
        [prompt]
    );

    return isVisible ? (
        <div className={styles.AndroidPrompt} onClick={hide}>
            <div>
                <p>{body}</p>
            </div>
            <div>
                <button onClick={hide}>{closePrompt}</button>
                <button onClick={promptToInstall}>{addHomeButtonLabel}</button>
            </div>
        </div>
    ) : null;
}
