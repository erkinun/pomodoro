import { useRef, useState } from "react";
import { Timer, TimerProps } from "./components/Timer";

type TimerDefinition = {
  id: string;
  length: TimerProps;
};

// TODO style in canva or figma later on
// TODO add different timers, store them, add different timer seconds and minutes options, localstorage maybe
function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [timers, setTimers] = useState<TimerDefinition[]>([]);
  const handleAdd = () => {
    if (inputRef.current) {
      setTimers((prev) => [
        ...prev,
        {
          id: self.crypto.randomUUID(),
          length: { seconds: parseInt(inputRef.current?.value ?? "0") },
        },
      ]);
    }
  };
  return (
    <main className="flex flex-col items-center h-screen bg-black text-white p-4">
      <label htmlFor="timerLength">
        Add a timer
        <input
          ref={inputRef}
          type="number"
          name="timerLength"
          className="text-slate-500"
        />
        <button onClick={handleAdd}>Add</button>
      </label>
      {timers.map((t) => (
        <Timer key={t.id} seconds={t.length.seconds} />
      ))}
    </main>
  );
}

export default App;
