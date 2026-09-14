import React, { useState } from "react";
import {
  Plus,
  MessageSquare,
  User,
  Coins,
  LogOut,
  Menu,

  PanelLeftClose,
} from "lucide-react";
import { useEffect } from "react";
import { getConversation } from "../features/getConversation.js";
import { useDispatch, useSelector } from "react-redux";
import { addconversation, Setconversation, SetselectedConversation } from "../redux/conversationSlice";
import { createConversation } from "../features/createConversation.js";
import logOut from "../features/logOut.js";
import { SetUserdata } from "../redux/userSlice.js";
import { addmessage, Setmessage } from "../redux/messageSlice.js";


function SideBar({onNewChat}) {

  const { conversation, selectedConversation } = useSelector(state => state.conversation)
  const {userData}=useSelector (state=>state.user)
  const dispatch = useDispatch()
  useEffect(() => {
     if (!userData) {
    dispatch(Setconversation([]));
    dispatch(SetselectedConversation(null));

    return;
  }
    const getcon = async () => {
      const data = await getConversation()
      dispatch(Setconversation(data))
    }
    getcon()
  }, [userData])

  const handleCreateConversation = async () => {
    const data = await createConversation()
    dispatch(addconversation(data))
  }
  const [isOpen, setIsOpen] = useState(true);
const [imageError, setImageError] = useState(false);


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
          onClick={  ()=> { dispatch(SetselectedConversation(null))
           dispatch(Setmessage([]))
            onNewChat()}}
        >
          <Plus size={20} />

          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* Navigation
      <nav className="px-3 mt-5 space-y-1">
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition ${!isOpen && "justify-center"
            }`}
        >
          <MessageSquare size={19} />

          {isOpen && <span>Chats</span>}
        </button>


      </nav> */}

      
{/* Recent Chats */}
<div className="flex-1 overflow-y-auto mt-6 [scrollbar-none] [&::-webkit-scrollbar]:hidden">

  {/* Message Icon + Title */}
  <div
    className={`mb-2 flex items-center ${
      isOpen
        ? "px-3 gap-1.5"
        : "justify-center"
    }`}
  >
    <MessageSquare
      size={16}
      className="text-gray-500 shrink-0"
    />

    {isOpen && (
      <p className="text-xs font-semibold text-gray-500 uppercase">
        Recent Chats
      </p>
    )}
  </div>

  {/* Conversation List - only when open */}
  {isOpen && (
    <div className="px-3 space-y-1">
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
  )}

</div>

     {/* Bottom User Profile */}
{/* Footer */}
<div className="mt-auto border-t border-gray-800 p-3">
  <div
    className={`flex items-center ${
      isOpen ? "justify-between" : "justify-center"
    }`}
  >
    {/* Profile */}
    <div className="flex items-center gap-2 min-w-0">
      
      {/* Profile Image / User Icon */}
      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center shrink-0">
        {!imageError && userData?.avatar ? (
          <img
            src={userData.avatar}
            alt={userData?.name || "User"}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <User size={20} className="text-gray-400" />
        )}
      </div>

      {/* Name + Plan */}
      {isOpen && (
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-gray-200 truncate max-w-25">
            {userData?.name || "User"}
          </span>

          <span className="text-xs text-gray-500">
            Free Plan
          </span>
        </div>
      )}
    </div>

    {/* Actions */}
    {isOpen && (
      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          title="Coins"
        >
          <Coins size={19} />
        </button>

        <button
          className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-red-400 transition"
          title="Logout"
          onClick={() => {
            logOut();
            dispatch(SetUserdata(null));
          }}
        >
          <LogOut size={19} />
        </button>
      </div>
    )}
  </div>
</div>
    </aside>
  );
}

export default SideBar;