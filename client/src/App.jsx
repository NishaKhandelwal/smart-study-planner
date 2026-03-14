import { BrowserRouter,Routes,Route } from "react-router-dom";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";
import Pomodoro from "./pages/Pomodoro";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
const PrivateRoute = ({children}) => {

  const token = localStorage.getItem("token");

  return token ? children : <Login/>

}

function App(){

  return(

    <BrowserRouter>

      <Routes>
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route 
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }/>
      </Routes>

    </BrowserRouter>

  )
}

export default App