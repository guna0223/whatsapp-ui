import "../css/ChatListItem.css";

const ChatListItem = ({ chat, onClick, active }) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    const time = lastMessage?.timestamp || "";
    
    return (
        <div
            onClick={onClick}
            className={`chat-item ${active ? "active" : ""}`}
        >
            <img
                src={chat.avatar}
                alt={chat.name}
                className="chat-item-avatar"
            />
            <div className="chat-item-content">
                <div className="chat-item-header">
                    <span className="chat-item-name">{chat.name}</span>
                    <span className="chat-item-time">{time}</span>
                </div>
                <div className="chat-item-preview">
                    {lastMessage?.text}
                </div>
            </div>
        </div>
    );
};

export default ChatListItem;
