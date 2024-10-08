type CircleProgressBarProps = {
  remaining: number;
  full: number;
};

// TODO add the timer face here? find good colours to go with black
export function CircleProgressBar({ remaining, full }: CircleProgressBarProps) {
  const percentage = `${100 - (remaining / full) * 100}%`;
  return (
    <div
      className="grid place-items-center w-16 m-4 aspect-square progress-bar rounded-full after:content-[attr(aria-valuetext)] after:bg-slate-500 after:w-12 after:aspect-square after:grid after:rounded-full after:place-items-center"
      aria-valuetext={remaining === 0 ? "Done" : String(remaining)}
      data-percentage={percentage}
      style={{ "--percentage": percentage } as React.CSSProperties}
    ></div>
  );
}
