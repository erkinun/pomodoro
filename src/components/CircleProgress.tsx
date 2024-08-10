type CircleProgressBarProps = {
  remaining: number;
};

// TODO add the timer face here?
export function CircleProgressBar({ remaining }: CircleProgressBarProps) {
  return (
    <div
      className="grid place-items-center w-16 m-4 aspect-square bg-blue-200 rounded-full after:content-[attr(aria-valuenow)] after:bg-slate-500 after:w-12 after:aspect-square after:grid after:rounded-full"
      aria-valuenow={remaining}
    ></div>
  );
}
