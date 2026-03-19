import { useState, useEffect } from "react";
import API from "../services/api";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/subjects");
      setSubjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addSubject = async () => {
    if (!name) return;

    try {
      const res = await API.post("/subjects", { name });
      setSubjects([...subjects, res.data]);
      setName("");
    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err.message);
    }
  };

  const deleteSubject = async (id) => {
    try {
      await API.delete(`/subjects/${id}`);
      setSubjects(subjects.filter((s) => s._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Subjects
      </h1>

      {/* Add Subject */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 w-[500px] flex gap-3">

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add new subject..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={addSubject}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>

      </div>

      {/* Subject List */}
      <div className="space-y-3 w-[500px]">

        {subjects.length === 0 ? (
          <p className="text-gray-500">No subjects yet</p>
        ) : (
          subjects.map((s) => (
            <div
              key={s._id}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
            >
              <span className="text-gray-700 font-medium">
                {s.name}
              </span>

              <button
                onClick={() => deleteSubject(s._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}