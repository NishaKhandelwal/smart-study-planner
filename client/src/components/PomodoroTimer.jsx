import { useState, useEffect } from "react";

function PomodoroTimer() {

  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-80 text-center">

      <h2 className="text-xl font-bold mb-4">Pomodoro Timer</h2>

      <div className="text-5xl font-bold text-red-500 mb-6">
        {formatTime()}
      </div>

      <div className="flex justify-center gap-3">

        <button
          onClick={startTimer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>

        <button
          onClick={pauseTimer}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Pause
        </button>

        <button
          onClick={resetTimer}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>

      </div>
    </div>
  );
}

export default PomodoroTimer;