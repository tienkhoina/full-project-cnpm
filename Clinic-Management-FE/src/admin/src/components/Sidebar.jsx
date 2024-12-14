import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-1/4 h-screen bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Prescripto</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-blue-500 font-bold"
                  : "flex items-center text-gray-700"
              }
            >
              <span className="material-icons mr-2">Dashboard</span> 
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/appointments"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-blue-500 font-bold"
                  : "flex items-center text-gray-700"
              }
            >
              <span className="material-icons mr-2">Appointments</span>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/add-doctor"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-blue-500 font-bold"
                  : "flex items-center text-gray-700"
              }
            >
              <span className="material-icons mr-2">Add Doctor</span> 
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/doctors-list"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-blue-500 font-bold"
                  : "flex items-center text-gray-700"
              }
            >
              <span className="material-icons mr-2">Doctors List</span> 
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
