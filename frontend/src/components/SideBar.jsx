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
  X,
} from "lucide-react";

import { getConversation } from "../features/getConversation.js";
import { useDispatch, useSelector } from "react-redux";

import {
  Setconversation,
  SetselectedConversation,
} from "../redux/conversationSlice";

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

  // ==========================================
  // DESKTOP SIDEBAR
  // ==========================================

  const [isOpen, setIsOpen] = useState(true);

  // ==========================================
  // MOBILE DRAWER
  // ==========================================

  const [mobileOpen, setMobileOpen] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [showBilling, setShowBilling] = useState(false);

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
  // MOBILE BODY SCROLL
  // ==========================================

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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

      setMobileOpen(false);
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

    setMobileOpen(false);

    if (onNewChat) {
      onNewChat();
    }
  };

  // ==========================================
  // SELECT CONVERSATION
  // ==========================================

  const handleSelectConversation = (conv) => {
    dispatch(SetselectedConversation(conv));

    setMobileOpen(false);
  };

  // ==========================================
  // OPEN BILLING
  // ==========================================

  const handleOpenBilling = () => {
    setShowBilling(true);
    setMobileOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
          ONLY visible on mobile
      ===================================================== */}

      {!mobileOpen && (
  <button
  onClick={() => setMobileOpen(true)}
  className="
    md:hidden
    fixed
    top-3
    left-3
    z-80

    w-7
    h-7

    flex
    items-center
    justify-center

    rounded-md

    bg-[#151720]
    border
    border-gray-800

    text-gray-300
    hover:text-white
    hover:bg-gray-800

    shadow-md
    transition
  "
  title="Open menu"
>
  <Menu size={15} />
</button>
      )}

      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            md:hidden
            fixed
            inset-0
            z-90
            bg-black/60
            backdrop-blur-[2px]
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          h-screen
          bg-[#111318]
          text-white
          border-r
          border-gray-800
          flex
          flex-col
          transition-all
          duration-300
          ease-in-out

          md:relative
          md:z-40
          md:translate-x-0

          fixed
          top-0
          left-0
          z-100
          w-280px

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }

          ${
            isOpen
              ? "md:w-64"
              : "md:w-16"
          }
        `}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className={`
            flex
            items-center
            p-4
            min-h-64px

            ${
              isOpen
                ? "justify-between"
                : "md:justify-center"
            }
          `}
        >
          <div className="flex items-center gap-1">
            {/* Desktop toggle */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="
                hidden
                md:flex
                p-2
                rounded-lg
                hover:bg-gray-800
                text-gray-400
                hover:text-white
                transition
              "
              title={isOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isOpen ? (
                <PanelLeftClose size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>

            {/* Mobile close */}

            <button
              onClick={() => setMobileOpen(false)}
              className="
                md:hidden
                p-2
                rounded-lg
                hover:bg-gray-800
                text-gray-400
                hover:text-white
                transition
              "
              title="Close menu"
            >
              <X size={20} />
            </button>

            {/* Logo - desktop open */}

            {isOpen && (
              <h1 className="text-sm font-bold ml-1">
                Mode
                <span className="text-blue-500">X</span>
                AI
              </h1>
            )}

            {/* Logo - mobile */}

            {/* {mobileOpen && (
              <h1 className="md:hidden text-sm font-bold ml-1">
                Mode
                <span className="text-blue-500">X</span>
                AI
              </h1>
            )} */}
          </div>
        </div>

        {/* =====================================================
            OPEN SIDEBAR - NEW CHAT
        ===================================================== */}

        {isOpen && (
          <div className="px-3">
            <button
              onClick={handleNewChat}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                px-3
                py-3
                rounded-lg
                bg-blue-600
                hover:bg-blue-700
                active:scale-[0.98]
                transition
              "
              title="New Chat"
            >
              <Plus size={20} />

              <span className="text-sm font-medium">
                New Chat
              </span>
            </button>
          </div>
        )}

        {/* =====================================================
            COLLAPSED DESKTOP ACTIONS

            +        -> New Chat
            Message  -> Recent Chats
            Credit   -> Credits

            All three use the same gap.
        ===================================================== */}

        {!isOpen && (
          <div
            className="
              hidden
              md:flex
              flex-col
              items-center
              gap-4
              mt-3
            "
          >
            {/* New Chat */}

            <button
              onClick={handleNewChat}
              className="
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-lg
                text-gray-400
                hover:text-white
                hover:bg-gray-800
                transition
                active:scale-95
              "
              title="New Chat"
            >
              <Plus size={21} />
            </button>

            {/* Recent Chats */}

            <button
              className="
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-lg
                text-gray-400
                hover:text-white
                hover:bg-gray-800
                transition
              "
              title="Recent Chats"
            >
              <MessageSquare size={20} />
            </button>

            {/* Credits */}

            <button
              onClick={handleOpenBilling}
              className="
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-lg
                text-gray-400
                hover:text-white
                hover:bg-gray-800
                transition
              "
              title="Credits"
            >
              <CreditCardCheck size={19} />
            </button>
          </div>
        )}

        {/* =====================================================
            OPEN SIDEBAR / MOBILE
            RECENT CHATS
        ===================================================== */}

        {(isOpen || mobileOpen) && (
          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
              overflow-x-hidden
              mt-6
              scrollbar-width:none
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {/* Recent Chats Header */}

            <div className="mb-2 flex items-center px-3 gap-1.5">
              <MessageSquare
                size={16}
                className="text-gray-500 shrink-0"
              />

              <p className="text-xs font-semibold text-gray-500 uppercase">
                Recent Chats
              </p>
            </div>

            {/* =================================================
                CONVERSATION LIST
            ================================================= */}

            <div className="px-3 space-y-1 pb-4">
              {conversation?.length > 0 ? (
                conversation.map((conv, index) => {
                  const isActive =
                    selectedConversation?._id === conv?._id;

                  return (
                    <button
                      key={conv?._id || index}
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
                      onClick={() =>
                        handleSelectConversation(conv)
                      }
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

        {/* =====================================================
            FOOTER
        ===================================================== */}

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
            {/* =================================================
                USER PROFILE
            ================================================= */}

            <div
              className={`
                flex
                items-center
                gap-2
                min-w-0

                ${
                  !isOpen
                    ? "justify-center"
                    : ""
                }
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

              {(isOpen || mobileOpen) && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-200 truncate max-w-130px">
                    {userData?.name || "User"}
                  </span>

                  <span className="text-xs text-gray-500 capitalize">
                    {userData?.plan || "Free"} Plan
                  </span>
                </div>
              )}
            </div>

            {/* =================================================
                OPEN SIDEBAR ACTIONS
            ================================================= */}

            {isOpen && (
              <div className="flex items-center gap-1">
                {/* Credits */}

                <button
                  className="
                    p-2
                    rounded-lg
                    hover:bg-gray-800
                    text-gray-400
                    hover:text-white
                    transition
                  "
                  title="Credits"
                  onClick={handleOpenBilling}
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

            {/* =================================================
                CLOSED DESKTOP
                LOGOUT ICON
            ================================================= */}

            {!isOpen && (
              <button
                className="
                  hidden
                  md:flex
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

      {/* =====================================================
          BILLING OVERLAY
      ===================================================== */}

      {showBilling && (
        <div
          className="
            fixed
            inset-0
            z-200
            bg-black/60
            backdrop-blur-[2px]
          "
          onClick={() => setShowBilling(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              absolute
              right-0
              top-0
              h-full
              w-full
              sm:max-w-380px
              bg-[#0f1016]
              border-l
              border-gray-800
              shadow-2xl
              overflow-hidden
            "
          >
            {/* Close Billing */}

            <button
              onClick={() => setShowBilling(false)}
              className="
                absolute
                top-4
                right-4
                z-210
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
              title="Close billing"
            >
              <X size={18} />
            </button>

            {/* Billing Content */}

            <div
              className="
                h-full
                overflow-y-auto
                scrollbar-width:none
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              <Billing />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;