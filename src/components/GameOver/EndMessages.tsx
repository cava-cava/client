import React, {FunctionComponent, useEffect, useState} from "react";
import {Message} from "../../store/messages/types";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import EndMessage from "./EndMessage";

type EndMessagesProps = {
    gameOver: string[],
}

const EndMessages: FunctionComponent<EndMessagesProps> = ({gameOver}) => {
    const messages: Message[] = useSelector((state: ApplicationState) => state.messages.data)
    const [gameOverMessages, setGameOverMessages] = useState<Message[]>([])

    useEffect(() => {
        const allGameOverMessages = (messages.filter(message => gameOver.indexOf(message.key) !== -1))
        allGameOverMessages.length = 2
        setGameOverMessages(allGameOverMessages)
        return () => {
            setGameOverMessages([])
        }
    }, []);
    return (
        <>
            {gameOverMessages.map((gameOverMessage, index) => <EndMessage key={index} title={gameOverMessage.title} description={gameOverMessage.description}/>)}
        </>
    )
}

export default EndMessages;
