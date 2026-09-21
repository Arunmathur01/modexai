import React from "react";
import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";
import AILoader from "./loadingAi.jsx";
import { useEffect,useRef } from "react";

const MessageList = ({ isLoading }) => {
  const { selectedConversation } = useSelector(
    state => state.conversation
  );

  const { message } = useSelector(
    state => state.message
  );

  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [message, isLoading]);


  return (
    <div className="flex flex-col gap-4 px-6 py-6">
      {message?.map((msg, index) => (
        
        <MessageBubble
          key={msg._id || index}
          role={msg?.role}
          content={msg?.content}
          images={msg?.images || []}
        />
      ))}
       {isLoading && <AILoader />}
<div ref={bottomRef} />
    </div>
  );
};

export default MessageList;