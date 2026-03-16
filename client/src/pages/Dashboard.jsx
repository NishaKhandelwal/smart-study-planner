import React, { useEffect, useState } from "react";
import PomodoroTimer from "../components/PomodoroTimer";
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

  // FIXED: use completed instead of status
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

  return (

    <div className="p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Welcome Back 👋
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 mb-10">

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h3 className="text-gray-500 mb-2">Total Tasks</h3>
          <p className="text-4xl font-bold text-blue-600">
            {tasks.length}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h3 className="text-gray-500 mb-2">Subjects</h3>
          <p className="text-4xl font-bold text-green-600">
            {subjects.length}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h3 className="text-gray-500 mb-2">Completed</h3>
          <p className="text-4xl font-bold text-purple-600">
            {completedTasks}
          </p>
        </div>

      </div>

      {/* Progress */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-10 max-w-xl">

        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Task Progress
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

        <p className="mt-3 text-gray-600">
          {completedTasks} of {tasks.length} tasks completed
        </p>

      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-10">

        {/* Pomodoro */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Focus Timer
          </h2>

          <PomodoroTimer />

        </div>

        {/* Recent Tasks */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Recent Tasks
          </h2>

          {tasks.length === 0 ? (

            <p className="text-gray-500">
              No tasks added yet
            </p>

          ) : (

            <ul className="space-y-3">

              {tasks.slice(0,5).map((task) => (

                <li
                  key={task._id}
                  className="flex justify-between border-b pb-2"
                >

                  <span className={task.completed ? "line-through text-gray-400" : ""}>
                    {task.title}
                  </span>

                  <span className="text-sm text-gray-400">
                    {task.completed ? "Done" : "Pending"}
                  </span>

                </li>

              ))}

            </ul>

          )}

        </div>

      </div>

      {/* Subjects */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-10 max-w-xl">

        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Subjects
        </h2>

        {subjects.length === 0 ? (

          <p className="text-gray-500">
            No subjects added
          </p>

        ) : (

          <ul className="space-y-3">

            {subjects.map((subject) => (

              <li
                key={subject._id}
                className="flex justify-between border-b pb-2"
              >

                <span className="font-medium">
                  {subject.name}
                </span>

                <span className="text-gray-400 text-sm">
                  Active
                </span>

              </li>

            ))}

          </ul>

        )}

      </div>

    </div>

  );
}

export default Dashboard;