import  { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    const whatsappUrl = `https://wa.me/+263716625255?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setMessage("");
  };

  return (
    <div id="chatbot" className={`chatbot ${isOpen ? "stop-animation" : ""}`}>
      <button className="chatbot-toggle" onClick={toggleChatbot}>
       Chat
      </button>
      {isOpen && (
        <div id="chat" className="chat-window">
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send to WhatsApp</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
