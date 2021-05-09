import React, {FunctionComponent, useEffect, useState} from 'react';
import CardsGame from "./CardsGame";
import TheGuess from "./Guess/TheGuess";
import OhMyGod from "./OhMyGod";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import useListUsers from "../../hooks/useListUsers";
import {SET_USER, User} from "../../store/user/types";
import {Guess} from "../../server/types/guess";
import {socket} from "../../socketClient";

type TheGameProps = {
    roomId: string
}

const TheGame: FunctionComponent<TheGameProps> = ({roomId}) => {
    const dispatch = useDispatch()
    const user = useSelector((state: ApplicationState) => state.user.data);
    const users = useListUsers(roomId);
    const [player, setPlayer] = useState<User>();
    const [guess, setGuess] = useState<Guess>();
    const [triggerGuesses, setTriggerGuesses] = useState(false);
    const [triggerOMG, setTriggerOMG] = useState(false);

    useEffect(() => {
        const getPlayer = (player: User) => {
            setPlayer(player)
        }

        const sendGuess = (guess: Guess) => {
            setGuess(guess)
        }

        const eventRound = (triggerGuesses: boolean, triggerOMG: boolean) => {
            setTriggerGuesses(triggerGuesses)
            setTriggerOMG(triggerOMG)
        }

        const checkpoint = (user:User) => {
            dispatch({type: SET_USER, payload: user});
        }

        socket.on('getPlayer', getPlayer);
        socket.on('sendGuess', sendGuess);
        socket.on('startRoundEvent', eventRound);
        socket.on('endRoundEvent', eventRound);
        socket.on('checkpoint', checkpoint);
        return () => {
            socket.off('getPlayer', getPlayer);
            socket.off('sendGuess', sendGuess);
            socket.off('startRoundEvent', eventRound);
            socket.off('endRoundEvent', eventRound);
            socket.off('checkpoint', checkpoint);
            setPlayer(undefined)
            setGuess(undefined)
        };
    }, [])

    return (
        <>
            { (!triggerGuesses && !triggerOMG) && <CardsGame users={users} player={player} user={user} roomId={roomId}/>}
            { (triggerGuesses && !triggerOMG) && <TheGuess roomId={roomId} question={guess?.question} users={users} userKey={user.key}/> }
            { (triggerOMG && !triggerGuesses) && <OhMyGod roomId={roomId} userKey={user.key}/> }
        </>
    )
}

export default TheGame;
