import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import axiosClient from "../../../axiosClient"; // Giả sử axiosClient đã được cấu hình trước đó

const AddDoctor = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: "",
    speciality: "",
    email: "",
    password: "",
    experience: "",
    fees: "",
    address: "",
    aboutMe: "",
    picture: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Nếu có docId, tải thông tin bác sĩ
    if (docId) {
      fetchDocInfo();
    }
  }, [docId]);

  const fetchDocInfo = async () => {
    try {
      const response = await axiosClient.get("/get-doctor-for-admin");
      const doctors = response.data;

      const doctor = doctors.find((doc) => doc._id === docId);

      if (doctor) {
        const formattedDoctor = {
          name: doctor.name.replace("Dr. ", ""),
          speciality: doctor.speciality.toLowerCase(), // Chuyển về chữ thường
          email: doctor.email,
          password: "", // Mặc định không hiển thị mật khẩu
          experience: doctor.experience,
          fees: doctor.fees,
          address: doctor.address.line1,
          aboutMe: doctor.about,
          picture: doctor.image, // Base64 hoặc URL ảnh
        };
        console.log(formattedDoctor);
        setDoctorData(formattedDoctor);
      } else {
        console.error("Doctor not found!");
      }
    } catch (error) {
      console.error("Failed to fetch doctor info:", error);
    }
  };

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
    if (!doctorData.name) newErrors.name = "Doctor Name is required";
    if (!doctorData.speciality) newErrors.speciality = "Speciality is required";
    if (!doctorData.email) newErrors.email = "Email is required";
    if (!doctorData.experience) newErrors.experience = "Experience is required";
    if (!doctorData.fees) newErrors.fees = "Fees is required";
    if (!doctorData.address) newErrors.address = "Address is required";
    if (!doctorData.aboutMe) newErrors.aboutMe = "About Me is required";
    if (!doctorData.picture && !docId)
      newErrors.picture = "Picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (docId) {
        // Gửi yêu cầu cập nhật bác sĩ
        await axiosClient.put(`/update-doctor/${docId}`, doctorData);
        alert("Doctor updated successfully!");
      } else {
        // Gửi yêu cầu thêm bác sĩ mới
        await axiosClient.post("/add-doctor", doctorData);
        alert("Doctor added successfully!");
      }
      navigate("/admin/doctors");
    } catch (error) {
      console.error("Error saving doctor:", error);
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
              {doctorData.picture && (
                <img
                  src={`data:image/*;base64,${doctorData.picture}`}
                  alt="Doctor"
                  className="mt-4 w-32 h-32 object-cover rounded-full border"
                />
              )}
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
                  <option value="general physician">General Physician</option>
                  <option value="gynecologist">Gynecologist</option>
                  <option value="dermatologist">Dermatologist</option>
                  <option value="pediatricians">Pediatricians</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="gastroenterologist">Gastroenterologist</option>
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
              {docId ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddDoctor;
