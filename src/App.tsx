import { useRef, useState } from "react";
import { Timer, TimerProps } from "./components/Timer";

type TimerDefinition = {
  id: string;
  length: TimerProps;
};

// TODO persist old timers in localstorage
// TODO come up with a nice timer selector component like 2 hours 4 minutes 36 seconds stuff, maybe circular selection like apple?
// TODO enter button at top input for timer adds timer
// TODO sound off configuration
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
  function handleDelete(id: string) {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  }
  return (
    <main className="flex flex-col gap-4 items-center h-screen bg-black text-white p-4">
      <label className="flex gap-2 items-center" htmlFor="timerLength">
        Add a timer
        <input
          ref={inputRef}
          type="number"
          name="timerLength"
          className="text-slate-500 rounded-sm"
        />
        <button onClick={handleAdd} className="rounded bg-slate-700 px-4 py-2">
          Add
        </button>
      </label>
      {timers.map((t) => (
        <div className="flex gap-2 w-full items-center">
          <Timer key={t.id} seconds={t.length.seconds} />
          <button
            className="bg-red-800 rounded border border-red-900 h-16 w-16 text-lg"
            onClick={() => handleDelete(t.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}

export default App;
