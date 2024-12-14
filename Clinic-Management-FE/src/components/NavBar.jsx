import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const NavBar = () => {
    const navigate = useNavigate();
    const [showMenu, setshowMenu] = useState(false);
    const { userId, setUserId, user, roleId } = useUser();


    const handleLogout = () => {
        // Clear user context
        setUserId(null);

        // Remove token (if stored in localStorage or sessionStorage)
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        // Redirect to login page
        navigate('/login');
    };
    const toPath = (roleId === 'R2'||roleId === null) ? '/doctors' : '/patients';
    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='w-56 cursor-pointer' src={assets.logoreal} alt='' />
            <ul className='hidden md:flex items-start gap-7 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to={toPath}>
                    <li className='py-1'>BOOKING</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-2'>
                {userId !== null ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        {/* Hiển thị ảnh dựa trên giá trị user.image */}
                        <img
                            className='w-8 rounded-full'
                            src={user?.image ? `data:image/png;base64,${user.image}` : assets.profile_pic}
                            alt=""
                        />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={() => navigate('change-password')} className='hover:text-black cursor-pointer'>Change Password</p>
                                <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
                        Create Account
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
