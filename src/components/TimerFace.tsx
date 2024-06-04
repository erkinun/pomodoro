type Second = number;

type TimerFaceProps = {
  remaining: Second;
};

export function TimerFace({ remaining }: TimerFaceProps) {
  // TODO handle hours later
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="font-[Orbitron] text-4xl">
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </div>
  );
}
