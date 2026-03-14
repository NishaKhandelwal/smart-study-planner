import { useState, useEffect } from "react";
import API from "../services/api";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  const fetchSubjects = async () => {
    const res = await API.get("/subjects");
    setSubjects(res.data);
  };

  const addSubject = async () => {
    if (!name) return;
    const res = await API.post("/subjects", { name });
    setSubjects([...subjects, res.data]);
    setName("");
  };

  useEffect(() => { fetchSubjects(); }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Subjects</h2>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="New Subject"
          className="border p-1 mr-2"
        />
        <button onClick={addSubject} className="bg-blue-500 text-white px-2 py-1">Add</button>
      </div>
      <ul>
        {subjects.map(s => (
          <li key={s._id} className="border p-1 mb-1">{s.name}</li>
        ))}
      </ul>
    </div>
  );
}