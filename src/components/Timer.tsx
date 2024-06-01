import { useEffect, useRef, useState } from "react";

type TimerProps = {
  seconds?: number;
  minutes?: number;
};

// TODO add continue timer button
// TODO add good styling, maybe a clock face?
export function Timer({ seconds = 30 }: TimerProps) {
  // TODO add minutes and maybe hours later on
  // TODO show in milliseconds maybe?

  // TODO would these get updated if we didn't use state, it shouldn't but if the component gets re rendered, it would

  const [remaining, setRemaining] = useState(seconds);
  const [endTime] = useState(Date.now() + seconds * 1000);
  const intervalIdRef = useRef<number | null>(null);

  const checkTimer = () => {
    const now = Date.now();
    if (now >= endTime) {
      console.log("we should be here?");
      setRemaining(0);
      clearInterval(intervalIdRef.current ?? undefined);
    } else {
      setRemaining(Math.floor((endTime - now) / 1000));
    }
  };

  const stopTimer = () => {
    clearInterval(intervalIdRef.current ?? undefined);
  };

  useEffect(() => {
    // set an interval for 100ms
    const intervalId = setInterval(checkTimer, 100);
    intervalIdRef.current = intervalId;
    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <div>
      <div>Timer for {seconds} seconds</div>
      <div>Remaining: {remaining}</div>
      <button onClick={stopTimer}>Stop timer</button>
    </div>
  );
}
