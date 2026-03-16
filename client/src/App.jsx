import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";
import Pomodoro from "./pages/Pomodoro";

import MainLayout from "./layouts/MainLayout";

function App() {

  return (

    <Router>

      <Routes>

        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Pages */}
        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/subjects" element={<Subjects />} />

          <Route path="/tasks" element={<Tasks />} />

          <Route path="/pomodoro" element={<Pomodoro />} />

        </Route>

      </Routes>

    </Router>

  );

}

export default App;