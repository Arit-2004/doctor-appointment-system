import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    availability: "",
    reason: "",
  });

  // 🔹 Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/doctors/all"
        );
        setDoctors(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit appointment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken"); // must match backend response key
      if (!token) {
        alert("You must be logged in to book an appointment!");
        return;
      }
      console.log("Token:", token);
      await axios.post(
        "http://localhost:8000/api/v1/appointments/book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment booked successfully ✅");
      setFormData({
        doctorId: "",
        date: "",
        availability: "",
        reason: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Booking failed ❌");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />

      <div className="w-[290px] mt-14 min-h-[320px] py-5 shadow-md rounded-xl border-2 bg-gray-200">
        <form
          onSubmit={handleSubmit}
          className="flex mt-2 flex-col items-center gap-6"
        >
          <p className="text-xl font-bold">Book Appointment</p>

          {/* Doctor Dropdown */}
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="h-8 px-3 rounded-xl text-gray-600 w-[201px] shadow-md"
            required
          >
            <option value="">
              {loading ? "Loading doctors..." : "Select Doctor"}
            </option>
            {!loading && doctors.length === 0 && (
              <option value="" disabled>
                No doctors available
              </option>
            )}
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.fullname} (ID: {doctor.doctorId})
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="h-8 px-3 w-[201px] rounded-xl shadow-md"
            required
          />

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="h-8 px-3 rounded-xl w-[201px] shadow-md"
            required
          >
            <option value="">Select Availability</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <input
            type="text"
            name="reason"
            placeholder="Reason for appointment"
            value={formData.reason}
            onChange={handleChange}
            className="h-8 px-3 w-[201px] rounded-xl shadow-md"
            required
          />

          <button
            type="submit"
            className="py-3 px-5 bg-indigo-600 text-white text-sm font-medium w-[80%] rounded-lg uppercase hover:scale-90 transition-transform"
          >
            Get Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;
