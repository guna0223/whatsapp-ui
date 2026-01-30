import { useState, useEffect, useRef } from "react";
import "../css/ChatWindows.css";

function ChatWindow({ chat, onSendMessage }) {
    const [messageText, setMessageText] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Auto-scroll to bottom when messages update
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat]);

    if (!chat) {
        return (
            <div className="chat-window-empty">
                <h2>WhatsApp</h2>
                <p>Select a chat to start messaging</p>
            </div>
        );
    }

    const handleSend = () => {
        if (messageText.trim() === "") return;
        onSendMessage(chat.id, messageText);
        setMessageText("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-window-header">
                <div className="chat-window-header-left">
                    <img 
                        src={chat.avatar} 
                        alt={chat.name} 
                        className="chat-window-header-avatar" 
                    />
                    <div className="chat-window-header-info">
                        <h3>{chat.name}</h3>
                        <p>Click here for contact info</p>
                    </div>
                </div>
                <div className="chat-window-header-icons">
                    <span className="chat-window-header-icon"><i className="bi bi-camera-video"></i></span>
                    <span className="chat-window-header-icon"><i className="bi bi-telephone"></i></span>
                    <span className="chat-window-header-icon"><i className="bi bi-three-dots-vertical"></i></span>
                </div>
            </div>

            <div className="chat-messages">
                {chat.messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`chat-message ${msg.from === "Me" ? "sent" : "received"}`}
                    >
                        <div className="chat-message-text">{msg.text}</div>
                        <div className="chat-message-meta">
                            <span>{msg.timestamp}</span>
                            {msg.from === "Me" && <i className="bi bi-check-all"></i>}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <i className="bi bi-emoji-smile"></i>
                <i className="bi bi-paperclip"></i>
                <div className="chat-input-container">
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                    />
                </div>
                <button onClick={handleSend}>
                    <i className="bi bi-send"></i>
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
