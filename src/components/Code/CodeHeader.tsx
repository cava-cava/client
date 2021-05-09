import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import styles from './CodeHeader.module.scss'

type CodeHeaderProps = {
    roomId: string
}

const CodeHeader: FunctionComponent<CodeHeaderProps> = ({roomId}) => {
    const idRef = useRef<any>();
    const [isCopied, setIsCopied] = useState(false)

    const copyClick = () => {
        navigator.clipboard.writeText(roomId)
        if(!isCopied) setIsCopied(true)
        else clearTimeout(idRef.current)
        const id = setTimeout(() => {setIsCopied(false);}, 1000);
        if (null !== idRef.current) {
            idRef.current = id;
        }
    }


    useEffect(() => {
        return () => {
            clearTimeout(idRef.current)
        };
    }, []);

    return (<button className={styles.CodeHeader} onClick={copyClick}>{isCopied ? 'Copié' : roomId}</button>)
}

export default CodeHeader;
