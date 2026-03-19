import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksRes = await API.get("/tasks");
        const subjectsRes = await API.get("/subjects");

        setTasks(tasksRes.data);
        setSubjects(subjectsRes.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // 📅 Date logic
  const today = new Date().toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const todaysTasks = tasks.filter(task =>
    task.dueDate?.startsWith(today)
  );

  const upcomingTasks = tasks.filter(task =>
    task.dueDate?.startsWith(tomorrowStr)
  );

  // 🎯 Priority sorting
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const sortedTodayTasks = [...todaysTasks].sort(
    (a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
  );

  const sortedTomorrowTasks = [...upcomingTasks].sort(
    (a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
  );

  // 📊 Progress
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

  // 🎨 Priority UI
  const getPriorityUI = (priority) => {
    switch (priority) {
      case "high":
        return <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">High</span>;
      case "medium":
        return <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">Medium</span>;
      case "low":
        return <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Low</span>;
      default:
        return null;
    }
  };

  return (

    <div className="p-8 h-screen flex flex-col justify-between">

      {/* Top Section */}
      <div>

        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-gray-500">Total Tasks</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {tasks.length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-gray-500">Completed</p>
            <h2 className="text-2xl font-bold text-green-600">
              {completedTasks}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-gray-500">Subjects</p>
            <h2 className="text-2xl font-bold text-purple-600">
              {subjects.length}
            </h2>
          </div>

        </div>

        {/* Tasks Section */}
        <div className="grid grid-cols-2 gap-6">

          {/* Today's Tasks */}
          <div className="bg-white p-5 rounded-xl shadow">

            <h2 className="text-lg font-bold mb-3 text-gray-700">
              Today
            </h2>

            {sortedTodayTasks.length === 0 ? (
              <p className="text-gray-500">No tasks 🎉</p>
            ) : (
              <ul className="space-y-2">
                {sortedTodayTasks.map(task => (
                  <li key={task._id} className="flex justify-between items-center border-b pb-1">

                    <span className={task.completed ? "line-through text-gray-400" : ""}>
                      {task.title}
                    </span>

                    <div className="flex items-center gap-2">
                      {getPriorityUI(task.priority)}
                    </div>

                  </li>
                ))}
              </ul>
            )}

          </div>

          {/* Tomorrow Tasks */}
          <div className="bg-white p-5 rounded-xl shadow">

            <h2 className="text-lg font-bold mb-3 text-gray-700">
              Tomorrow
            </h2>

            {sortedTomorrowTasks.length === 0 ? (
              <p className="text-gray-500">No tasks planned</p>
            ) : (
              <ul className="space-y-2">
                {sortedTomorrowTasks.map(task => (
                  <li key={task._id} className="flex justify-between items-center border-b pb-1">

                    <span className={task.completed ? "line-through text-gray-400" : ""}>
                      {task.title}
                    </span>

                    <div className="flex items-center gap-2">
                      {getPriorityUI(task.priority)}
                    </div>

                  </li>
                ))}
              </ul>
            )}

          </div>

        </div>

      </div>

      {/* Bottom Progress Bar */}
      <div className="bg-white p-5 rounded-xl shadow w-full">

        <p className="mb-2 font-medium text-gray-700">
          Overall Progress
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

        <p className="mt-2 text-sm text-gray-500">
          {completedTasks} / {tasks.length} tasks completed
        </p>

      </div>

    </div>
  );
}

export default Dashboard;