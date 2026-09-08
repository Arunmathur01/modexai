import React, { useState } from "react";
import {
  Plus,
  MessageSquare,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const conversations = [
    "Build authentication API",
    "React dashboard",
    "Docker setup",
    "AI Agent architecture",
  ];

  return (
    <aside
      className={`h-screen bg-[#111318] text-white border-r border-gray-800 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center p-4 ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isOpen && (
          <h1 className="text-xl font-bold">
            Mode<span className="text-blue-500">X</span>AI
          </h1>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* New Chat */}
      <div className="px-3">
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition ${
            !isOpen && "justify-center"
          }`}
        >
          <Plus size={20} />

          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 mt-5 space-y-1">
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition ${
            !isOpen && "justify-center"
          }`}
        >
          <MessageSquare size={19} />

          {isOpen && <span>Chats</span>}
        </button>

        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition ${
            !isOpen && "justify-center"
          }`}
        >
          <Search size={19} />

          {isOpen && <span>Search</span>}
        </button>
      </nav>

      {/* Recent Chats */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto px-3 mt-6">
          <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
            Recent Chats
          </p>

          <div className="space-y-1">
            {conversations.map((conversation, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition truncate"
              >
                {conversation}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom */}
      <div className="border-t border-gray-800 p-3">
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition ${
            !isOpen && "justify-center"
          }`}
        >
          <Settings size={19} />

          {isOpen && <span>Settings</span>}
        </button>

        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition ${
            !isOpen && "justify-center"
          }`}
        >
          <LogOut size={19} />

          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default SideBar;