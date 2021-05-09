import React, {FunctionComponent} from 'react';
import useMessage from "../../hooks/useMessage";

const MessageGame: FunctionComponent = () => {
    const {message, color} = useMessage()

    return (message && message.length > 0) ? (<p style={{color: color}}>{message}</p>) : null
}

export default MessageGame;
