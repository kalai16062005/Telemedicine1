import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient"); 

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam) {
      setRole(roleParam);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend API call
      const res = await axios.post("http://localhost:5000/api/auth/login", { 
        email, 
        password 
      });
      
      // Store user details in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // Inga role "doctor" nu varanum
      localStorage.setItem("name", res.data.name);

      console.log("Logged in user role:", res.data.role); // Debug panna use aagum

      // 🔥 Redirect Logic Fix
      if (res.data.role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (res.data.role === "patient") {
        navigate("/patient-dashboard");
      } else {
        alert("Role not identified properly!");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 capitalize">
          {role} Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border rounded-lg mb-4 bg-blue-50 focus:ring-2 focus:ring-blue-400 outline-none" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded-lg mb-6 bg-blue-50 focus:ring-2 focus:ring-blue-400 outline-none" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          New user? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;