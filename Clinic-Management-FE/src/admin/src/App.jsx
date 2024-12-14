import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppContextProvider from './context/AppContext';
import Appointments from './pages/Appointments';
import MyAppointments from "./pages/MyAppointments";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddDoctor from './pages/AddDoctor';
import Dashboard from './pages/Dashboard';
import DoctorsList from './pages/DoctorsList';
import Login from './pages/Login';
import MyProfile from "./pages/MyProfile";
import ChangePassword from "./components/ChangePassword";
import { UserProvider, useUser } from './context/UserContext';
import EditDoctor from './pages/EditDoctor'
import Edit from './pages/Edit'

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, setUserId } = useUser();
  const isAdminRoute = location.pathname.startsWith('/admin');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id && !userId) {
      console.log("Setting userId from URL parameter:", id);
      setUserId(id);
    }
  }, [location, userId, setUserId]);
  
  useEffect(() => {
    if (userId && !location.search.includes(`id=${userId}`)) {
      const currentPath = location.pathname;
      console.log("Updating URL with userId:", userId);
      navigate(`${currentPath}?id=${userId}`);
    }
  }, [userId, location, navigate]);


  
  return (
    <AppContextProvider>
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors-list" element={<DoctorsList />} />
          <Route path="/edit/:docId" element={<Edit/>} />
          <Route path="/editdoctor/:docId" element={<EditDoctor/>} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path='/change-password' element={<ChangePassword />} />
        </Routes>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

const AppWithUserContext = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default AppWithUserContext;
