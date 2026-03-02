import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // res warning thookiyachu
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful 🎉");
      
      // Role-ah query param-ah anupuroam
      navigate(`/login?role=${form.role}`);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
          
          <select name="role" value={form.role} onChange={handleChange} className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-400 outline-none">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Signup</button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;