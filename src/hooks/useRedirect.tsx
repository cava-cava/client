import React, { useEffect } from 'react';
import {socket} from "../socketClient";
import {useHistory} from "react-router";

const useRedirect = () => {
  const history = useHistory();

  useEffect(() => {
    const redirect = (path: string) => history.push(path)

    socket.on('redirect', redirect);

    return () => {
      socket.off('redirect', redirect);
    }
  }, []);
}

export default useRedirect
