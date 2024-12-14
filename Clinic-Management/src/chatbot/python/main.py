import sys
import json
import logging
from gemini_api import GeminiAPI
import os
from pathlib import Path
from datetime import datetime, timedelta
# Cấu hình logging

# Xác định thư mục chứa file hiện tại và đường dẫn tới file API keys
base_dir = Path(__file__).resolve().parent  # Thư mục chứa file hiện tại
api_keys_file = base_dir / "gemini_api.txt"  # Đường dẫn tương đối đến file API keys

# Tạo đối tượng GeminiAPI
gemini_api = GeminiAPI(api_keys_file=api_keys_file)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
sys.stdout.reconfigure(encoding='utf-8')
# Kiểm tra tham số đầu vào
if len(sys.argv) < 2:
    logging.error("Không có dữ liệu JSON được truyền vào.")
    sys.exit(1)

try:
    # Phân tích cú pháp JSON từ tham số đầu tiên
    data = json.loads(sys.argv[1])
    question = data['question']
    clinic_info = data['clinicInfo']

    logging.info(f"Received question: {question}")
    logging.info(f"Received clinic info: {clinic_info}")

    # Xử lý câu hỏi và trả về câu trả lời (giả sử đây là câu trả lời mẫu)
    answer = gemini_api.extract_info(question,clinic_info)
    print(answer)

except json.JSONDecodeError as e:
    logging.error(f"Lỗi khi phân tích cú pháp JSON: {str(e)}")
    sys.exit(1)
except KeyError as e:
    logging.error(f"Thiếu khóa trong dữ liệu JSON: {str(e)}")
    sys.exit(1)
