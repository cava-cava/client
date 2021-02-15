import { useAddToHomescreenPrompt } from "./useAddToHomescreenPrompt";
import {FunctionComponent, useEffect, useState} from "react";

export const AndroidPrompt:FunctionComponent = () => {
    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
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
        <div onClick={hide}>
            <button onClick={hide}>Close</button>
            Hello! Wanna add to homescreen?
            <button onClick={promptToInstall}>Add to homescreen</button>
        </div>
    ) : null;
}
