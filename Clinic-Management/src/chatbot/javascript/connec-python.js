const { spawnSync, spawn } = require('child_process');
const readline = require('readline');
const { generatePrompt } = require('./generate-prompt');
const path = require('path');

// Đường dẫn tới script Python và môi trường ảo
const scriptPath = path.resolve(__dirname, '../python/main.py');
const activateEnvPath = path.resolve(__dirname, '../python/env/Scripts/Activate.ps1');

// Hàm để kích hoạt môi trường ảo
function activateVirtualEnv() {
  const activateProcess = spawnSync('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', activateEnvPath], {
    stdio: 'inherit'
  });

  if (activateProcess.error) {
    console.error("Không thể kích hoạt môi trường ảo:", activateProcess.error);
    process.exit(1);
  }
}

// Hàm gửi câu hỏi tới script Python và nhận kết quả trả về
function askQuestion(question, clinicInfo) {
  return new Promise((resolve, reject) => {
    const dataToSend = JSON.stringify({ question: question, clinicInfo: clinicInfo });
    console.log(clinicInfo)
    // Tạo quá trình chạy script Python với tham số
    const pythonProcess = spawn('python', [scriptPath, dataToSend]);

    let response = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      response += data.toString('utf8');
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString('utf8');
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        console.error(`stderr: ${errorOutput}`);
        reject(`Python script lỗi với code ${code}. stderr: ${errorOutput}`);
      } else {
        resolve(response.trim());
      }
    });
  });
}

// Thiết lập giao diện để nhận đầu vào từ người dùng
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Kích hoạt môi trường ảo một lần duy nhất khi bắt đầu chương trình
activateVirtualEnv();

// Hàm nhận đầu vào và xử lý
async function getUserInput() {
  try {
    // Lấy thông tin phòng khám từ hàm generatePrompt
    const clinicInfo = await generatePrompt();
    console.log('Thông tin phòng khám đã sẵn sàng.', clinicInfo);

    rl.question('Nhập câu hỏi của bạn (hoặc "exit" để thoát): ', (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('Đã thoát khỏi chương trình.');
        rl.close();
        return;
      }

      askQuestion(input, clinicInfo)
        .then((response) => {
          console.log(`Câu trả lời từ Python: ${response}`);
          getUserInput(); // Tiếp tục nhận câu hỏi
        })
        .catch((error) => {
          console.error(`Lỗi: ${error}`);
          getUserInput(); // Tiếp tục nhận câu hỏi
        });
    });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin phòng khám:', error);
    process.exit(1); // Thoát nếu không thể lấy thông tin phòng khám
  }
}

// Bắt đầu chương trình
getUserInput();

module.exports = {askQuestion,activateVirtualEnv}
