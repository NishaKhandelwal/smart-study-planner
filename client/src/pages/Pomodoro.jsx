import { useState, useEffect } from "react";

export default function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime(prev => {
        if (prev <= 1) { setIsRunning(false); return 0; }
        return prev - 1;
      }), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = t => `${Math.floor(t/60).toString().padStart(2,'0')}:${(t%60).toString().padStart(2,'0')}`;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Pomodoro Timer</h2>
      <div className="text-4xl font-mono mb-4">{formatTime(time)}</div>
      <button onClick={() => setIsRunning(!isRunning)} className="bg-blue-500 text-white px-4 py-2 mr-2">
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={() => { setTime(25*60); setIsRunning(false); }} className="bg-red-500 text-white px-4 py-2">
        Reset
      </button>
    </div>
  );
}