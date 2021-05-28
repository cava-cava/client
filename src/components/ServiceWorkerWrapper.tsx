import React, {FunctionComponent, useEffect} from 'react';
import * as serviceWorker from '../serviceWorkerRegistration';
import styles from "./ServiceWorkerWrapper.module.scss";

const ServiceWorkerWrapper: FunctionComponent = () => {
    const [showReload, setShowReload] = React.useState(false);
    const [waitingWorker, setWaitingWorker] = React.useState<ServiceWorker | null>(null);

    const onSWUpdate = (registration: ServiceWorkerRegistration) => {
        setShowReload(true);
        setWaitingWorker(registration.waiting);
    };

    useEffect(() => {
        serviceWorker.register({onUpdate: onSWUpdate});
    }, []);

    const reloadPage = () => {
        waitingWorker?.postMessage({type: 'SKIP_WAITING'});
        setShowReload(false);
        window.location.reload(true);
    };

    return showReload ? (
        <div className={styles.ServiceWorkerWrapper} onClick={reloadPage}>
            <p>Une nouvelle version est disponible!</p>
            <button onClick={reloadPage}>Mettre à jour</button>
        </div>
    ) : null;
}

export default ServiceWorkerWrapper;
