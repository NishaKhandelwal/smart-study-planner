import { useState, useEffect } from "react";
import API from "../services/api";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");

  const fetchSubjects = async () => {
    const res = await API.get("/subjects");
    setSubjects(res.data);
    if (res.data[0]) setSubjectId(res.data[0]._id);
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title || !subjectId) return;

    const res = await API.post("/tasks", { title, subjectId });

    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const toggleTask = async (id) => {
    await API.patch(`/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    try {

      await API.delete(`/tasks/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchTasks();
  }, []);

  return (

    <div className="p-8">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Tasks
      </h1>

      {/* Add Task Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 w-[500px]">

        <div className="flex gap-3">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={addTask}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>

        </div>

      </div>

      {/* Task List */}
      <div className="space-y-4">

        {tasks.map((t) => (

          <div
            key={t._id}
            className="flex justify-between items-center bg-white shadow-md rounded-xl p-4 w-[500px]"
          >

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t._id)}
                className="w-5 h-5"
              />

              <span
                className={`text-lg ${
                  t.completed ? "line-through text-gray-400" : "text-gray-700"
                }`}
              >
                {t.title} ({t.subjectId?.name})
              </span>

            </div>

            <button
              onClick={() => deleteTask(t._id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}