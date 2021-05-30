import React, {FunctionComponent} from 'react';
import styles from './CodeHeader.module.scss'
import useCopyClipboard from "../../hooks/useCopyClipboard";

type CodeHeaderProps = {
    roomId: string
}

const CodeHeader: FunctionComponent<CodeHeaderProps> = ({roomId}) => {
    const [isCopied, setCopied] = useCopyClipboard(roomId, {
        successDuration: 1000,
    });

    return (<button className={styles.CodeHeader} onClick={setCopied}>{isCopied ? 'Copié' : roomId}</button>)
}

export default CodeHeader;
