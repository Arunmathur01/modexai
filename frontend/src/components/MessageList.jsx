import React from "react";
import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";

const MessageList = () => {
  const { selectedConversation } = useSelector(
    state => state.conversation
  );

  const { message } = useSelector(
    state => state.message
  );

  return (
    <div className="flex flex-col gap-4 px-6 py-6">
      {message?.map((msg, index) => (
        
        <MessageBubble
          key={msg._id || index}
          role={msg?.role}
          content={msg?.content}
        />
      ))}
    </div>
  );
};

export default MessageList;