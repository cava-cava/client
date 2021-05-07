import React, {FunctionComponent} from 'react';
import styles from './SettingsModalCredits.module.scss'
import gobelins from '../../../assets/png/gobelins.png'
import cci from '../../../assets/png/cci.png'

const SettingsModalCredits: FunctionComponent = () => {
    return (
        <div className={styles.SettingsModalCredits}>
            <h2>Crédits</h2>
            <div>
                <div>
                    <h3>Développeurs</h3>
                    <a href="http://leogeneret.fr/" target="_blank">Léo Generet</a>
                    <a href="https://www.julienvanroy.fr/" target="_blank">Julien Vanroy</a>
                </div>
                <div>
                    <h3>Designers</h3>
                    <a href="https://elisamasfrand.myportfolio.com/" target="_blank">Élise Masfrand</a>
                    <a href="https://www.instagram.com/saana_malek/" target="_blank">Saana Malek</a>
                </div>
            </div>
            <div>
                <img src={gobelins} alt="Ecole de l'image GOBELINS"/>
                <img src={cci} alt="CCI Paris Ile-de-France"/>
            </div>
        </div>
    )
}

export default SettingsModalCredits;
