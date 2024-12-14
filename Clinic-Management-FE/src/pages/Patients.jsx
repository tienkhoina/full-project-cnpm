import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
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

const Patients = () => {
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const { userId, previousPatients } = useUser();
    
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

    const handleSubmit = async (p, t, d) => {
        try {
            let da = new Date(d);
            da.setHours(7,0,0,0);
            const data = {
                doctorId: 'doc' + userId,
                patientId: p,
                time: t,
                date: da.toISOString()
            };
            


            // Gửi yêu cầu tạo lịch hẹn
            const result = await axiosClient.post('/appointments', data);
            
            
                // Reset form sau khi thành công
                setSelectedTime('');
                setSelectedDate('');
                console.log("Appointment scheduled successfully!");
                alert("Đặt lịch thành công!");

        } catch (error) {
            console.error("Error: ", error);
            // Hiển thị thông báo lỗi chi tiết nếu có
            alert("Đặt lịch không thành công: " + (error.response?.data?.message || error.message));
        }
    }
    const fetDeleteBookings = async (item) => {
        try {
            let d ={
                userId,      // Gửi userId
                data:{item},        // Gửi data (có thể là appointmentId hoặc thông tin khác)
                roleId: "R1",    // Gửi roleId (ví dụ: R1, R2, R3)
              }

        
          // Gửi cả data và userId trong body của POST request
          const response = await axiosClient.post('/delete-appointment', {
            userId,      // Gửi userId
            data :{item},        // Gửi data (có thể là appointmentId hoặc thông tin khác)
            roleId: "R1",    // Gửi roleId (ví dụ: R1, R2, R3)
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          alert('Error')
        }
      };

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>Previous Appointments</p>

            <div>
                {previousPatients.map((item, index) => (
                    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                        <div>
                            <img className='w-32 bg-indigo-50' src={`data:image/png;base64,${item.image}`} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral-800 font-semibold'>{item.name}</p>
                            <p>{item.speciality}</p>
                            <p className='text-xs mt-1'>
                                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {formatDate(item.date)} | {timeSlotMapping[item.timeType]}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Hàng chứa chọn ngày và chọn thời gian */}
                            <div className="flex items-center gap-4">
                                {/* Chọn ngày */}
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700"></label>
                                    <input
                                        id="date"
                                        type="date"
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary-500"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Chọn thời gian */}
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700"></label>
                                    <select
                                        id="time"
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary-500"
                                        value={selectedTime} // Ensure the select is controlled
                                        onChange={(e) => setSelectedTime(e.target.value)} // Set selected time
                                        required
                                    >
                                        <option value="T1">07:00 AM - 08:00 AM</option>
                                        <option value="T2">08:00 AM - 09:00 AM</option>
                                        <option value="T3">09:00 AM - 10:00 AM</option>
                                        <option value="T4">10:00 AM - 11:00 AM</option>
                                        <option value="T5">01:00 PM - 02:00 PM</option>
                                        <option value="T6">02:00 PM - 03:00 PM</option>
                                        <option value="T7">03:00 PM - 04:00 PM</option>
                                        <option value="T8">04:00 PM - 05:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            {/* Nút Submit */}
                            <button
                                type="button" // Sử dụng type="button" thay vì "submit" để tránh reload trang
                                className="bg-primary-500 text-black py-2 px-4 rounded-md hover:bg-primary-600 transition duration-300"
                                onClick={async () => {
                                    try {
                                        await handleSubmit(item._id, timeSlotMapping[selectedTime ? selectedTime : 'T1'], selectedDate);
                                        await fetDeleteBookings(item); // Hàm thứ hai chỉ chạy sau khi hàm đầu tiên hoàn tất
                                        console.log("Both functions executed sequentially");
                                    } catch (error) {
                                        console.error("Error in execution:", error);
                                    }
                                }}
                                
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Patients;
