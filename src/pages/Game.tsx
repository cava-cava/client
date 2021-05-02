import React, { useEffect, useState } from "react";
import styles from "./Game.module.scss";
import { RouteParams } from "../types/params";
import { useParams } from "react-router";
import { socket } from "../socketClient";
import useRedirect from "../hooks/useRedirect";
import TheGame from "../components/Game/TheGame";
import CodeHeader from "../components/Code/CodeHeader";

const Game = () => {
  const { id }: RouteParams = useParams();
  const [isUsersDisconnected, setIsUsersDisconnected] = useState<boolean>(
    false
  );

  useRedirect();

  useEffect(() => {
    const userDisconnected = (isDisconnected: boolean) => {
      setIsUsersDisconnected(isDisconnected);
    };

    socket.on("userDisconnected", userDisconnected);

    socket.emit("userDisconnected", id);
    return () => {
      socket.off("userDisconnected", userDisconnected);
      setIsUsersDisconnected(false);
    };
  }, []);

  return (
    <div className={styles.Game}>
      <div className={styles.GameInner}>
        {isUsersDisconnected ? (
          <div className={styles.GameDisconnected}>
            <CodeHeader roomId={id} />
            <div>Quelqu’un est déconnecté, Veuillez patienter</div>
          </div>
        ) : (
          <TheGame roomId={id} />
        )}
      </div>
    </div>
  );
};

export default Game;
