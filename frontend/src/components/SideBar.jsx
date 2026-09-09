import React, { useState } from "react";
import {
  Plus,
  MessageSquare,
  Search,
  Settings,
  LogOut,
  Menu,

  PanelLeftClose,
} from "lucide-react";
import { useEffect } from "react";
import { getConversation } from "../features/getConversation.js";
import { useDispatch, useSelector } from "react-redux";
import { addconversation, Setconversation, SetselectedConversation } from "../redux/conversationSlice";
import { createConversation } from "../features/createConversation.js";


function SideBar() {

  const { conversation, selectedConversation } = useSelector(state => state.conversation)
  const dispatch = useDispatch()
  useEffect(() => {
    const getcon = async () => {
      const data = await getConversation()
      dispatch(Setconversation(data))
    }
    getcon()
  }, [])

  const handleCreateConversation = async () => {
    const data = await createConversation()
    dispatch(addconversation(data))
  }
  const [isOpen, setIsOpen] = useState(true);



  return (
    <aside
      className={`h-screen bg-[#111318] text-white border-r border-gray-800 flex flex-col transition-all duration-300 ${isOpen ? "w-64" : "w-16"
        }`}
    >


      {/* Header */}
      <div
        className={`flex items-center p-4 ${isOpen ? "justify-between" : "justify-center"
          }`}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            {isOpen ? <PanelLeftClose size={20} /> : <Menu size={20} />}
          </button>

          {isOpen && (
            <h1 className="text-sm font-bold ">
              Mode<span className="text-blue-500">X</span>AI
            </h1>
          )}
        </div>

      </div>

      {/* New Chat */}
      <div className="px-3">
        <button
          className={`w-full flex items-center justify-center gap-3 px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition ${!isOpen && "justify-center"
            }`}
          onClick={handleCreateConversation}
        >
          <Plus size={20} />

          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 mt-5 space-y-1">
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition ${!isOpen && "justify-center"
            }`}
        >
          <MessageSquare size={19} />

          {isOpen && <span>Chats</span>}
        </button>


      </nav>

      {/* Recent Chats */}
{isOpen && (
  <div className="flex-1 overflow-y-auto px-3 mt-6 [scrollbar-none] [&::-webkit-scrollbar]:hidden">

    <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
      Recent Chats
    </p>

    <div className="space-y-1">
      {conversation?.length > 0 ? (
        conversation.map((conv, index) => {
          const isActive =
            selectedConversation?._id === conv?._id;

          return (
            <button
              key={conv._id || index}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition truncate ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => {
                dispatch(SetselectedConversation(conv));
              }}
            >
              {conv?.title || "New Chat"}
            </button>
          );
        })
      ) : (
        <p className="px-3 py-2 text-sm text-gray-500">
          No recent chats
        </p>
      )}
    </div>

  </div>
)}

      {/* Bottom */}
      <div className="border-t border-gray-800 p-3">
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition ${!isOpen && "justify-center"
            }`}
        >
          <Settings size={19} />

          {isOpen && <span>Settings</span>}
        </button>

        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition ${!isOpen && "justify-center"
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