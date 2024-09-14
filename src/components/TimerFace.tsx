type Second = number;

type TimerFaceProps = {
  remaining: Second;
};

function formatWatchFace(seconds: number) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  // Add leading zeros for single-digit minutes and seconds
  let formattedTime = [
    hours > 0 ? String(hours).padStart(2, "0") : null,
    String(minutes).padStart(2, "0"),
    String(secs).padStart(2, "0"),
  ]
    .filter(Boolean)
    .join(":"); // Remove hours if it's 0

  return formattedTime;
}

export function TimerFace({ remaining }: TimerFaceProps) {
  // TODO handle hours later
  // TODO when it's less than 10, show 09 instead of 9
  // TODO same goes for minutes
  const formatted = formatWatchFace(remaining);

  return (
    <div className="font-[Orbitron] text-4xl">
      <span>{formatted}</span>
    </div>
  );
}
