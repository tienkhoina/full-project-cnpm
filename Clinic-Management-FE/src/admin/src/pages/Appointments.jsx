import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Appointments = () => {
  const { userId,booking } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu không có userId, chuyển hướng về trang login
    if (!userId) {
      navigate('/admin/login');
    }
  }, [userId, navigate]);

  const updatedBooking = booking.map((appointment, index) => ({
    ...appointment,
    id: index + 1 // Thêm trường id đánh dấu thứ tự
  }));
  // Nếu userId chưa có, không render gì ở đây
  if (!userId) {
    return null; // Có thể hiển thị loading spinner nếu cần
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">All Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4 text-left">Fees</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {updatedBooking.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="p-4">{appointment.id}</td>
                <td className="p-4 flex items-center">
                  <img
                    src={`https://via.placeholder.com/40`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  {appointment.patient}
                </td>
                <td className="p-4">{appointment.date}</td>
                <td className="p-4">{appointment.doctor}</td>
                <td className="p-4">{appointment.fees}</td>
                <td className="p-4">
                  {appointment.status === "Complete" ? (
                    <span className="text-green-500 font-medium">{appointment.status}</span>
                  ) : (
                    <span className="text-red-500 font-medium">{appointment.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
