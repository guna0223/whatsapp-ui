import ChatListItem from "../ChatListItem/ChatListItem";
import "../css/Sidebar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Sidebar({ chats, onSelectChat, selectedChat }) {
  return (
    <>
      <div className="small-sidebar">
        <div className="small-icons">
          <div><i class="bi bi-chat-square-text"></i></div>
          <div><i class="bi bi-arrow-repeat"></i></div>
          <div><i class="bi bi-chat-square-dots"></i></div>
          <div><i class="bi bi-people-fill"></i></div>
          <hr />
          <span></span>
        </div>
      </div>
      <div className="sidebar">
        <div className="sidebar-section">
          <h2 className="sidebar-title">
            WhatApp
          </h2>
          <div>
            <span className="chat-icon"><i class="bi bi-chat-square-text"></i></span>
            <span className="menu-icon"><i class="bi bi-three-dots-vertical"></i></span>
          </div>
        </div>

        <form action="">
          <input type="text" placeholder="Search or start a newchat" />
        </form>

        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onClick={() => onSelectChat(chat)}
            active={selectedChat?.id === chat.id}
          />
        ))}
      </div >
    </>
  );
}

export default Sidebar;
