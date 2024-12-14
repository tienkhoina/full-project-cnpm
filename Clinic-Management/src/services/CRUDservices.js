const bcrypt = require('bcrypt');
const db = require('../models/index');
const { sequelize } = db;
const { Error, Op, where } = require('sequelize');
const { raw } = require('express');
const specialty = require('../models/specialty');
const { splitFullName } = require('../algorithm/algorithm');
const salt = bcrypt.genSaltSync(10);

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject('Error hashing password');
        } else {
          resolve(hash);
        }
      });
    }, 2000); // Giả lập độ trễ 2 giây
  });
}

async function createNewUser(data) {
  try {
    // Gọi hàm hashPassword và chờ kết quả
    let hashPassWordFromBcrypt = await hashPassword(data.password);

    // Tạo người dùng mới
    await db.User.create({
      email: data.email,
      password: hashPassWordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phonenumber: data.phonenumber,
      gender: data.gender === '1' ? true : false,
      roleId: data.roleId,
    });

    return 'Create new user succeed'; // Trả về thành công
  } catch (e) {
    throw new Error(e); // Thêm lỗi nếu có
  }
}

async function getAllUser() {
  try {
    let users = await db.User.findAll({
      raw: true,
    });
    return users;
  } catch (e) {
    throw new Error(e);
  }
}

async function getAllDoctor() {
  try {
    const query = `select * from Users JOIN doctorinfos ON Users.id = doctorinfos.doctorId   JOIN DoctorWithSpecialty ON doctorinfos.doctorId = DoctorWithSpecialty.doctorId`
    
    //`
    //   SELECT Users.id, Users.firstName ,Users.lastName,Users.image, Users.address,Users.phonenumber,Users.gender,Users.roleId,Users.positionId, doctorinfos.*, DoctorWithSpecialty.*, specialties.*
    // FROM Users
    // JOIN doctorinfos ON Users.id = doctorinfos.doctorId
    // JOIN DoctorWithSpecialty ON doctorinfos.doctorId = DoctorWithSpecialty.doctorId
    // JOIN specialties ON DoctorWithSpecialty.specialtyId = specialties.id
    // ORDER BY Users.id;
    // `;

    const [results, metadata] = await db.sequelize.query(query);

    
    
    let doctors = []
    for(let doc of results){
      let specialtyName = await db.Specialty.findOne({
        where: {
          id: doc.specialtyId
           },
           attributes: ['name'],
           raw: true
      })

  

      let doctor ={
        _id: 'doc' + doc.doctorId,
        name: 'Dr. ' + doc.firstName+' '+doc.lastName,
        image: doc.image,
        speciality: specialtyName.name,
        degree: doc.degree,
        experience: doc.experience===1?doc.experience + ' year':doc.experience + ' years',
        about: doc.info ,
        fees: doc.appointmentFee,
        address: {
            line1: doc.address,
            line2: ''
        }
      }

      doctors.push(doctor)
    }

    return doctors;
  } catch (error) {
    console.error("An error occurred while fetching doctor data:", error);
    throw error;
  }
}

async function getAllDoctorForAdmin() {
   try {
    const query = `select * from Users JOIN doctorinfos ON Users.id = doctorinfos.doctorId   JOIN DoctorWithSpecialty ON doctorinfos.doctorId = DoctorWithSpecialty.doctorId`
    
    //`
    //   SELECT Users.id, Users.firstName ,Users.lastName,Users.image, Users.address,Users.phonenumber,Users.gender,Users.roleId,Users.positionId, doctorinfos.*, DoctorWithSpecialty.*, specialties.*
    // FROM Users
    // JOIN doctorinfos ON Users.id = doctorinfos.doctorId
    // JOIN DoctorWithSpecialty ON doctorinfos.doctorId = DoctorWithSpecialty.doctorId
    // JOIN specialties ON DoctorWithSpecialty.specialtyId = specialties.id
    // ORDER BY Users.id;
    // `;

    const [results, metadata] = await db.sequelize.query(query);

    
    
    let doctors = []
    for(let doc of results){
      let specialtyName = await db.Specialty.findOne({
        where: {
          id: doc.specialtyId
           },
           attributes: ['name'],
           raw: true
      })

  

      let doctor ={
        _id: 'doc' + doc.doctorId,
        email: doc.email,
        name: doc.firstName+' '+doc.lastName,
        image: doc.image,
        speciality: specialtyName.name,
        degree: doc.degree,
        experience: doc.experience===1?doc.experience + ' year':doc.experience + ' years',
        about: doc.info ,
        fees: doc.appointmentFee,
        address: {
            line1: doc.address,
            line2: ''
        }
      }

      doctors.push(doctor)
    }

    return doctors;
  } catch (error) {
    console.error("An error occurred while fetching doctor data:", error);
    throw error;
  } 
}




async function getUserById(userId) {
  try {
    let user = await db.User.findOne({
      where: { id: userId },
      raw: true,

    });

    if (user) {
      return user
    } else {
      return {}
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function getUserRole(userId) {
  try {
    let user = await db.User.findOne({
      where: { id: userId },
      raw: true,

    });

    let Role = await db.Allcode.findOne({
      where: { id: user.roleId }
    })

    return Role.value;
  } catch (e) {
    throw new Error(e);
  }
}

async function updateUserData(data) {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },

    })
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      user.phonenumber = data.phonenumber;
      user.gender = data.gender;
      user.image = data.image


      await user.save();
      let allUsers = await db.User.findAll();
      return allUsers

    } else {
      return {}
    }

  } catch (e) {
    throw new Error(e);
  }
}

