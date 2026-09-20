import React, { useState, useEffect } from "react";
import {
  Plus,
  MessageSquare,
  User,
  Coins,
  LogOut,
  Menu,
  PanelLeftClose,
  CreditCardCheck,
} from "lucide-react";

import { getConversation } from "../features/getConversation.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addconversation,
  Setconversation,
  SetselectedConversation,
} from "../redux/conversationSlice";
import { createConversation } from "../features/createConversation.js";
import logOut from "../features/logOut.js";
import { SetUserdata } from "../redux/userSlice.js";
import { Setmessage } from "../redux/messageSlice.js";
import Billing from "./BillingArea.jsx";

function SideBar({ onNewChat }) {

  const {
    conversation,
    selectedConversation,
  } = useSelector((state) => state.conversation);


  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showBilling,SetshowBilling]=useState(false)

  // ==========================================
  // GET CONVERSATIONS
  // ==========================================

  useEffect(() => {
    if (!userData) {
      dispatch(Setconversation([]));
      dispatch(SetselectedConversation(null));
      return;
    }

    const getcon = async () => {
      try {
        const data = await getConversation();
        dispatch(Setconversation(data || []));
      } catch (error) {
        console.error("Error fetching conversations:", error);
        dispatch(Setconversation([]));
      }
    };

    getcon();
  }, [userData, dispatch]);

  // ==========================================
  // CREATE CONVERSATION
  // ==========================================

  const handleCreateConversation = async () => {
    try {
      const data = await createConversation();

      dispatch(addconversation(data));
      dispatch(SetselectedConversation(data));
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await logOut();

      dispatch(SetUserdata(null));
      dispatch(Setconversation([]));
      dispatch(SetselectedConversation(null));
      dispatch(Setmessage([]));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ==========================================
  // NEW CHAT
  // ==========================================

  const handleNewChat = () => {
    dispatch(SetselectedConversation(null));
    dispatch(Setmessage([]));

    onNewChat();
  };

  return (
    <> <aside
      className={`h-screen bg-[#111318] text-white border-r border-gray-800 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* ==========================================
          HEADER
      ========================================== */}

      <div
        className={`flex items-center p-4 ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
            title={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

          {isOpen && (
            <h1 className="text-sm font-bold">
              Mode<span className="text-blue-500">X</span>AI
            </h1>
          )}
        </div>
      </div>

      {/* ==========================================
          NEW CHAT
      ========================================== */}

      <div className="px-3">
        <button
          className={`w-full flex items-center justify-center gap-3 px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition`}
          onClick={handleNewChat}
          title={!isOpen ? "New Chat" : ""}
        >
          <Plus size={20} />

          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* ==========================================
          RECENT CHATS
      ========================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          mt-6
          scrollbar-none
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
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

        {/* ==========================================
            CLOSED SIDEBAR CREDIT ICON

            This appears directly after MessageSquare
            when sidebar is closed.
        ========================================== */}

        {!isOpen && (
          <div className="flex flex-col items-center mt-2">
            <button
              className="
                p-2
                rounded-lg
                hover:bg-gray-800
                text-gray-400
                hover:text-white
                transition
              "
             onClick={()=>{SetshowBilling(true)}}
            >
              <CreditCardCheck size={19} />
            </button>
          </div>
        )}

        {/* ==========================================
            CONVERSATION LIST
        ========================================== */}

        {isOpen && (
          <div className="px-3 space-y-1">
            {conversation?.length > 0 ? (
              conversation.map((conv, index) => {
                const isActive =
                  selectedConversation?._id === conv?._id;

                return (
                  <button
                    key={conv._id || index}
                    className={`
                      w-full
                      text-left
                      px-3
                      py-2.5
                      rounded-lg
                      text-sm
                      transition
                      truncate
                      ${
                        isActive
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }
                    `}
                    onClick={() => {
                      dispatch(
                        SetselectedConversation(conv)
                      );
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

      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="mt-auto border-t border-gray-800 p-3">
        <div
          className={`
            flex
            items-center
            ${
              isOpen
                ? "justify-between"
                : "flex-col gap-1"
            }
          `}
        >
          {/* ========================================
              USER PROFILE
          ======================================== */}

          <div
            className={`
              flex
              items-center
              gap-2
              min-w-0
              ${!isOpen ? "order-1" : ""}
            `}
          >
            {/* Avatar */}

            <div
              className="
                w-9
                h-9
                rounded-full
                overflow-hidden
                bg-gray-800
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              {!imageError && userData?.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData?.name || "User"}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <User
                  size={20}
                  className="text-gray-400"
                />
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

          {/* ========================================
              OPEN SIDEBAR ACTIONS

              Coins + Logout beside profile
          ======================================== */}

          {isOpen && (
            <div className="flex items-center gap-1">
              {/* Coins */}

              <button
                className="
                  p-2
                  rounded-lg
                  hover:bg-gray-800
                  text-gray-400
                  hover:text-white
                  transition
                "
                title="Coins"
                 onClick={()=>{SetshowBilling(true)}}
              >
                <Coins size={19} />
              </button>

              {/* Logout */}

              <button
                className="
                  p-2
                  rounded-lg
                  hover:bg-gray-800
                  text-gray-400
                  hover:text-red-400
                  transition
                "
                title="Logout"
                onClick={handleLogout}
              >
                <LogOut size={19} />
              </button>
            </div>
          )}

          {/* ========================================
              CLOSED SIDEBAR LOGOUT

              User
              ↓
              Logout
          ======================================== */}

          {!isOpen && (
            <button
              className="
                order-2
                p-2
                rounded-lg
                hover:bg-gray-800
                text-gray-400
                hover:text-red-400
                transition
              "
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut size={19} />
            </button>
          )}
        </div>
      </div>
    
    </aside> 
      {/* Billing Overlay - OUTSIDE aside */}
   {showBilling && (
  <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-[2px]">

    <div
      className="
        absolute
        right-0
        top-0
        h-full
        w-full
        max-w-95
        bg-[#0f1016]
        border-l
        border-gray-800
        shadow-2xl
      " 
    >

      {/* Close button */}
      <button
        onClick={() => SetshowBilling(false)}
       
        className="
          absolute
          top-5
          right-5
          z-50
          w-9
          h-9
          flex
          items-center
          justify-center
          rounded-lg
          bg-[#191b23]
          text-gray-400
          hover:text-white
          hover:bg-gray-800
          transition
        "
      >
        ✕
      </button>

      <Billing />

    </div>
  </div>
)}
      </>
   
  );
}

export default SideBar;