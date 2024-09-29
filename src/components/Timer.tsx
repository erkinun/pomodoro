import { useEffect, useRef, useState } from "react";
import { TimerFace } from "./TimerFace";
import { CircleProgressBar } from "./CircleProgress";
import beep from "../assets/sounds/beep.mp3";

export type TimerProps = {
  seconds?: number;
  minutes?: number;
};

function TimerBtn({
  onClick,
  text,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}) {
  return (
    <button
      className="block p-2 rounded border border-gray-300 hover:bg-gray-300 "
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// 2 TODO add good styling
export function Timer({ seconds = 30 }: TimerProps) {
  // TODO add minutes and maybe hours later on
  // TODO show in milliseconds maybe?

  // TODO would these get updated if we didn't use state, it shouldn't but if the component gets re rendered, it would
  const [stopped, setStopped] = useState(false);
  const [remaining, setRemaining] = useState(seconds);
  const [endTime, setEndTime] = useState(Date.now() + seconds * 1000);
  const intervalIdRef = useRef<number | null>(null);

  const alarm = new Audio(beep);
  const checkTimer = () => {
    const now = Date.now();
    if (now >= endTime) {
      setRemaining(0);
      alarm.play(); // TODO better place to do these stuff?
      clearInterval(intervalIdRef.current ?? undefined);
    } else {
      setRemaining(Math.floor((endTime - now) / 1000));
    }
  };

  const stopTimer = () => {
    alarm.pause();
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
      return () => {
        alarm.pause();
        clearInterval(intervalId);
      };
    }
  }, [seconds, remaining, stopped]);

  return (
    <div className="w-full border border-slate-100 rounded p-2 grow">
      <div>Timer for {seconds} seconds</div>
      <CircleProgressBar remaining={remaining} full={seconds} />
      <TimerFace remaining={remaining} />
      {stopped || remaining === 0 ? (
        <div className="block">
          <TimerBtn text="Restart timer" onClick={restartTimer} />
          <TimerBtn text="Stop the alarm" onClick={() => alarm.pause()} />
        </div>
      ) : (
        <TimerBtn onClick={stopTimer} text="Stop timer" />
      )}
    </div>
  );
}
