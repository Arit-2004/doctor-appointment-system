import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/doctors/all`
     );
        setDoctors(response.data.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="w-full mt-6 flex flex-col items-center">
      <h2 className="font-bold text-3xl sm:text-4xl text-red-600" id="doctor">
        Our Qualified Doctors
      </h2>

      <div className="w-[85%] mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="flex flex-col items-center bg-white p-4 shadow-md rounded-xl border"
          >
            {/* Placeholder Image */}
            <div className="w-40 h-40 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-4xl">
              {doctor.fullname?.charAt(0)}
            </div>

            <p className="text-xl font-bold mt-4 text-gray-800">
              Dr. {doctor.fullname}
            </p>

            <p className="text-red-500 font-semibold capitalize">
              {doctor.role}
            </p>

            <Link to={`/appointment?doctorId=${doctor._id}`}>
              <button className="bg-red-500 px-6 py-2 mt-3 font-semibold text-white rounded-full hover:opacity-80 transition">
                Book Now
              </button>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/doctors">
        <button className="mt-6 px-6 py-2 bg-gray-700 text-white font-medium rounded-full hover:opacity-80 transition">
          View More
        </button>
      </Link>
    </div>
  );
};

export default Doctors;
