import React, { useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Đảm bảo bạn sử dụng navigate đúng cách


const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const { setUserId } = useUser();

    let check = 0;


    const onsubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let response;

            if (state === 'Sign Up') {
                response = await axiosClient.post('/register', {
                    name,
                    email,
                    password,
                });
                console.log('Sign Up Success:', response);
                
                alert('Create success');
                navigate('/');
            } else {
                response = await axiosClient.post('/login', {
                    email,
                    password,
                });
                console.log('Login Success:', response);
            }

            if (response?.user) {
                const userId = response.user.id;
                console.log("User ID:", userId);
                setUserId(userId);  // Cập nhật userId vào context
                navigate('/');  // Điều hướng về trang chủ
            } else {
                console.error("User data not found.");
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response.data.errCode === 1) {
                alert("Thiếu mẹ email hoặc pass")
                check = 1;
            }
            else if (error.response.data.errCode === 2 || error.response.data.errCode === 3 || error.response.data.errCode === 4) {
                alert("Sai email / pass")
                check = 2;
            }

        }



    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onsubmitHandler}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
                <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book an appointment</p>
                {
                    state === "Sign Up" && (
                        <div className='w-full'>
                            <p>Full Name</p>
                            <input
                                className='border border-zinc-300 rounded w-full p-2 mt-1'
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Enter your full name"
                            />
                        </div>
                    )
                }
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your password"
                    />
                </div>
                {check === 1 ? <p>Thiếu mẹ email hoặc pass</p> : check === 2 ? <p>"Sai email / pass"</p> : <p></p>}
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </button>
                {
                    state === 'Sign Up'
                        ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
                        : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
                }
            </div>
        </form>
    );
};

export default Login;