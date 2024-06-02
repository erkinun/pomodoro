import { Timer } from "./components/Timer";

// TODO style in canva or figma later on
// TODO add different timers, store them, add different timer seconds and minutes options
function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-red-500">Hello Timers</h1>
      <Timer />
    </main>
  );
}

export default App;
