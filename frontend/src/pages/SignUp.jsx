import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

function SignUp() {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [doctorId, setDoctorId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        username,
        fullname,
        email,
        role,
        password,
      };

      if (role === "doctor") payload.doctorId = doctorId;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,
        payload,
        { withCredentials: true }
      );

      const userData = response.data?.data || {
        username,
        name: fullname,
        email,
        role,
      };

      // ✅ Save auth data
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Notify Navbar to re-render instantly
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("userUpdate"));

      // ✅ Success toast
      toast.success(`🎉 Welcome, ${fullname || username}!`, {
        position: "top-center",
        autoClose: 2000,
      });

      // Redirect after delay
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      const message =
        error.response?.data?.message ||
        "❌ Registration failed. Please try again!";
      toast.error(message, {
        position: "top-center",
        autoClose: 2500,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />

      <div className="w-[320px] mt-14 min-h-[360px] py-5 shadow-xl rounded-2xl border bg-gray-100">
        <form
          className="flex mt-2 flex-col items-center gap-5"
          onSubmit={handleSubmit}
        >
          <p className="text-xl font-bold text-indigo-700">Create an Account</p>

          <input
            placeholder="Enter full name"
            className="w-[80%] h-9 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            placeholder="Enter Username"
            className="w-[80%] h-9 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="Enter email"
            type="email"
            className="w-[80%] h-9 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Enter password"
            type="password"
            className="w-[80%] h-9 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-[80%] h-9 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>

          {role === "doctor" && (
            <input
              placeholder="Enter Doctor ID"
              className="w-[80%] h-9 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            />
          )}

          <button
            className="py-2 px-5 bg-indigo-600 text-white font-medium w-[80%] rounded-xl uppercase hover:bg-indigo-700 hover:scale-95 transition-all duration-200"
            type="submit"
          >
            Sign Up
          </button>

          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-indigo-600 underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
