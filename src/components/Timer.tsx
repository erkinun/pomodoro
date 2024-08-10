import { useEffect, useRef, useState } from "react";
import { TimerFace } from "./TimerFace";
import { CircleProgressBar } from "./CircleProgress";

export type TimerProps = {
  seconds?: number;
  minutes?: number;
};

// TODO timer sound
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
    // TODO handle the case where remaining is 0, maybe another button to restart etc?
    setEndTime(Date.now() + remaining * 1000);
    setStopped(false);
  };

  // TODO handle the milliseconds later on
  useEffect(() => {
    if (!stopped) {
      // set an interval for 100ms
      const intervalId = setInterval(checkTimer, 100);
      intervalIdRef.current = intervalId;
      return () => clearInterval(intervalId);
    }
  }, [seconds, remaining, stopped]);

  return (
    <div className="w-full border border-slate-100 rounded p-2">
      <div>Timer for {seconds} seconds</div>
      <CircleProgressBar remaining={remaining} />
      <TimerFace remaining={remaining} />
      {stopped || remaining === 0 ? (
        <button onClick={restartTimer}>Restart timer</button>
      ) : (
        <button onClick={stopTimer}>Stop timer</button>
      )}
    </div>
  );
}
