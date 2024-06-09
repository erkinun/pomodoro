type Second = number;

type TimerFaceProps = {
  remaining: Second;
};

export function TimerFace({ remaining }: TimerFaceProps) {
  // TODO handle hours later
  // TODO when it's less than 10, show 09 instead of 9
  // TODO same goes for minutes
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
