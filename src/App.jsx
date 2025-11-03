import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";

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
    },
    {
      id: 2,
      name: "Bob",
      avatar: "https://i.pravatar.cc/150?img=2",
      messages: [
        { from: "Bob", text: "Did you finish the report?", timestamp: "9:30 AM" },
        { from: "Me", text: "Almost! Sending it soon.", timestamp: "9:31 AM" },
      ],
    },
    {
      id: 3,
      name: "Charlie",
      avatar: "https://i.pravatar.cc/150?img=3",
      messages: [
        { from: "Charlie", text: "You free this weekend?", timestamp: "11:15 AM" },
        { from: "Me", text: "Yeah, what’s up?", timestamp: "11:16 AM" },
      ],
    },
    {
      id: 4,
      name: "Diana",
      avatar: "https://i.pravatar.cc/150?img=4",
      messages: [
        { from: "Diana", text: "Can you send me the recipe?", timestamp: "2:00 PM" },
        { from: "Me", text: "Sure, one sec!", timestamp: "2:01 PM" },
      ],
    },
    {
      id: 5,
      name: "Ethan",
      avatar: "https://i.pravatar.cc/150?img=5",
      messages: [
        { from: "Ethan", text: "Yo, did you see the match last night?", timestamp: "8:45 AM" },
        { from: "Me", text: "Yeah! That last goal was insane ⚽", timestamp: "8:46 AM" },
      ],
    },
  ];

  // 🔹 Version key to reset localStorage if initialChats change
  const DATA_VERSION = "v1.0.0";

  // 🔹 Load data from localStorage or fall back to initialChats
  const [chats, setChats] = useState(() => {
    const stored = localStorage.getItem("chats");
    const version = localStorage.getItem("dataVersion");
    if (stored && version === DATA_VERSION) {
      return JSON.parse(stored);
    }
    // reset localStorage if version changed
    localStorage.setItem("chats", JSON.stringify(initialChats));
    localStorage.setItem("dataVersion", DATA_VERSION);
    return initialChats;
  });

  const [selectedChat, setSelectedChat] = useState(chats[0]);

  // 💾 Save chats whenever they change
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // 📨 Send message handler
  const handleSendMessage = (chatId, messageText) => {
    const newMessage = {
      from: "Me",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === chatId
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );

    setChats(updatedChats);
    setSelectedChat(updatedChats.find((chat) => chat.id === chatId));
  };

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        chats={chats}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
