import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import StatusView from "./components/StatusView/StatusView";
import "./components/css/index.css";

function App() {
  const initialChats = [
    {
      id: 1,
      name: "Alice",
      avatar: "https://i.pravatar.cc/150?img=1",
      messages: [
        { from: "Alice", text: "Hey, how are you?", timestamp: "10:01 AM" },
        { from: "Me", text: "Good, thanks! You?", timestamp: "10:02 AM" },
        { from: "Alice", text: "soluga", timestamp: "10:04 AM" },
      ],
      isOnline: true,
    },
    {
      id: 2,
      name: "Bob",
      avatar: "https://i.pravatar.cc/150?img=2",
      messages: [
        { from: "Bob", text: "Did you finish the report?", timestamp: "9:30 AM" },
        { from: "Me", text: "Almost! Sending it soon.", timestamp: "9:31 AM" },
      ],
      isOnline: false,
    },
    {
      id: 3,
      name: "Charlie",
      avatar: "https://i.pravatar.cc/150?img=3",
      messages: [
        { from: "Charlie", text: "You free this weekend?", timestamp: "11:15 AM" },
        { from: "Me", text: "Yeah, what's up?", timestamp: "11:16 AM" },
      ],
      isOnline: true,
    },
    {
      id: 4,
      name: "Diana",
      avatar: "https://i.pravatar.cc/150?img=4",
      messages: [
        { from: "Diana", text: "Can you send me the recipe?", timestamp: "2:00 PM" },
        { from: "Me", text: "Sure, one sec!", timestamp: "2:01 PM" },
      ],
      isOnline: true,
    },
    {
      id: 5,
      name: "Ethan",
      avatar: "https://i.pravatar.cc/150?img=5",
      messages: [
        { from: "Ethan", text: "Yo, did you see the match last night?", timestamp: "8:45 AM" },
        { from: "Me", text: "Yeah! That last goal was insane", timestamp: "8:46 AM" },
      ],
      isOnline: false,
    },
    {
      id: 6,
      name: "Fiona",
      avatar: "https://i.pravatar.cc/150?img=6",
      messages: [
        { from: "Fiona", text: "Where are you now?", timestamp: "3:10 PM" },
        { from: "Me", text: "On the way!", timestamp: "3:11 PM" }
      ],
      isOnline: true,
    },
    {
      id: 7,
      name: "George",
      avatar: "https://i.pravatar.cc/150?img=7",
      messages: [
        { from: "George", text: "Bro, check this meme", timestamp: "7:20 AM" },
        { from: "Me", text: "LOL send more", timestamp: "7:21 AM" }
      ],
      isOnline: false,
    }
  ];

  const initialStatusList = [
    { id: 1, name: "My Status", avatar: "https://i.pravatar.cc/150?img=1", isMyStatus: true },
    { id: 2, name: "Alice", avatar: "https://i.pravatar.cc/150?img=1", isMyStatus: false },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3", isMyStatus: false },
    { id: 4, name: "Diana", avatar: "https://i.pravatar.cc/150?img=4", isMyStatus: false },
    { id: 5, name: "Fiona", avatar: "https://i.pravatar.cc/150?img=6", isMyStatus: false },
  ];

  const initialCallsList = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=1", type: "incoming", time: "10:01 AM", duration: "0:45" },
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=2", type: "outgoing", time: "9:30 AM", duration: "2:15" },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3", type: "missed", time: "11:15 AM", duration: "0:00" },
    { id: 4, name: "Diana", avatar: "https://i.pravatar.cc/150?img=4", type: "incoming", time: "2:00 PM", duration: "5:30" },
  ];

  const DATA_VERSION = "v1.0.0";

  const [chats, setChats] = useState(() => {
    const stored = localStorage.getItem("chats");
    const version = localStorage.getItem("dataVersion");
    if (stored && version === DATA_VERSION) {
      return JSON.parse(stored);
    }

    localStorage.setItem("chats", JSON.stringify(initialChats));
    localStorage.setItem("dataVersion", DATA_VERSION);
    return initialChats;
  });

  const [statusList] = useState(initialStatusList);
  const [callsList] = useState(initialCallsList);
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [activeTab, setActiveTab] = useState("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (chatId, messageText) => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const newMessage = {
      from: "Me",
      text: messageText,
      timestamp: `${hours}:${minutes} ${ampm}`,
    };

    const updatedChats = chats.map((chat) =>
      chat.id === chatId
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );

    setChats(updatedChats);
    setSelectedChat(updatedChats.find((chat) => chat.id === chatId));
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const handleCloseStatus = () => {
    setSelectedStatus(null);
  };

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        chats={filteredChats}
        statusList={statusList}
        callsList={callsList}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onStatusClick={handleStatusClick}
      />
      <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
      {selectedStatus && (
        <StatusView status={selectedStatus} onClose={handleCloseStatus} />
      )}
    </div>
  );
}

export default App;
