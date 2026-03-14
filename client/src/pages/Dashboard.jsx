import React from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          StudyPlanner
        </h2>

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-blue-500">Dashboard</li>
          <li className="cursor-pointer hover:text-blue-500">Subjects</li>
          <li className="cursor-pointer hover:text-blue-500">Tasks</li>
          <li className="cursor-pointer hover:text-blue-500">Pomodoro</li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Tasks Today</h3>
            <p className="text-2xl font-bold">5</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Study Streak</h3>
            <p className="text-2xl font-bold">7 days</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Pomodoro Sessions</h3>
            <p className="text-2xl font-bold">12</p>
          </div>

        </div>

        {/* Pomodoro Timer */}
        <div className="flex justify-center">
          <PomodoroTimer />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;