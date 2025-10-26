import { useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const demoDoctors = [
      {
        id: 1,
        name: "Dr. Anindita Roy",
        specialty: "Neurologist",
        img: "https://static.vecteezy.com/system/resources/previews/009/221/589/non_2x/docter-women-icon-cartoon-female-nurse-logo-professional-healthcare-design-symbol-illustration-free-vector.jpg",
      },
      {
        id: 2,
        name: "Dr. Pranoy Ghosh",
        specialty: "Dentist",
        img: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
      },
      {
        id: 3,
        name: "Dr. Tulsi Kumar",
        specialty: "Cardiology",
        img: "https://cdn-icons-png.flaticon.com/512/8815/8815112.png",
      },
      {
        id: 4,
        name: "Dr. Mamata Bannerjee",
        specialty: "Surgical",
        img: "https://static.vecteezy.com/system/resources/previews/009/221/589/non_2x/docter-women-icon-cartoon-female-nurse-logo-professional-healthcare-design-symbol-illustration-free-vector.jpg",
      },
    ];

    setDoctors(demoDoctors);
  }, []);

  return (
    <div className="w-full mt-6 flex flex-col items-center">
      <h2 className="font-bold text-3xl sm:text-4xl text-blue-500" id="doctor">
        Our Qualified Doctors
      </h2>

      <div className="w-[85%] mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col items-center bg-gray-50 p-4 shadow-md rounded-lg"
          >
            <img
              src={doctor.img}
              alt={doctor.name}
              className="w-60 h-60 object-cover rounded-xl shadow-md"
            />
            <p className="text-xl font-bold mt-4">{doctor.name}</p>
            <p className="text-blue-400 font-semibold">{doctor.specialty}</p>
            <button className="bg-blue-500 px-6 py-2 mt-3 font-semibold text-white rounded-full hover:opacity-80 transition">
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* View More */}
      <a href="/doctors">
        <button className="mt-5 px-6 py-2 bg-gray-600 text-white font-medium rounded-full hover:opacity-80 transition">
          View More
        </button>
      </a>
    </div>
  );
};

export default Doctors;
