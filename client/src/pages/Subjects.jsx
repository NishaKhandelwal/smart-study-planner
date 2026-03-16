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

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Subjects
      </h1>

      {/* Add Subject Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 w-[420px]">

        <div className="flex gap-3">

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

      </div>

      {/* Subject List */}
      <div className="space-y-4">

        {subjects.map((s) => (

          <div
            key={s._id}
            className="flex justify-between items-center bg-white shadow-md rounded-xl p-4 w-[420px]"
          >

            <span className="text-lg text-gray-700">
              {s.name}
            </span>

            <button
              onClick={() => deleteSubject(s._id)}
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