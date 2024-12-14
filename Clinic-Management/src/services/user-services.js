const bcrypt = require('bcrypt');
const db = require('../models/index');

// Kiểm tra sự tồn tại của email
async function checkUserEmail(email) {
    try {
        let user = await db.User.findOne({
            where: { email: email }
        });
        return user !== null;
    } catch (e) {
        throw new Error('Error checking email existence: ' + e.message);
    }
}

// Xử lý đăng nhập người dùng
async function handleUserLogin(email, password) {
    try {
        let userData = {};
        let isExist = await checkUserEmail(email);

        if (isExist) {
            // Tìm thông tin người dùng với email
            let user = await db.User.findOne({
                attributes: ['id', 'email', 'roleId', 'password'],
                where: { email: email },
                raw: true,
            });

            if (user) {
                // So sánh mật khẩu nhập vào với mật khẩu trong cơ sở dữ liệu
                let check = await bcrypt.compare(password, user.password);

                if (check) {
                    // Nếu mật khẩu đúng, trả về thông tin người dùng
                    userData.errCode = 0;
                    userData.errMessage = 'OK';
                    delete user.password;  // Xóa mật khẩu khỏi kết quả trả về
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong password';
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = 'User not found';
            }
        } else {
            userData.errCode = 4;
            userData.errMessage = `Your email isn't in our system`;
        }
        return userData; // Trả về kết quả
    } catch (e) {
        throw new Error('Error during user login: ' + e.message);
    }
}

let getMyAppointment = async (userId) => {
    try {
      let user = await db.Booking.findAll({
        where: { patientID: userId },
        raw: true,
      });
      return user;
    } catch (err) {
      throw err;
    }
};


let updateImage = async (userId, base64String) => {
    try {
        const [affectedRows] = await db.User.update(
            { image: base64String }, // Dữ liệu cần cập nhật
            { where: { id: userId } } // Điều kiện
        );

        if (affectedRows > 0) {
            console.log("User image updated successfully!");
        } else {
            console.log("No user found with the given ID.");
        }
    } catch (error) {
        console.error("Error updating user image:", error);
    }
};





module.exports = { handleUserLogin,getMyAppointment,updateImage };
