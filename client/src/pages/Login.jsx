import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);

      alert("Login successful");

      navigate("/dashboard");

    }catch(err){
      alert("Login failed");
    }

  }

  return(

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow w-96"
      >

      <h2 className="text-2xl font-bold mb-6">
      Login
      </h2>

      <input
      type="email"
      placeholder="Email"
      className="w-full border p-2 mb-4"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />

      <input
      type="password"
      placeholder="Password"
      className="w-full border p-2 mb-4"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="w-full bg-blue-500 text-white p-2 rounded">
      Login
      </button>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </p>

      </form>

    </div>

  )
}

export default Login;