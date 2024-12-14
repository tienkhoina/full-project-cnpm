import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import Login from './pages/Login';
import NavBar from "./components/NavBar";
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Footer from "./components/Footer";
import { UserProvider, useUser } from './context/UserContext';
import ChangePassword from "./pages/ChangePassword.jsx";
import Patients from "./pages/Patients.jsx";

// Nhập khẩu ứng dụng Admin
import AdminApp from './admin/src/App.jsx'; // Đảm bảo đường dẫn chính xác tới App.jsx của admin

// Nhập khẩu ChatBox
import ChatBox from './components/ChatBox'; // Đảm bảo đường dẫn chính xác tới component ChatBox

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, setUserId } = useUser();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  if(!isAdminRoute){
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id && !userId) {
      setUserId(id);
    }
  }, [location, userId, setUserId]);

  useEffect(() => {
    if (userId) {
      const currentPath = location.pathname;
      if (!location.search.includes('id=')) {
        navigate(`${currentPath}?id=${userId}`);
      }
    }
  }, [userId, location, navigate]);

}

  // Kiểm tra xem hiện tại có phải đang ở trong admin không
  

  return (
    <div className="mx-4 sm:mx-[10%]">
      {/* Render NavBar và Footer chỉ khi không phải là trang admin */}
      {!isAdminRoute && <NavBar />}
      <Routes>
        {/* Routes cho ứng dụng chính */}
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/appointments/:docId" element={<Appointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/patients' element={<Patients />} />
        
        {/* Routes cho ứng dụng admin */}
        <Route path="/admin/*" element={<AdminApp />} /> {/* Đảm bảo AdminApp sẽ được render khi truy cập /admin */}
      </Routes>
      {/* Render Footer chỉ khi không phải là trang admin */}
      {!isAdminRoute && <Footer />}
      {/* Render ChatBox cho ứng dụng chính */}
      {!isAdminRoute && <ChatBox />}
    </div>
  );
};

const AppWithUserContext = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default AppWithUserContext;
