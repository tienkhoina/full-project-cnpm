// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { useUser } from '../context/UserContext'
import axiosClient from '../axiosClient';

function formatDate(dateString) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateString); // Tạo đối tượng Date từ chuỗi
  const day = date.getDate(); // Lấy ngày
  const month = months[date.getMonth()]; // Lấy tháng từ mảng
  const year = date.getFullYear(); // Lấy năm

  return `${day}, ${month}, ${year}`;
}

const MyAppointments = () => {


  const { userId, doctors, patients, roleId } = useUser();
  const fetDeleteBookings = async (data) => {
    try {
      // Gửi cả data và userId trong body của POST request
      const response = await axiosClient.post('/delete-appointment', {
        userId,      // Gửi userId
        data,        // Gửi data (có thể là appointmentId hoặc thông tin khác)
        roleId,    // Gửi roleId (ví dụ: R1, R2, R3)
      });
      console.log(response.data);
      alert('Ok')
    } catch (error) {
      console.error('Error fetching user:', error);
      alert('Error')
    }
  };
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
  if (roleId === "R2") {
    return (
      <div>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>

        <div>
          {doctors.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={`data:image/png;base64,${item.image}`} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold '>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'> Address:</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutal-700 font-medium'>Date & Time:</span>{formatDate(item.date)} | {timeSlotMapping[item.timeType]} </p>
              </div>
              <div>

              </div>



              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 '>Pay Online</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600  hover:text-white transition-all duration-300'
                  onClick={() => fetDeleteBookings({ item })}
                >Cancel Appointment</button>
              </div>
            </div>
          ))}

        </div>

      </div>
    )
  }
  else if (roleId === "R1") {
    return (
      <div>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>

        <div>
          {patients.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={`data:image/png;base64,${item.image}`} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold '>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutal-700 font-medium'>Date & Time:</span>{formatDate(item.date)} | {timeSlotMapping[item.timeType]} </p>
              </div>
              <div>

              </div>



              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600  hover:text-white transition-all duration-300'
                  onClick={() => fetDeleteBookings({ item })}
                >Cancel Appointment</button>
              </div>
            </div>
          ))}

        </div>

      </div>
    )
  }

}

export default MyAppointments