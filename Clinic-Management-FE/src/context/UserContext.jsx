import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosClient from '../axiosClient'; // Đảm bảo bạn đã cấu hình axiosClient đúng

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Lưu trữ userId
  const [roleId, setRoleId] = useState(null);
  const [user, setUser] = useState(null);    // Lưu thông tin user
  const [doctors, setDoctors] = useState([]); // Lưu danh sách bác sĩ
  const [patients, setPatients] = useState([]); // Lưu danh sách bệnh nhân
  const [previousPatients, setPreviosPatients] = useState([])

  // Hàm fetch dữ liệu người dùng từ backend
  const fetchUser = async (id) => {
    try {
      const response = await axiosClient.post('/user-profile', { id });
      setUser(response.data); // Lưu thông tin user vào state
      setRoleId(response.data.roleId);
      console.log('User fetched:', response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); // Xóa user nếu có lỗi
      setRoleId(null);
    }
  };

  // Hàm fetch danh sách bác sĩ
  const fetchDoctorsInvolve = async (id) => {
    try {
      const response = await axiosClient.get(`/get-my-appointment/${id}`);
      setDoctors(response.data); // Lưu thông tin bác sĩ vào state
      console.log('Doctors fetched:', response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]); // Đặt mảng bác sĩ rỗng nếu có lỗi
    }
  };

  const fetchPatientsInvolve = async (id) => {
    try {
      const response = await axiosClient.get(`/get-my-patient/${id}`);
      setPatients(response.data); // Lưu thông tin bệnh nhân vào state
      console.log('Patients fetched:', response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients([]); // Đặt mảng bệnh nhân r��ng nếu có l��i
    }
  }

  const fetchPreviousPatientsInvolve = async (id) => {
    try {
      const response = await axiosClient.get(`/get-my-previous-patient/${id}`);
      setPreviosPatients(response.data); // Lưu thông tin bệnh nhân vào state
      
    } catch (error) {
      console.error('Error fetching previos patients:', error);
      setPreviosPatients([]); // Đặt mảng bệnh nhân r��ng nếu có l��i
    }
  }

  // Theo dõi sự thay đổi của userId
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await fetchUser(userId); // Chờ fetchUser thực hiện xong

        if (roleId === "R2") {
          await fetchDoctorsInvolve(userId);
        } else if (roleId === "R1") {
          await fetchPatientsInvolve(userId);
          await fetchPreviousPatientsInvolve(userId);
        }
      } else {
        setUser(null); // Xóa thông tin user khi userId là null
        setDoctors([]); // Đặt danh sách bác sĩ rỗng
      }
    };

    fetchData(); // Gọi hàm async bên trong useEffect
  }, [userId, roleId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, roleId, user, doctors, patients, previousPatients }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
