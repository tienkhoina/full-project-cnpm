import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../axiosClient"; // Import axiosClient

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Thêm tin nhắn người dùng vào list
      setMessages([...messages, { text: message, isUser: true }]);
      setMessage(""); // Clear input after sending

      // Bắt đầu chờ và hiển thị hiệu ứng loading
      setIsLoading(true);
      
      try {
        // Gửi request đến API
        const response = await axiosClient.post('/get-bot-response', { message: message });
        console.log(response)
        // Chờ kết quả và cập nhật tin nhắn từ bot
        setIsLoading(false); // Tắt hiệu ứng loading

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.response, isUser: false }, // Bot trả lời
        ]);
      } catch (error) {
        setIsLoading(false); // Tắt hiệu ứng loading khi có lỗi
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Có lỗi xảy ra, vui lòng thử lại.", isUser: false },
        ]);
      }
    }
  };

  // Xử lý sự kiện khi nhấn phím Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn không cho tạo dòng mới khi nhấn Enter
      handleSendMessage(); // Gửi tin nhắn khi nhấn Enter
    }
  };

  // Cuộn xuống dưới mỗi khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={`fixed bottom-5 left-5 w-80 p-4 border bg-white shadow-lg rounded-lg transition-all ${
        isChatOpen ? "h-[400px]" : "h-[60px]"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Chat với Bot</h3>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          {isChatOpen ? "Đóng" : "Mở"}
        </button>
      </div>
      {isChatOpen && (
        <div className="flex flex-col space-y-3 overflow-auto max-h-[250px] pr-4 pb-16">
          {/* Tin nhắn hiển thị */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-2 max-w-[70%] rounded-lg ${
                  msg.isUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Hiệu ứng loading khi bot đang chờ */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-2 max-w-[70%] rounded-lg bg-gray-200 text-gray-800">
                <span className="animate-pulse">Đang xử lý...</span> {/* Hiệu ứng ba chấm */}
              </div>
            </div>
          )}

          {/* Đảm bảo cuộn tới cuối */}
          <div ref={messagesEndRef} />
        </div>
      )}
      {isChatOpen && (
        <div
          className="flex absolute bottom-5 left-0 w-full p-2 bg-white"
          style={{ bottom: "0" }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Xử lý sự kiện nhấn Enter
            className="w-full p-2 border rounded-lg resize-none"
            placeholder="Nhập tin nhắn..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
          >
            Gửi
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
