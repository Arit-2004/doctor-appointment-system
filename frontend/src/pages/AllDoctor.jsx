import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/doctors/all"
        );
        setDoctors(response.data.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-red-50 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          All Our Doctors
        </h1>

        {loading ? (
          <p className="text-gray-600 text-lg">Loading doctors...</p>
        ) : (
          <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-xl shadow-md border p-5 flex flex-col items-center hover:shadow-lg transition"
              >
                {/* Avatar */}
                <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-3xl">
                  {doctor.fullname?.charAt(0)}
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-800">
                  Dr. {doctor.fullname}
                </h2>

                <p className="text-red-500 font-medium capitalize">
                  {doctor.role}
                </p>

                {doctor.doctorId && (
                  <p className="text-sm text-gray-500 mt-1">
                    Doctor ID: {doctor.doctorId}
                  </p>
                )}

                <Link
                  to={`/appointment?doctorId=${doctor._id}`}
                  className="w-full"
                >
                  <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-full font-semibold hover:opacity-80 transition">
                    Book Appointment
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllDoctors;
