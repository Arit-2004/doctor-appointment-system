import React, { useState } from "react";
import {Link} from "react-router-dom"
import Navbar from "../components/Navbar";
function SignIn() {
  const [isPatient, setIsPatient] = useState(true); // toggle between patient/doctor

  return (
    <>
    <div className="flex flex-col justify-center items-center">

      <Navbar />
      <div className="w-[290px] mt-14 min-h-[320px] py-5 shadow-md rounded-xl border-2 bg-gray-200">
        <div className="flex justify-center gap-2 px-4 font-semibold text-[14px] text-white">
          <button
            onClick={() => setIsPatient(true)}
            className={`patient p-2 min-w-[120px] py-1 max-h-[50px] text-center shadow-md rounded-xl ${
              isPatient
              ? "bg-red-600 w-full"
              : "bg-red-500 hover:opacity-80"
            }`}
            >
            Login as a Patient
          </button>
          <button
            onClick={() => setIsPatient(false)}
            className={`doctor p-2 min-w-[120px] py-1 max-h-[50px] text-center shadow-md rounded-xl ${
              !isPatient
              ? "bg-blue-600 w-full"
              : "bg-blue-500 hover:opacity-80"
            }`}
          >
            Login as a Doctor
          </button>
        </div>

        <form className="flex mt-2 flex-col items-center gap-6">
          <p className="form-title text-xl font-bold">Sign in to your account</p>

          <div className="input-container flex relative items-center">
            <input
              placeholder={isPatient ? "Enter email" : "Enter Doctor Id.."}
              required
              type="email"
              className="email h-8 px-3 rounded-xl shadow-md"
              />
            <span className="absolute top-2 right-3">
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[1rem] h-[1rem] text-[#9CA3AF]"
                >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  ></path>
              </svg>
            </span>
          </div>

          <div className="input-container flex relative items-center">
            <input
              placeholder="Enter password"
              required
              type="password"
              className="password h-8 px-3 rounded-xl shadow-md"
              />
            <span className="absolute top-2 right-3">
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[1rem] h-[1rem] text-[#9CA3AF]"
                >
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  ></path>
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  ></path>
              </svg>
            </span>
          </div>

          <button
            className="block py-3 px-5 bg-indigo-600 text-white text-sm font-medium w-[80%] rounded-lg uppercase hover:scale-90"
            type="submit"
            >
            Sign in
          </button>

          {isPatient && (
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
