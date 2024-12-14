import google.generativeai as genai
import os


class GeminiAPI:
    def __init__(self, api_keys_file):
        self.api_keys = self.load_api_keys(api_keys_file)
        self.api_key_index = 0
        if self.api_keys:
            self.configure_genai(self.api_keys[self.api_key_index])

    def load_api_keys(self, file_path):
        """Đọc danh sách API key từ file gemini_api.txt"""
        try:
            with open(file_path, "r") as f:
                api_keys = [line.strip() for line in f.readlines() if line.strip()]
            return api_keys
        except FileNotFoundError:
            print("File gemini_api.txt không tồn tại.")
            return []

    def configure_genai(self, api_key):
        """Cấu hình API key cho Google Generative AI"""
        try:
            os.environ["GOOGLE_API_KEY"] = api_key
            genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
            return True
        except Exception as e:
            print(f"Lỗi cấu hình API key {api_key}: {str(e)}")
            return False

    def switch_api_key(self):
        """Đổi sang API key tiếp theo khi xảy ra lỗi"""
        self.api_key_index += 1
        if self.api_key_index < len(self.api_keys):
            print(f"Chuyển sang API key mới: {self.api_keys[self.api_key_index]}")
            return self.configure_genai(self.api_keys[self.api_key_index])
        else:
            print("Tất cả API key đều không khả dụng.")
            return False

    def get_available_models(self):
        """Lấy danh sách các model khả dụng từ API key hiện tại"""
        try:
            models = genai.list_models()
            return [
                m.name
                for m in models
                 if "generateContent" in m.supported_generation_methods and "gemini-1.0-pro" not in m.name
            ]
        except Exception as e:
            print(f"Lỗi khi lấy danh sách model: {str(e)}")
            return []

    def extract_info(self, prompt_text,clinic_info):
        """Trả lời câu hỏi của khách hàng dựa trên thông tin phòng khám"""
        full_prompt = f"""
        Bạn là một tư vấn viên hỗ trợ khách hàng của phòng khám. Hãy trả lời các câu hỏi của khách hàng một cách chi tiết, chuyên nghiệp, và dễ hiểu dựa trên các thông tin sau:
        
        **Thông tin phòng khám**:
         {clinic_info}

        **Yêu cầu của bạn**:
        - Trả lời ngắn gọn nhưng đầy đủ và chuyên nghiệp.
        - Sử dụng giọng văn thân thiện, dễ hiểu nhưng không mất tính chuyên môn.
        - Nếu câu hỏi ngoài phạm vi hỗ trợ hoặc không có thông tin, hãy đề nghị khách hàng liên hệ qua hotline hoặc truy cập website.
        - Không cung cấp thông tin không được xác thực.

        **Ví dụ câu hỏi và câu trả lời**:
        - Câu hỏi: "Phòng khám có khám da liễu không?"
        Trả lời: "Phòng khám chúng tôi có dịch vụ khám da liễu. Bạn có thể đặt lịch hẹn từ Thứ 2 đến Thứ 7 qua hotline 0987 654 321."
        - Câu hỏi: "Giờ làm việc của phòng khám thế nào?"
        Trả lời: "Phòng khám mở cửa cả tuần từ 8:00 đến 11:00 và từ 13:00 đến 17:00."
        - Câu hỏi: "Chi phí khám bệnh là bao nhiêu?"
        Trả lời: "Chi phí khám tùy thuộc vào bác sĩ mà bạn hẹn, vui lòng liên hệ hotline hoặc truy cập trực tiếp trang web để biết thêm thông tin chi tiết."
        
        **Câu hỏi từ khách hàng**:
        {prompt_text}

        Hãy trả lời câu hỏi trên.
        """

        # Lấy danh sách các model khả dụng từ API key hiện tại
        models = self.get_available_models()

        if not models:
            print("Không có model nào khả dụng. Đổi API key...")
            if not self.switch_api_key():
                return None  # Nếu không còn API key nào khả dụng, trả về None

        # Duyệt qua từng model để thử
        for model_name in models:
            try:
                
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(full_prompt)

                # Nếu có kết quả, trả về kết quả
                if response and response.text:
                    return response.text

            except Exception as e:
                # Xử lý lỗi liên quan đến token hoặc model
                if "Illegal header value" in str(
                    e
                ) or "Plugin added invalid metadata" in str(e):
                    print(f"Lỗi token hoặc chứng thực: {str(e)}. Chuyển API key...")
                    if not self.switch_api_key():
                        return None  # Nếu không còn API key nào khả dụng, trả về None
                    models = (
                        self.get_available_models()
                    )  # Cập nhật model mới cho API key mới
                else:
                    print(f"Lỗi khi sử dụng model {model_name}: {str(e)}")
                    continue  # Chuyển sang model tiếp theo

        print("Không thể trích xuất thông tin với tất cả các model.")
        return None
