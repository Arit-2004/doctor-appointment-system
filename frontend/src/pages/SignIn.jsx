import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

function SignIn() {
  const [role, setRole] = useState(""); // "patient" or "doctor"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          username,
          email,
          password,
          doctorId: role === "doctor" ? doctorId : null,
        },
        {
          withCredentials: true,
        }
      );

      // Save token & user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));

      // ✅ Trigger Navbar refresh
      window.dispatchEvent(new Event("storage"));

      // 🎉 Toast message
      toast.success(`👋 Welcome back, ${response.data.data.fullname || username}!`, {
        autoClose: 2000,
      });

      // Redirect to homepage
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      const message =
        error.response?.data?.message || "Login failed! Check your credentials.";
      toast.error(message, { autoClose: 2500 });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Navbar />

        <div className="w-[290px] mt-14 min-h-[320px] py-5 shadow-md rounded-xl border-2 bg-gray-200">
          <div className="flex justify-center gap-2 px-4 font-semibold text-[14px] text-white">
            <button
              onClick={() => setRole("patient")}
              className={`p-2 min-w-[120px] py-1 text-center shadow-md rounded-xl ${
                role === "patient"
                  ? "bg-red-600 w-full"
                  : "bg-red-500 hover:opacity-80"
              }`}
            >
              Login as Patient
            </button>

            <button
              onClick={() => setRole("doctor")}
              className={`p-2 min-w-[120px] py-1 text-center shadow-md rounded-xl ${
                role === "doctor"
                  ? "bg-blue-600 w-full"
                  : "bg-blue-500 hover:opacity-80"
              }`}
            >
              Login as Doctor
            </button>
          </div>

          <form
            className="flex mt-2 flex-col items-center gap-6"
            onSubmit={handleSubmit}
          >
            <p className="form-title text-xl font-bold text-gray-800">
              Sign in to your account
            </p>

            <input
              placeholder="Enter username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[80%] h-8 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              placeholder="Enter email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[80%] h-8 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              placeholder="Enter password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[80%] h-8 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {role === "doctor" && (
              <input
                placeholder="Enter Doctor ID"
                required
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-[80%] h-8 px-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}

            <button
              className="py-3 px-5 bg-indigo-600 text-white text-sm font-medium w-[80%] rounded-lg uppercase hover:scale-90 transition-all duration-200"
              type="submit"
            >
              Sign In
            </button>

            {role === "patient" && (
              <p className="account text-gray-500 text-sm text-center">
                No account?{" "}
                <Link to="/signup" className="underline text-blue-500">
                  Sign up
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
