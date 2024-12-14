const db = require('../../models/index');
const { getAllDoctor } = require('../../services/CRUDservices');

let generatePrompt = async () => {
    let mapSpe = {
        "General physician": "Bác sĩ đa khoa",
        "Gynecologist": "Bác sĩ phụ khoa",
        "Dermatologist": "Bác sĩ da liễu",
        "Pediatricians": "Bác sĩ nhi khoa",
        "Neurologist": "Bác sĩ thần kinh",
        "Gastroenterologist": "Bác sĩ chuyên khoa tiêu hóa"
    };

    try {
        let alldoctor = await getAllDoctor();

        let doctorsInfo = alldoctor.map(doctor => {
            return `- Tên bác sĩ: ${doctor.name}, Chuyên khoa: ${mapSpe[doctor.speciality]}, Kinh nghiệm: ${doctor.experience}, Giá: ${doctor.fees}$`;
        }).join("\n");

        let prompt = `

**Thông tin phòng khám**:
- Tên: Phòng khám ABC
- Địa chỉ: Số 123, Đường XYZ, Thành phố Hà Nội
- Giờ làm việc: Thứ 2 - Chủ Nhật, từ 8:00 đến 11:00 và từ 13:00 đến 17:00
- Dịch vụ:
    + Đặt lịch khám riêng với bác sĩ phù hợp
    + Khám chuyên khoa
    + Xét nghiệm và chẩn đoán hình ảnh
    + Tư vấn bệnh
- Gồm ${alldoctor.length} bác sĩ với 6 chuyên khoa 
- Số điện thoại hỗ trợ: 0987 654 321
- Website: www.phongkhamabc.vn

**Danh sách và thông tin bác sĩ**:
${doctorsInfo}

end

`;

        return prompt;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin bác sĩ: ", error);
    }
    
};

module.exports = {generatePrompt}
