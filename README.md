# WhatsApp UI Clone

A React-based WhatsApp UI clone featuring chat functionality, status updates, and call history. This is a frontend-only implementation with localStorage persistence.

## Features

- **Chat Management**: View and manage multiple conversations with different contacts
- **Message Sending**: Send messages to any chat (persisted to localStorage)
- **Status Updates**: View contact status updates with overlay display
- **Call History**: View incoming, outgoing, and missed call logs
- **Search**: Filter chats by contact name
- **Responsive Design**: Works on desktop and mobile layouts
- **Data Persistence**: All chat data is saved to localStorage

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
whatsapp-ui/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatListItem/     # Chat list item component
│   │   │   ├── ChatWindow/       # Message display and input
│   │   │   ├── Header/           # App header
│   │   │   ├── Sidebar/          # Main navigation sidebar
│   │   │   └── StatusView/       # Status overlay component
│   │   ├── assets/               # Static assets
│   │   ├── App.jsx               # Main application component
│   │   └── main.jsx              # Entry point
│   ├── index.html
│   └── package.json
```

## Usage

### Sending Messages
1. Click on any chat from the sidebar
2. Type your message in the input field at the bottom
3. Press Enter or click the send button to send

### Viewing Status
1. Click on the "Status" tab in the sidebar
2. Click on any status to view it in full-screen overlay

### Searching Chats
1. Use the search bar at the top of the sidebar
2. Type a contact name to filter the chat list

## Data Storage

All chat messages are stored in the browser's localStorage. The data will persist across browser sessions. To clear all chat data, clear your browser's localStorage or use the application in incognito mode.

## License

MIT
