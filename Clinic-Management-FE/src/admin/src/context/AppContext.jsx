import { createContext, useState, useEffect } from "react";
import axiosClient from "../../../axiosClient"; // Import axiosClient để gọi API

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]); // Quản lý danh sách bác sĩ
    const [specialties, setSpecialties] = useState([]); // Quản lý danh sách chuyên khoa
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

    // Hàm tải dữ liệu bác sĩ từ API
    const fetchDoctors = async () => {
        try {
            const response = await axiosClient.get("/get-all-doctor"); // API lấy danh sách bác sĩ
            setDoctors(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    // Hàm tải dữ liệu chuyên khoa từ API
    const fetchSpecialties = async () => {
        try {
            const response = await axiosClient.get("/specialties"); // API lấy danh sách chuyên khoa
            setSpecialties(response); // Lưu dữ liệu vào state
        } catch (error) {
            console.error("Error fetching specialties:", error);
        }
    };

    // Gọi API khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchDoctors()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    // Hàm chuyển đổi base64 image string thành URL nếu cần thiết
    const getDoctorImage = (base64string) => {
        return `data:image/jpeg;base64,${base64string}`;
    };

    // Giá trị được chia sẻ qua Context
    const value = {
        doctors: doctors.map((doctor) => ({
            ...doctor,
            image: getDoctorImage(doctor.image), // Áp dụng chuyển đổi ảnh base64
        })),
        specialties,
        loading,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
