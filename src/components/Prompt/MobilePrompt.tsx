import {FunctionComponent} from "react";
import {AndroidPrompt} from "./AndroidPrompt";
// @ts-ignore
import PWAPrompt from "react-ios-pwa-prompt"

export const MobilePrompt:FunctionComponent = () => {

    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

    return isMobile ? (
        <>
            <AndroidPrompt />
            <PWAPrompt />
        </>
) : null;
}
