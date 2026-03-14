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

  useEffect(() => {
    fetchSubjects();
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Tasks</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New Task"
          className="border p-1 mr-2"
        />
        <select value={subjectId} onChange={e => setSubjectId(e.target.value)} className="border p-1 mr-2">
          {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
        <button onClick={addTask} className="bg-green-500 text-white px-2 py-1">Add</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t._id} className="border p-1 mb-1 flex justify-between">
            <span className={t.completed ? "line-through" : ""}>{t.title} ({t.subjectId?.name})</span>
            <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t._id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}