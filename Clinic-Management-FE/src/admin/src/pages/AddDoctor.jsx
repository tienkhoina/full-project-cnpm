import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axiosClient from "../../../axiosClient"; // Giả sử axiosClient đã được cấu hình trước đó

const AddDoctor = () => {
  const { userId } = useUser();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: '',
    speciality: '',
    email: '',
    password: '',
    experience: '',
    fees: '',
    address: '',
    aboutMe: '',
    picture: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Nếu không có userId, chuyển hướng về trang login
    if (!userId) {
      navigate('/admin/login');
    }
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // Chuyển file ảnh thành Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1]; // Lấy phần Base64 sau dấu ","
      setDoctorData((prevData) => ({
        ...prevData,
        [name]: base64, // Lưu Base64 mà không có tiền tố
      }));
    };
    if (file) {
      reader.readAsDataURL(file); // Đọc file ảnh dưới dạng Base64
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!doctorData.name) newErrors.name = 'Doctor Name is required';
    if (!doctorData.speciality) newErrors.speciality = 'Speciality is required';
    if (!doctorData.email) newErrors.email = 'Email is required';
    if (!doctorData.password) newErrors.password = 'Password is required';
    if (!doctorData.experience) newErrors.experience = 'Experience is required';
    if (!doctorData.fees) newErrors.fees = 'Fees is required';
    if (!doctorData.address) newErrors.address = 'Address is required';
    if (!doctorData.aboutMe) newErrors.aboutMe = 'About Me is required';
    if (!doctorData.picture) newErrors.picture = 'Picture is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosClient.post('/doctors/add', doctorData, {
        headers: {
          'Content-Type': 'application/json', // Gửi dưới dạng JSON
        },
      });

      if (response?.errCode === 0) {
        alert('Doctor added successfully');
        navigate('/admin'); // Chuyển hướng về trang admin sau khi thành công
      } else {
        console.log(response)
        alert('Failed to add doctor');
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert('An error occurred while adding the doctor');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <main className="flex-1 bg-white p-10">
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-6">Add Doctor</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload doctor picture
              </label>
              <input
                type="file"
                name="picture"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md"
              />
              {errors.picture && <p className="text-red-500 text-sm">{errors.picture}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={doctorData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speciality
                </label>
                <select
                  name="speciality"
                  value={doctorData.speciality}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Speciality</option>
                  <option>General Physician</option>
                  <option>Gynecologist</option>
                  <option>Dermatologist</option>
                  <option>Pediatricians</option>
                  <option>Neurologist</option>
                  <option>Gastroenterologist</option>
                </select>
                {errors.speciality && <p className="text-red-500 text-sm">{errors.speciality}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={doctorData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={doctorData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience"
                  value={doctorData.experience}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fees
                </label>
                <input
                  type="text"
                  name="fees"
                  placeholder="Your fees"
                  value={doctorData.fees}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.fees && <p className="text-red-500 text-sm">{errors.fees}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={doctorData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me
              </label>
              <textarea
                name="aboutMe"
                placeholder="Write about yourself"
                value={doctorData.aboutMe}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                rows="4"
              ></textarea>
              {errors.aboutMe && <p className="text-red-500 text-sm">{errors.aboutMe}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Doctor
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddDoctor;
