import React, {FunctionComponent} from 'react';
import styles from './QrCodeApp.module.scss'
import qr from '../../assets/png/qr.png'
const QrCodeApp: FunctionComponent = () => {
    return (
        <div className={styles.QrCodeApp}>
            <img src={qr} alt="Télécharger"/>
            <div>
                <p>Jeu optimisé sur mobile.</p>
                <p>Scannez le QR code ci-contre pour jouer !</p>
            </div>
        </div>
    )
}

export default QrCodeApp;
