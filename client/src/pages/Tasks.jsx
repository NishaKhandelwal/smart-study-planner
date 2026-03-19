import { useState, useEffect } from "react";
import API from "../services/api";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const fetchSubjects = async () => {
    const res = await API.get("/subjects");
    setSubjects(res.data);
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title || !subjectId || !dueDate || !priority) return;

    const res = await API.post("/tasks", {
      title,
      subjectId,
      dueDate,
      priority
    });

    setTasks([...tasks, res.data]);
    setTitle("");
    setDueDate("");
    setPriority("");
    setSubjectId("");
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

  const getPriorityUI = (priority) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";

    if (priority === "high")
      return <span className={`${base} bg-red-100 text-red-600`}>High</span>;

    if (priority === "medium")
      return <span className={`${base} bg-yellow-100 text-yellow-600`}>Medium</span>;

    if (priority === "low")
      return <span className={`${base} bg-green-100 text-green-600`}>Low</span>;

    return null;
  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      {/* ONE LINE INPUT */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3 items-center w-[800px]">

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task..."
          className="border px-3 py-2 rounded-lg flex-1"
        />

        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={addTask}
          className="bg-green-500 text-white px-5 py-2 rounded-lg"
        >
          Add
        </button>

      </div>

      {/* TASK LIST */}
      <div className="space-y-3">

        {tasks.map((t) => (

          <div
            key={t._id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow w-[800px]"
          >

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t._id)}
              />

              <div>
                <p className={t.completed ? "line-through text-gray-400" : ""}>
                  {t.title}
                </p>
                <p className="text-sm text-gray-400">
                  {t.subjectId?.name} • {new Date(t.dueDate).toLocaleDateString()}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              {getPriorityUI(t.priority)}

              <button
                onClick={() => deleteTask(t._id)}
                className="text-red-500"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}