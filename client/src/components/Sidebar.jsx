import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const activeClass = "bg-blue-500 text-white px-4 py-2 rounded";
  const inactiveClass = "px-4 py-2 hover:bg-blue-100 rounded";

  return (
    <div className="w-48 h-screen border-r p-4">
      <h2 className="text-xl font-bold mb-4">Smart Study Planner</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? activeClass : inactiveClass}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/subjects"
          className={({ isActive }) => isActive ? activeClass : inactiveClass}
        >
          Subjects
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) => isActive ? activeClass : inactiveClass}
        >
          Tasks
        </NavLink>

        <NavLink
          to="/pomodoro"
          className={({ isActive }) => isActive ? activeClass : inactiveClass}
        >
          Pomodoro
        </NavLink>
      </nav>
    </div>
  );
}