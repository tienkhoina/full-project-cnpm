// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import assets from '../assets/assets'; // Đảm bảo đường dẫn chính xác
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { userId, setUserId, user, roleId } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    // Clear user context
    setUserId(null);
  
    // Remove token (if stored in localStorage or sessionStorage)
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
  
    // Redirect to login page without query parameters
    navigate('/admin/login', { replace: true }); // replace: true để thay thế URL hiện tại
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate('/admin')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/admin">
          <li className="py-1">DASHBOARD</li>
        </NavLink>
        <NavLink to="/admin/appointments">
          <li className="py-1">APPOINTMENTS</li>
        </NavLink>
        <NavLink to="/admin/add-doctor">
          <li className="py-1">ADD DOCTOR</li>
        </NavLink>
        <NavLink to="/admin/doctors-list">
          <li className="py-1">DOCTORS LIST</li>
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {userId ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={user?.image ? `data:image/png;base64,${user.image}` : assets.profile_pic}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate('/admin/my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/admin/change-password')}
                  className="hover:text-black cursor-pointer"
                >
                  Change Password
                </p>
                <p onClick={handleLogout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/admin/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Login
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />
        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed w-full md:hidden right-0 top-0 bottom-0 z-20 bg-white">
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src={assets.logo} alt="Logo" />
              <img
                className="w-7"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="Close"
              />
            </div>
            <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
              <NavLink onClick={() => setShowMenu(false)} to="/admin">
                DASHBOARD
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/admin/appointments">
                APPOINTMENTS
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/admin/add-doctor">
                ADD DOCTOR
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/admin/doctors-list">
                DOCTORS LIST
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
