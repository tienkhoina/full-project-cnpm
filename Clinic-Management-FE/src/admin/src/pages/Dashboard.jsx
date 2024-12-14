import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { booking, patients, userId } = useUser(); 
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu không có userId, chuyển hướng về trang login
    if (!userId) {
      navigate('/admin/login'); // Hoặc '/admin/login' tùy theo đường dẫn đăng nhập của bạn
    }
  }, [userId, navigate]);

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 text-blue-800 p-6 rounded-md shadow-md text-center">
          <h2 className="text-xl font-bold">{doctors ? doctors.length : 0}</h2>
          <p>Doctors</p>
        </div>
        <div className="bg-purple-100 text-purple-800 p-6 rounded-md shadow-md text-center">
          <h2 className="text-xl font-bold">{booking ? booking.length : 0}</h2>
          <p>Appointments</p>
        </div>
        <div className="bg-green-100 text-green-800 p-6 rounded-md shadow-md text-center">
          <h2 className="text-xl font-bold">{patients ? patients.length : 0}</h2>
          <p>Patients</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Latest Bookings</h2>
        <div className="bg-white p-4 rounded-md shadow-md">
          {booking && booking.slice(0, 5).map((book, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-bold">{book.doctor}</p>
                <p className="text-sm text-gray-600">Booking on {book.date}</p>
              </div>
              <span
                className={`${
                  book.status === "Cancelled"
                    ? "text-red-500"
                    : "text-green-500"
                } font-bold`}
              >
                {book.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
