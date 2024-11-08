import { useState } from "react";
import { MessageSquareIcon } from "lucide-react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const predefinedOptions = [
    { label: "View Cereals", response: "We offer a variety of cereals such as oats, cornflakes, muesli, and more!" },
    { label: "View Vegetables", response: "We sell fresh, high-quality vegetables like carrots, potatoes, tomatoes, and more." },
    { label: "View Fruits", response: "We have a great selection of fruits including apples, bananas, oranges, and berries." },
    { label: "Contact Support", response: "You can contact our customer support team by emailing us at skywalker4759@gmail.com." },
    { label: "Track Order", response: "You can track your order status by logging into your account and checking the order history." },
  ];

  const toggleChatbot = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionSelect = (option) => {
    // Add user selection to chat
    const userMessage = { text: option.label, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Add chatbot response to chat
    const botReply = { text: option.response, isUser: false };
    setMessages((prevMessages) => [...prevMessages, botReply]);
  };

  return (
    <div>
      {/* Chatbot button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <MessageSquareIcon className="w-6 h-6" />
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-96 bg-white border border-gray-300 shadow-xl rounded-lg z-50">
          <div className="p-4 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="font-bold">Chat with Us</span>
              <button onClick={toggleChatbot} className="text-red-500">
                Close
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 my-1 rounded-md ${
                    msg.isUser ? "bg-blue-500 text-white self-end" : "bg-gray-300 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Options */}
            <div className="flex flex-col space-y-2">
              {predefinedOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
