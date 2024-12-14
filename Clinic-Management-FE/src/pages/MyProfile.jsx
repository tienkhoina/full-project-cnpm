import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useSearchParams } from 'react-router-dom';

let MyProfile = () => {
    let [userData, setUserData] = useState({
        name: "",
        image: assets.profile_pic,
        email: "",
        phone: "",
        address: "",
        gender: "",
        dob: "",
    });

    let [isEdit, setIsEdit] = useState(false);
    let [searchParams] = useSearchParams();
    let [id, setId] = useState(null); // Trạng thái cho `id`

    useEffect(() => {
        let idFromUrl = searchParams.get('id');
        setId(idFromUrl); // Set `id` vào state sau khi đã lấy từ URL
    }, [searchParams]);

    // Gọi API để lấy dữ liệu user
    useEffect(() => {
        if (id) {
            let fetchUserData = async () => {
                try {
                    let response = await axios.get("http://localhost:5000/api/get-my-profile", {
                        params: { id: id }
                    });
                    let result = response.data;

                    if (result.errCode === 0) {
                        let user = result.user;
                        setUserData({
                            name: `${user.firstName} ${user.lastName}`,
                            image: user.image || assets.profile_pic,
                            email: user.email,
                            phone: user.phonenumber || "",
                            address: user.address,
                            gender: user.gender === 1 ? "Male" : "Female",
                            dob: user.dob || "",
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            };

            fetchUserData();
        }
    }, [id]);

    // Function to handle avatar change
    let handleAvatarChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onloadend = () => {
                // Lấy chuỗi base64 và xóa tiền tố "data:image/*;base64,"
                let base64Image = reader.result.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
                setUserData((prev) => ({
                    ...prev,
                    image: base64Image, // Set the uploaded image (without prefix) as the new profile picture
                }));
            };
            reader.readAsDataURL(file); // Convert the uploaded file to a data URL
        }
    };
    

    // Function to handle Save
    let handleSave = async () => {
        // Kiểm tra giá trị của userData trước khi gửi
        console.log("Before saving, userData:", userData);

        // Nếu dữ liệu thiếu tên hoặc email thì không cho phép lưu
        if (!userData.name || !userData.email) {
            alert("Name and email are required!");
            return;
        }

        try {
            let response = await axios.put("http://localhost:5000/api/update-my-profile", {
                id,
                userData,
            });

            console.log("Response from API:", response.data);
            if (response.data.errCode === 0) {
                setIsEdit(false);
                alert("Profile updated successfully!");
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("An error occurred while updating the profile. Please try again.");
        }
    };

    return (
        <div className="max-w-lg flex flex-col gap-2 text-sm">
            <img className="w-36 rounded" 
                src={userData.image ? (userData.image.includes(`data:image`) ? userData.image : `data:image/png;base64,${userData.image}`) : assets.profile_pic} 
                alt="Profile" 
            />

            {isEdit && (
                <div className="mt-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="text-sm text-neutral-500"
                    />
                </div>
            )}

            {isEdit ? (
                <input
                    className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                        setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
            ) : (
                <p className="font-medium text-3xl text-neutral-800 mt-4">
                    {userData.name}
                </p>
            )}

            <hr className="bg-zinc-500 h-[1px] border-none" />

            <div>
                <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
            </div>

            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                <p className="font-medium">Email ID:</p>
                <p className="text-blue-500">{userData.email}</p>

                <p className="font-medium">Phone:</p>
                {isEdit ? (
                    <input
                        className="bg-gray-100 max-w-52"
                        type="text"
                        value={userData.phone}
                        onChange={(e) =>
                            setUserData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                    />
                ) : (
                    <p className="text-blue-400">{userData.phone}</p>
                )}

                <p className="font-medium">Address:</p>
                {isEdit ? (
                    <input
                        className="bg-gray-50"
                        value={userData.address}
                        type="text"
                        onChange={(e) =>
                            setUserData((prev) => ({ ...prev, address: e.target.value }))
                        }
                    />
                ) : (
                    <p className="text-blue-400">{userData.address}</p>
                )}
            </div>

            <div>
                <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Gender</p>
                    {isEdit ? (
                        <select
                            className="max-w-20 bg-gray-100"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, gender: e.target.value }))
                            }
                            value={userData.gender}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className="text-gray-400">{userData.gender}</p>
                    )}

                    <p className="font-medium">Birthday:</p>
                    {isEdit ? (
                        <input
                            className="max-w-28 bg-gray-100"
                            type="date"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, dob: e.target.value }))
                            }
                            value={userData.dob}
                        />
                    ) : (
                        <p className="text-gray-400">{userData.dob}</p>
                    )}
                </div>
            </div>

            <div className="mt-10">
                {isEdit ? (
                    <button
                        className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                        onClick={handleSave}
                    >
                        Save Information
                    </button>
                ) : (
                    <button
                        className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                        onClick={() => setIsEdit(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
