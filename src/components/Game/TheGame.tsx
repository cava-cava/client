import React, {FunctionComponent, useEffect, useState} from 'react';
import CardsGame from "./CardsGame";
import TheGuess from "./Guess/TheGuess";
import TheOmg from "./Omg/TheOmg";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import useListUsers from "../../hooks/useListUsers";
import {SET_USER, User} from "../../store/user/types";
import {Guess} from "../../server/types/guess";
import {socket} from "../../socketClient";
import {Omg} from "../../server/types/omg";
import TheTutorial from "./TheTutorial";
import DisconnectedUsers from "../Users/DisconnectedUsers";

type TheGameProps = {
    roomId: string
}

const TheGame: FunctionComponent<TheGameProps> = ({roomId}) => {
    const dispatch = useDispatch()
    const user = useSelector((state: ApplicationState) => state.user.data);
    const users = useListUsers(roomId);
    const [player, setPlayer] = useState<User>();
    const [guess, setGuess] = useState<Guess>();
    const [omg, setOmg] = useState<Omg>();
    const [triggerGuesses, setTriggerGuesses] = useState(false);
    const [triggerOMG, setTriggerOMG] = useState(false);
    const [isUsersDisconnected, setIsUsersDisconnected] = useState<boolean>(false);
    const usersDisconnected = useListUsers(roomId, 'updateListUsersDisconnected', 'getListUsersDisconnectedInRoom')


    useEffect(() => {
        const getPlayer = (player: User) => {
            setPlayer(player)
        }

        const sendGuess = (guess: Guess) => {
            setGuess(guess)
        }

        const sendOmg = (omg: Omg) => {
            setOmg(omg)
        }

        const eventRound = (triggerGuesses: boolean, triggerOMG: boolean) => {
            setTriggerGuesses(triggerGuesses)
            setTriggerOMG(triggerOMG)
        }

        const checkpoint = (user:User) => {
            dispatch({type: SET_USER, payload: user});
        }

        const userDisconnected = (isDisconnected: boolean) => {
            setIsUsersDisconnected(isDisconnected);
        };

        socket.emit("userDisconnected", roomId);
        socket.on("userDisconnected", userDisconnected);

        socket.emit('getRoundEvent', roomId);
        socket.on('getPlayer', getPlayer);
        socket.on('sendGuess', sendGuess);
        socket.on('sendOmg', sendOmg);
        socket.on('startRoundEvent', eventRound);
        socket.on('endRoundEvent', eventRound);
        socket.on('checkpoint', checkpoint);
        return () => {
            socket.off('getPlayer', getPlayer);
            socket.off('sendGuess', sendGuess);
            socket.off('sendOmg', sendOmg);
            socket.off('startRoundEvent', eventRound);
            socket.off('endRoundEvent', eventRound);
            socket.off('checkpoint', checkpoint);
            socket.off("userDisconnected", userDisconnected);
            setIsUsersDisconnected(false);
            setPlayer(undefined)
            setGuess(undefined)
            setOmg(undefined)
        };
    }, [])

    return(
        <>
            {isUsersDisconnected && <DisconnectedUsers roomId={roomId} users={usersDisconnected}/>}
            { (!user.isReady) && <TheTutorial roomId={roomId} userKey={user.key}/>}
            { (user.isReady && !triggerGuesses && !triggerOMG) && <CardsGame users={users} player={player} user={user} roomId={roomId}/>}
            { (user.isReady && triggerGuesses && !triggerOMG) && <TheGuess roomId={roomId} question={guess?.question} users={users} userKey={user.key}/> }
            { (user.isReady && triggerOMG && !triggerGuesses) && <TheOmg roomId={roomId} userKey={user.key} users={users} omg={omg}/> }
        </>
    )
}

export default TheGame;
