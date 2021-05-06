import React, { FunctionComponent, useEffect } from 'react';
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
        serviceWorker.register({ onUpdate: onSWUpdate });
    }, []);

    const reloadPage = () => {
        waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
        setShowReload(false);
        window.location.reload(true);
    };

    return showReload ? (
        <div className={styles.ServiceWorkerWrapper} onClick={reloadPage}>
            <div>
                <p>A new version is available!</p>
            </div>
            <div>
                <button onClick={reloadPage}>Update</button>
            </div>
        </div>
    ) : null;
}

export default ServiceWorkerWrapper;
