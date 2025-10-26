import React from 'react'
import { Router } from 'react-router-dom'
import Navbar from "../components/Navbar";

function Appointment() {
  return (
    <>
    <div className="flex flex-col justify-center items-center">
      <Navbar />


      <div className="w-[290px] mt-14 min-h-[320px] py-5 shadow-md rounded-xl border-2 bg-gray-200">
        <form className="flex mt-2 flex-col items-center gap-6">
          <p className="form-title text-xl font-bold">Book Appointment</p>

          <div className="input-container flex relative items-center">
            <input
              type="text"
              placeholder="Enter name.."
              className="h-8 px-3 rounded-xl shadow-md"
            />
          </div>

          <div className="input-container flex relative items-center">
            <input
              type="text"
              placeholder="Enter contact No.."
              className="h-8 px-3 rounded-xl shadow-md"
            />
            <span className="absolute top-1 right-3">
              <i className="fa-solid fa-phone opacity-50"></i>
            </span>
          </div>

          <div className="input-container flex relative items-center">
            <select
              name="department"
              className="h-8 px-3 rounded-xl text-gray-500 w-[201px] shadow-md"
            >
              <option value="">Choose Department</option>
              <option value="neurology">Neurology</option>
              <option value="surgical">Surgical</option>
              <option value="dental">Dental</option>
              <option value="ophthalmology">Ophthalmology</option>
              <option value="cardiology">Cardiology</option>
              <option value="gynecology">Gynecology</option>
            </select>
          </div>

          <div className="input-container flex relative items-center">
            <select
              name="doctor"
              className="h-8 px-3 rounded-xl text-gray-500 w-[201px] shadow-md"
            >
              <option value="">Select Doctor</option>
              <option value="doctor1">Dr. A</option>
              <option value="doctor2">Dr. B</option>
              <option value="doctor3">Dr. C</option>
            </select>
          </div>

          <div className="input-container flex relative items-center">
            <input
              type="time"
              className="h-8 px-3 w-[201px] rounded-xl shadow-md"
              />
          </div>

          <button
            className="block py-3 px-5 bg-indigo-600 text-white text-sm font-medium w-[80%] rounded-lg uppercase hover:scale-90 transition-transform"
            type="submit"
            >
            Get Appointment
          </button>

          <p className="account text-gray-500 text-sm text-center">
            Already have an account?{' '}
            <a href="/signin" className="underline text-blue-500">
              Sign in
            </a>
          </p>
        </form>
      </div>
         </div>     
    </>
  )
}

export default Appointment
