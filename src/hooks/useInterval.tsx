import React, { useEffect, useRef } from 'react';

function useInterval(callback:()=>void, delay:number) {
  const savedCallback:any = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
}

export default useInterval
