import { useState, useEffect } from "react";

export default function Pomodoro() {

  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);

  }, [isRunning]);

  const formatTime = (t) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex items-center justify-center min-h-[80vh]">

      <div className="bg-white shadow-2xl rounded-3xl p-12 w-[420px] text-center">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Focus Timer
        </h1>

        {/* Timer */}
        <div className="text-8xl font-mono font-bold text-blue-600 mb-10 tracking-widest">
          {formatTime(time)}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6">

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-3 rounded-xl shadow-md transition duration-200"
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setTime(25 * 60);
              setIsRunning(false);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white text-lg px-8 py-3 rounded-xl shadow-md transition duration-200"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}