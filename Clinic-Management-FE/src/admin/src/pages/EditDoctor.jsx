import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axiosClient from "../../../axiosClient";
import { useUser } from "../context/UserContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { Navigate } from "react-router-dom";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { userId } = useUser(); // Lấy userId từ context
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

  const navigate = useNavigate();

  const timeSlotMapping = {
    T1: "07:00 AM - 08:00 AM",
    T2: "08:00 AM - 09:00 AM",
    T3: "09:00 AM - 10:00 AM",
    T4: "10:00 AM - 11:00 AM",
    T5: "01:00 PM - 02:00 PM",
    T6: "02:00 PM - 03:00 PM",
    T7: "03:00 PM - 04:00 PM",
    T8: "04:00 PM - 05:00 PM",
  };

  const fetchDocInfo = async () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    if (doctor) {
      setDocInfo(doctor);
    } else {
      console.error("Doctor not found!");
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await axiosClient.get(
        `http://localhost:5000/api/doctor-calendar-free?doctorId=${docId}`
      );
      const data = response.data;
      const slots = Object.keys(data).map((dateString) => {
        const daySlots = data[dateString].map((slotKey) => {
          return {
            time: timeSlotMapping[slotKey],
            dateTime: new Date(dateString),
          };
        });
        return daySlots;
      });

      setDocSlots(slots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const handleDelete = async () => {
  const isConfirmed = window.confirm("Are you sure you want to delete this doctor?");
  if (isConfirmed) {
    try {
      // Gọi API để xóa bác sĩ
      console.log("Deleting doctor information...");
      await axiosClient.delete(`/delete-doctor/${docId}`);
      
      // Chuyển hướng về trang admin sau khi xóa thành công
      navigate("/admin/");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error deleting doctor:", error);
      alert("There was an error deleting the doctor. Please try again.");
    }
  } else {
    console.log("Delete action canceled.");
  }
};


  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      fetchAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) {
    return <div>Loading doctor information...</div>;
  }

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">${docInfo.fees}</span>
          </p>

          {/* Nút Edit và Delete dưới Appointment Fee */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => navigate(`/admin/edit/${docId}`)}
              className="text-sm px-4 py-2 rounded-lg transition-all bg-gray-100 hover:bg-blue-500 hover:text-white"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-4 py-2 rounded-lg transition-all bg-gray-100 hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
