import ChatListItem from "../ChatListItem/ChatListItem";
import "../css/Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar({ 
    chats, 
    statusList, 
    callsList,
    onSelectChat, 
    selectedChat, 
    activeTab, 
    setActiveTab,
    searchQuery,
    setSearchQuery,
    onStatusClick 
}) {
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleChatClick = (chat) => {
        onSelectChat(chat);
        setActiveTab("chats");
    };

    return (
        <div className="sidebar">
            {/* Sidebar Header */}
            <div className="sidebar-header">
                <div className="sidebar-header-left">
                    <img 
                        src="https://i.pravatar.cc/150?img=1" 
                        alt="User" 
                        className="user-avatar" 
                    />
                </div>
                <div className="sidebar-header-icons">
                    <span className="sidebar-header-icon"><i className="bi bi-story"></i></span>
                    <span className="sidebar-header-icon"><i className="bi bi-chat-square-text"></i></span>
                    <span className="sidebar-header-icon"><i className="bi bi-arrow-repeat"></i></span>
                    <span className="sidebar-header-icon"><i className="bi bi-three-dots-vertical"></i></span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <div className="search-box">
                    <i className="bi bi-search"></i>
                    <input 
                        type="text" 
                        placeholder="Search or start a new chat" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="sidebar-tabs">
                <div 
                    className={`tab ${activeTab === "chats" ? "active" : ""}`}
                    onClick={() => handleTabClick("chats")}
                >
                    Chats
                </div>
                <div 
                    className={`tab ${activeTab === "status" ? "active" : ""}`}
                    onClick={() => handleTabClick("status")}
                >
                    Status
                </div>
                <div 
                    className={`tab ${activeTab === "calls" ? "active" : ""}`}
                    onClick={() => handleTabClick("calls")}
                >
                    Calls
                </div>
            </div>

            {/* Content based on active tab */}
            <div className="chat-list">
                {activeTab === "chats" && (
                    <>
                        {chats.length === 0 ? (
                            <div style={{ padding: "20px", textAlign: "center", color: "#667781" }}>
                                No chats found
                            </div>
                        ) : (
                            chats.map((chat) => (
                                <ChatListItem
                                    key={chat.id}
                                    chat={chat}
                                    onClick={() => handleChatClick(chat)}
                                    active={selectedChat?.id === chat.id}
                                />
                            ))
                        )}
                    </>
                )}

                {activeTab === "status" && (
                    <div className="status-content">
                        {/* My Status */}
                        <div className="status-item-row" onClick={() => onStatusClick({ id: 1, name: "My Status", avatar: "https://i.pravatar.cc/150?img=1", isMyStatus: true })}>
                            <div className="status-avatar-small add-status">
                                <i className="bi bi-plus"></i>
                            </div>
                            <div className="status-info">
                                <span className="status-name-text">My Status</span>
                                <span className="status-time-text">Tap to add status update</span>
                            </div>
                        </div>
                        
                        {/* Recent Updates */}
                        <div className="status-section-title">Recent Updates</div>
                        {statusList.filter(s => !s.isMyStatus).map((status) => (
                            <div key={status.id} className="status-item-row" onClick={() => onStatusClick(status)}>
                                <img src={status.avatar} alt={status.name} className="status-avatar-small" />
                                <div className="status-info">
                                    <span className="status-name-text">{status.name}</span>
                                    <span className="status-time-text">Today at {Math.floor(Math.random() * 12) + 1}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')} PM</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "calls" && (
                    <div className="calls-content">
                        {callsList.map((call) => (
                            <div key={call.id} className="call-item-row" onClick={() => alert(`Call ${call.name}`)}>
                                <img src={call.avatar} alt={call.name} className="call-avatar-small" />
                                <div className="call-info">
                                    <span className="call-name-text">{call.name}</span>
                                    <span className="call-detail-text">
                                        <i className={`bi ${call.type === "incoming" ? "bi-arrow-down-left" : call.type === "outgoing" ? "bi-arrow-up-right" : "bi-x-lg"}`}></i>
                                        {call.time}
                                    </span>
                                </div>
                                <div className="call-action">
                                    <i className="bi bi-telephone-fill" style={{ color: "#00a884" }}></i>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
