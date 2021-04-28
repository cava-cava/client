import React, {FunctionComponent} from 'react';
import styles from './ErrorMessage.module.scss'

type ErrorMessageProps = {
    error: string
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({error}) => {
    return (error && error.length > 0) ? (<div className={styles.ErrorMessage}>{error}</div>) : null
}

export default ErrorMessage;
