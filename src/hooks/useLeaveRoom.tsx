import React, { useEffect } from 'react';
import {socket} from "../socketClient";

const useLeaveRoom = () => {

  useEffect(() => {
    socket.emit("leaveRoom");
  }, []);
}

export default useLeaveRoom
