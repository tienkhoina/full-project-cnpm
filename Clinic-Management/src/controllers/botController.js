const {activateVirtualEnv,askQuestion} = require('../chatbot/javascript/connec-python')
const {generatePrompt} =require('../chatbot/javascript/generate-prompt')
let getResponse = async (req, res) => {
    let chat = req.body.message;
    console.log(req.body)
    
    // Kích hoạt môi trường ảo
    activateVirtualEnv();
  
    try {
      // Lấy thông tin phòng khám từ hàm generatePrompt
      let clinicInfo = await generatePrompt();
  
      // Chờ đợi kết quả từ Python script
      let response = await askQuestion(chat, clinicInfo);
  
      // Trả về câu trả lời nếu có
      return res.status(200).json({
        response: response.trim() // Trả về câu trả lời đã xử lý
      });
  
    } catch (error) {
      // Nếu có lỗi, trả về lỗi
      console.error(`Lỗi: ${error}`);
      return res.status(500).json({
        error: "Không thể lấy câu trả lời từ Python"
      });
    }
  };
  

module.exports={getResponse}