async function deleteUserById(userId) {
  try {
    let user = await db.User.findOne({
      where: { id: userId }
    })
    if (user) {
      await user.destroy();

    }

    return "delete successful";

  } catch (e) {
    throw new Error(e);
  }
}
let getAllPatients = async () => {
  try {
    // Truy vấn tất cả người dùng với roleId là "R2"
    let allUsers = await db.User.findAll({
      where: {
        roleId: "R2"
      },
      raw: true // Sử dụng raw để nhận về dữ liệu không phải là đối tượng Sequelize
    });
    return allUsers; // Trả về dữ liệu
  } catch (err) {
    console.error("Error fetching patients:", err); // Log chi tiết lỗi
    throw err; // Ném lại lỗi gốc để xử lý ở nơi gọi hàm
  }
}


let addDoctor = async (image, email, Dname, password, specialty, experience, fees, address, info) => {
  const mappingSpe = {
    "General Physician": 1,
    "Gynecologist": 2,
    "Dermatologist": 3,
    "Pediatricians": 4,
    "Neurologist": 5,
    "Gastroenterologist": 6,
  };

  // Kiểm tra email đã tồn tại chưa
  const check = await db.User.findOne({
    where: {
      email: email,
    },
  });

  // Hash mật khẩu
  let hashPassWordFromBcrypt = await hashPassword(password);

  if (!check) {
    // Thêm user mới
    const newdoc = await db.User.create({
      email: email,
      firstName: splitFullName(Dname).firstName,
      lastName: splitFullName(Dname).lastName,
      password: hashPassWordFromBcrypt,
      image: image,
      address: address,
      roleId: "R1",
      positionId: "P1",
    });

    // Thêm thông tin chuyên môn của bác sĩ
    await db.DoctorWithSpecialty.create({
      doctorId: newdoc.id,
      specialtyId: mappingSpe[specialty],
    });

    // Thêm thông tin chi tiết của bác sĩ
    await db.Doctorinfo.create({
      doctorId: newdoc.id,
      info: info,
      degree: "MBSS",
      experience: experience,
      appointmentFee: fees,
    });

    return { success: true, message: "Doctor added successfully" };
  } else {
    return { success: false, message: "Email already exists" };
  }
};
let updateDoctorById = async (id, image, email, Dname, password, specialty, experience, fees, address, info) => {
  const mappingSpe = {
    "General Physician": 1,
    "Gynecologist": 2,
    "Dermatologist": 3,
    "Pediatricians": 4,
    "Neurologist": 5,
    "Gastroenterologist": 6,
  };

  // Kiểm tra bác sĩ có tồn tại không trong bảng User
  const doctor = await db.User.findOne({
    where: {
      id: id,
    },
  });

  if (!doctor) {
    return { success: false, message: "Doctor not found" };
  }

  // Kiểm tra email đã tồn tại chưa, nhưng bỏ qua email hiện tại của bác sĩ
  if (email !== doctor.email) {
    const emailCheck = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (emailCheck) {
      return { success: false, message: "Email already exists" };
    }
  }

  // Hash mật khẩu nếu có thay đổi và password không phải là chuỗi rỗng
  let hashPassWordFromBcrypt = password ? await hashPassword(password) : doctor.password;

  // Cập nhật thông tin bác sĩ trong bảng User
  await db.User.update(
    {
      email: email,
      firstName: splitFullName(Dname).firstName,
      lastName: splitFullName(Dname).lastName,
      password: hashPassWordFromBcrypt,
      image: image,
      address: address,
    },
    {
      where: {
        id: id,
      },
    }
  );

  // Tìm doctorId trong bảng DoctorWithSpecialty
  const doctorWithSpecialty = await db.DoctorWithSpecialty.findOne({
    where: {
      doctorId: id,
    },
  });

  if (doctorWithSpecialty) {
    // Cập nhật thông tin chuyên môn trong bảng DoctorWithSpecialty dựa trên doctorId
    await db.DoctorWithSpecialty.update(
      {
        specialtyId: mappingSpe[specialty],
      },
      {
        where: {
          id: doctorWithSpecialty.id,  // Cập nhật dựa trên id của DoctorWithSpecialty
        },
      }
    );
  }

  // Tìm doctorId trong bảng Doctorinfo
  const doctorInfo = await db.Doctorinfo.findOne({
    where: {
      doctorId: id,
    },
  });

  if (doctorInfo) {
    // Cập nhật thông tin chi tiết trong bảng Doctorinfo dựa trên doctorId
    await db.Doctorinfo.update(
      {
        info: info,
        degree: "MBSS",  // Có thể tuỳ chỉnh nếu cần
        experience: experience,
        appointmentFee: fees,
      },
      {
        where: {
          id: doctorInfo.id,  // Cập nhật dựa trên id của Doctorinfo
        },
      }
    );
  }

  return { success: true, message: "Doctor updated successfully" };
};

module.exports = {updateDoctorById, hashPassword,getAllDoctorForAdmin, createNewUser, getAllUser, getUserById, updateUserData, deleteUserById, getUserRole,getAllDoctor,getAllPatients,addDoctor};
