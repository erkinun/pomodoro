import { useEffect, useRef, useState } from "react";

type TimerProps = {
  seconds?: number;
  minutes?: number;
};

// 1 add a good timer digital face, with a nice font that shows remaning minutes:seconds:milliseconds
// 2 TODO add good styling, maybe a clock face, start with a radial div turning to the remaining ratio, like the apple timer
export function Timer({ seconds = 30 }: TimerProps) {
  // TODO add minutes and maybe hours later on
  // TODO show in milliseconds maybe?

  // TODO would these get updated if we didn't use state, it shouldn't but if the component gets re rendered, it would
  const [stopped, setStopped] = useState(false);
  const [remaining, setRemaining] = useState(seconds);
  const [endTime, setEndTime] = useState(Date.now() + seconds * 1000);
  const intervalIdRef = useRef<number | null>(null);

  const checkTimer = () => {
    const now = Date.now();
    if (now >= endTime) {
      setRemaining(0);
      clearInterval(intervalIdRef.current ?? undefined);
    } else {
      setRemaining(Math.floor((endTime - now) / 1000));
    }
  };

  const stopTimer = () => {
    clearInterval(intervalIdRef.current ?? undefined);
    setStopped(true);
  };

  const restartTimer = () => {
    setEndTime(Date.now() + remaining * 1000);
    setStopped(false);
    // const intervalId = setInterval(checkTimer, 100);
    // intervalIdRef.current = intervalId;
  };

  useEffect(() => {
    console.log({ remaining, stopped, intervalId: intervalIdRef.current });
    if (!stopped) {
      // set an interval for 100ms
      const intervalId = setInterval(checkTimer, 100);
      intervalIdRef.current = intervalId;
      return () => clearInterval(intervalId);
    }
  }, [seconds, remaining, stopped]);

  return (
    <div>
      <div>Timer for {seconds} seconds</div>
      <div>Remaining: {remaining}</div>
      {stopped ? (
        <button onClick={restartTimer}>Restart timer</button>
      ) : (
        <button onClick={stopTimer}>Stop timer</button>
      )}
    </div>
  );
}
