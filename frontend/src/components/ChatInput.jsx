import React, { useState } from "react";
import {
  Zap,
  MessageCircle,
  Search,
  Image,
  FileText,
  Presentation,
  Code,
  Send,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import sendMessage from "../features/sendMessage";
import { addmessage, SetcodePreview } from "../redux/messageSlice";

import { createConversation } from "../features/createConversation";

import {
  addconversation,
  SetselectedConversation,
  setupdateConversation,
} from "../redux/conversationSlice";

import { updateConversation } from "../features/updateConversation";

const ChatInput = ({ isLoading, setIsLoading }) => {
  
  const [selectedAgent, setselectedAgent] = useState("Auto");
  const [value, setValue] = useState("");

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const dispatch = useDispatch();

  // ==========================================
  // SEND MESSAGE
  // ==========================================

const handlesendMessage = async (e) => {
  e.preventDefault();

  if (!value.trim() || isLoading) return;

  let conversation = selectedConversation;

  try {
    if (!conversation) {
      const conv = await createConversation();

      dispatch(SetselectedConversation(conv));
      dispatch(addconversation(conv));

      conversation = conv;
    }

    if (conversation.title === "New Chat") {
      await updateConversation({
        id: conversation?._id,
        title: value.trim(),
      });

      dispatch(
        setupdateConversation({
          conversationId: conversation?._id,
          title: value.trim(),
        })
      );
    }

    const prompt = value.trim();

    const payload = {
      prompt,
      conversationId: conversation?._id,
      agent: selectedAgent.toLowerCase(),
    };

    // Add user message
    dispatch(
      addmessage({
        role: "user",
        content: prompt,
      })
    );

    setValue("");

    // START LOADING
    setIsLoading(true);

    const data = await sendMessage(payload);

    dispatch(SetcodePreview(data?.codePreview || []));

    // Add AI response
    dispatch(
      addmessage({
        role: "assistant",
        content: data?.answer,
        images: data?.images,
      })
    );

  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    // STOP LOADING
    setIsLoading(false);
  }
};
  // ==========================================
  // AGENTS
  // ==========================================

  const agents = [
    { name: "Auto", icon: Zap },
    { name: "Chat", icon: MessageCircle },
    { name: "Search", icon: Search },
    { name: "Image", icon: Image },
    { name: "PDF", icon: FileText },
    { name: "PPT", icon: Presentation },
    { name: "Coding", icon: Code },
  ];

  return (
    <div className="w-full shrink-0">
      <div
        className="
          w-full
          border-t
          border-gray-800
          bg-[#111318]
          px-3
          sm:px-4
          py-3
          sm:py-4
        "
      >
        <div className="w-full max-w-4xl mx-auto">

        {/* =====================================================
    QUICK AGENT OPTIONS
===================================================== */}

<div
  className="
    flex
    flex-wrap
    items-center
    gap-1.5
    sm:gap-2
    mb-3
  "
>
  {agents.map((agent) => {
    const Icon = agent.icon;
    const isSelected = selectedAgent === agent.name;

    return (
      <button
        key={agent.name}
        type="button"
        onClick={() => setselectedAgent(agent.name)}
        className={`
          flex
          items-center
          justify-center
          gap-1.5
          sm:gap-2
          px-2.5
          sm:px-3
          py-1.5
          rounded-lg
          text-xs
          sm:text-sm
          whitespace-nowrap
          transition-all
          duration-200

          ${
            isSelected
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }
        `}
      >
        <Icon
          size={15}
          className="sm:w-4 sm:h-4"
        />

        <span>{agent.name}</span>
      </button>
    );
  })}
</div>
          {/* =====================================================
              MESSAGE INPUT
          ===================================================== */}

          <form
            onSubmit={handlesendMessage}
            className="
              w-full
              flex
              items-end
              gap-1.5
              sm:gap-2
              bg-[#191b22]
              border
              border-gray-700
              rounded-xl
              sm:rounded-2xl
              p-1.5
              sm:p-2
              focus-within:border-gray-500
              transition
            "
          >
            {/* =================================================
                TEXTAREA
            ================================================= */}

            <textarea
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder="Ask anything..."
              rows={1}
              className="
                flex-1
                min-w-0
                bg-transparent
                text-white
                placeholder-gray-500
                outline-none
                resize-none
                px-2
                py-2
                sm:py-2.5
                text-sm
                sm:text-base
                leading-5
                max-h-32
                sm:max-h-36
                overflow-y-auto
                [scrollbar-none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            />

            {/* =================================================
                SEND BUTTON
            ================================================= */}

           <button
  disabled={!value.trim() || isLoading}
  type="submit"
  className="
    shrink-0
    w-9 h-9
    sm:w-10 sm:h-10
    flex items-center justify-center
    rounded-lg
    bg-blue-600
    hover:bg-blue-700
    disabled:bg-gray-700
    disabled:text-gray-500
    text-white
    transition
  "
>
  {isLoading ? (
    <div className="
      w-4
      h-4
      border-2
      border-gray-400
      border-t-white
      rounded-full
      animate-spin
    " />
  ) : (
    <Send size={18} />
  )}
</button>
          </form>

          {/* =====================================================
              MOBILE HINT
          ===================================================== */}

          <p
            className="
              hidden
              sm:block
              text-center
              text-[11px]
              text-gray-600
              mt-2
            "
          >
            ModeXAI can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;