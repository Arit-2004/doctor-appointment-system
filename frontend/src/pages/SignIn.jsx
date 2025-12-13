import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

function SignIn() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        username,
        email,
        password,
      };

      // ✅ only send doctorId if doctor
      if (role === "doctor") {
        payload.doctorId = doctorId;
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        payload,
        {
          withCredentials: true,
        }
      );

      // ✅ store token correctly
      localStorage.setItem(
        "accessToken",
        response.data.data.accessToken
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
      );

      console.log("Access Token:", response.data.data.accessToken);

      window.dispatchEvent(new Event("storage"));

      toast.success(
        `Welcome back, ${response.data.data.user.fullname}!`,
        { autoClose: 2000 }
      );

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "Login failed! Check your credentials.",
        { autoClose: 2500 }
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />

      <div className="w-[290px] mt-14 min-h-[320px] py-5 shadow-md rounded-xl border-2 bg-gray-200">
        <div className="flex justify-center gap-2 px-4 font-semibold text-[14px] text-white">
          <button
            onClick={() => setRole("patient")}
            className={`p-2 min-w-[120px] rounded-xl ${
              role === "patient" ? "bg-red-600" : "bg-red-500"
            }`}
          >
            Login as Patient
          </button>

          <button
            onClick={() => setRole("doctor")}
            className={`p-2 min-w-[120px] rounded-xl ${
              role === "doctor" ? "bg-blue-600" : "bg-blue-500"
            }`}
          >
            Login as Doctor
          </button>
        </div>

        <form
          className="flex mt-2 flex-col items-center gap-6"
          onSubmit={handleSubmit}
        >
          <p className="text-xl font-bold">Sign in</p>

          <input
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[80%] h-8 px-3 rounded-xl"
          />

          <input
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[80%] h-8 px-3 rounded-xl"
          />

          <input
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[80%] h-8 px-3 rounded-xl"
          />

          {role === "doctor" && (
            <input
              placeholder="Doctor ID"
              required
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-[80%] h-8 px-3 rounded-xl"
            />
          )}

          <button
            type="submit"
            className="bg-indigo-600 text-white w-[80%] py-2 rounded-lg"
          >
            Sign In
          </button>

          {role === "patient" && (
            <p className="text-sm">
              No account?{" "}
              <Link to="/signup" className="underline text-blue-500">
                Sign up
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
