import ChatListItem from "../ChatListItem/ChatListItem";

function Sidebar({ chats, onSelectChat, selectedChat }) {
  return (
    <div className="sidebar">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          onClick={() => onSelectChat(chat)}
          active={selectedChat?.id === chat.id}
        />
      ))}
    </div>
  );
}

export default Sidebar;
