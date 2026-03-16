import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">

        <h2 className="text-2xl font-bold mb-8">Study Planner</h2>

        <nav className="flex flex-col gap-4">

          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/subjects">Subjects</NavLink>
          <NavLink to="/tasks">Tasks</NavLink>
          <NavLink to="/pomodoro">Pomodoro</NavLink>

        </nav>

        <button
          onClick={logout}
          className="mt-10 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* Page Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
}