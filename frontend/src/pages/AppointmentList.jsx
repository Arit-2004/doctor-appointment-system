import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://localhost:8000/api/v1/appointments//patient/:patientId",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-red-50 px-6 py-10">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-8">
          📅 Booked Appointments
        </h1>

        {loading ? (
          <p className="text-center text-red-500 font-semibold">
            Loading appointments...
          </p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-600">
            No appointments found
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full border-collapse">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-3 text-left">Patient</th>
                  <th className="p-3 text-left">Doctor</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Time Slot</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className="border-b hover:bg-red-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-700">
                      {appt.patient?.fullname}
                    </td>

                    <td className="p-3 text-gray-700">
                      {appt.doctor?.fullname}
                    </td>

                    <td className="p-3 text-gray-700">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-gray-700">
                      {appt.timeSlot}
                    </td>

                    <td className="p-3 text-gray-600">
                      {appt.reason}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          appt.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : appt.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Appointments;
