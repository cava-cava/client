import {FunctionComponent} from "react";
import {AndroidPrompt} from "./AndroidPrompt";
// @ts-ignore
import PWAPrompt from "react-ios-pwa-prompt"

export const MobilePrompt: FunctionComponent = () => {

    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    const title = "Ajouter à l'écran d'accueil";
    const body = "Ce site Web a une fonctionnalité d'application. Ajoutez-le à votre écran d'accueil pour l'utiliser en plein écran.";
    const close = "Annuler";

    return isMobile ? (
        <>
            <AndroidPrompt body={body} addHomeButtonLabel={title} closePrompt={close}/>
            <PWAPrompt copyTitle={title}
                       copyBody={body}
                       copyShareButtonLabel="1) Appuyez sur le bouton 'Partager'"
                       copyAddHomeButtonLabel="2) Appuyez sur 'Ajouter à l'écran d'accueil'"
                       copyClosePrompt={close}/>
        </>
    ) : null;
}
